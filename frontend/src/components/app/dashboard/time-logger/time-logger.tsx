import Input from "@/src/components/ui/input";
import Button from "@/src/components/ui/button";
import { PlayIcon } from "@/src/components/icons/play-icon";
import { Dispatch, SetStateAction, useEffect, useMemo, useRef } from "react";
import { StopIcon } from "../../../icons/stop-icon";
import { ProjectDto } from "@/src/models/projects/project-dto";
import { useGet } from "@/src/hooks/use-get";
import Select from "../../../ui/select";
import { FormProvider, useForm } from "react-hook-form";
import { usePost } from "@/src/hooks/use-post";
import { useQueryClient } from "@tanstack/react-query";
import { useToastStore } from "@/src/store/toast-store";
import { AxiosError } from "axios";
import { ApiError } from "@/src/models/abstractions/api-error";
import { errorExtractor } from "@/src/services/error-extractor";
import { TimeLogCreateDto } from "@/src/models/time-logs/time-log-create-dto";
import { TimeLogDto } from "@/src/models/time-logs/time-log-dto";
import TimeCounter from "./time-counter";
import { usePut } from "@/src/hooks/use-put";
import { TimeLogUpdateDto } from "@/src/models/time-logs/time-log-update-dto";

interface LogForm {
  description: string;
  projectId: string;
}

interface Props {
  elapsedSeconds: number;
  setElapsedSeconds: Dispatch<SetStateAction<number>>;
}

export default function TimeLogger({
  elapsedSeconds,
  setElapsedSeconds,
}: Props) {
  const animationFrameRef = useRef<number | null>(null);

  const { data: activeLog, isFetched: isFetchingActiveLog } =
    useGet<TimeLogDto | null>({
      url: "time-logs/active",
    });

  const queryClient = useQueryClient();
  const { showToast } = useToastStore();

  const { mutateAsync: createTimeLogAsync } = usePost<
    TimeLogCreateDto,
    TimeLogDto
  >({
    url: "/time-logs",
  });

  const { mutateAsync: updateTimeLogAsync } = usePut<
    TimeLogUpdateDto,
    TimeLogDto
  >();

  const { data: projects, isFetching } = useGet<ProjectDto[]>({
    url: "projects",
  });

  const projectOptions = useMemo(() => {
    return [
      {
        value: "",
        label: "No project",
      },
      ...(projects ?? []).map((project) => ({
        value: project.id.toString(),
        label: project.name,
      })),
    ];
  }, [projects]);

  const methods = useForm<LogForm>({
    mode: "onBlur",
    defaultValues: {
      description: "",
      projectId: "",
    },
  });

  const {
    reset,
    watch,
    formState: { errors },
  } = methods;

  useEffect(() => {
    const update = () => {
      if (activeLog?.start) {
        const now = new Date();
        const diff = Math.floor(
          (now.getTime() - new Date(activeLog.start).getTime()) / 1000,
        );
        setElapsedSeconds(diff);
        animationFrameRef.current = requestAnimationFrame(update);
      }
    };

    if (activeLog) {
      animationFrameRef.current = requestAnimationFrame(update);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [activeLog, setElapsedSeconds]);

  const toggleTimer = () => {
    if (activeLog) {
      handleUpdateLog();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    } else {
      handleAddLog();
      setElapsedSeconds(0);
    }
  };

  const handleUpdateLog = async () => {
    if (!activeLog) return;
    const url = `/time-logs/${activeLog.id}`;

    const projectIdValue =
      +watch("projectId") > 0 ? +watch("projectId") : undefined;

    const updatedTimeLog: TimeLogUpdateDto = {
      start: new Date(activeLog.start),
      end: new Date(),
      description: watch("description"),
      projectId: projectIdValue,
      seconds: elapsedSeconds,
    };

    await updateTimeLogAsync(
      { url, data: updatedTimeLog },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            predicate: (query) =>
              typeof query.queryKey?.[0] === "string" &&
              query.queryKey[0].startsWith("/time-logs"),
          });

          queryClient.invalidateQueries({
            queryKey: ["time-logs/active"],
          });

          setElapsedSeconds(0);
        },
      },
    );

    reset();
  };

  const handleAddLog = async () => {
    const projectId = watch("projectId");
    const description = watch("description");

    const project = projects?.find((p) => p.id.toString() === projectId);

    const request: TimeLogCreateDto = {
      description,
      projectId: project?.id,
      seconds: 0,
      start: new Date(),
      end: undefined,
    };

    await createTimeLogAsync(request, {
      onSuccess: () => {
        {
          queryClient.invalidateQueries({
            queryKey: ["time-logs/active"],
          });
        }
      },
      onError: (error: AxiosError<ApiError>) => {
        const errorMessage = errorExtractor(error);
        showToast(errorMessage, "error");
      },
    });
  };

  const setStartDate = async (date: Date) => {
    if (!activeLog) return;
    const url = `/time-logs/${activeLog.id}`;
    const updatedTimeLog: TimeLogUpdateDto = {
      ...activeLog,
      start: new Date(date),
      end: undefined,
      description: activeLog.description,
      projectId: activeLog.projectId,
      seconds: activeLog.seconds,
    };

    await updateTimeLogAsync(
      { url, data: updatedTimeLog },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            predicate: (query) =>
              typeof query.queryKey?.[0] === "string" &&
              query.queryKey[0].startsWith("/time-logs"),
          });
          queryClient.invalidateQueries({
            queryKey: ["time-logs/active"],
          });
        },
      },
    );
  };

  return (
    <div className="relative rounded-xl border border-gray-200 bg-white">
      <FormProvider {...methods}>
        <div className="flex flex-col items-center justify-between space-y-2 p-3 lg:flex-row lg:space-y-0">
          <div className="w-full flex-1 border-gray-200 lg:border-r lg:pr-4">
            <Input
              placeholder="What are you working on?"
              {...methods.register("description")}
            />
          </div>
          <div className="w-full border-gray-200 lg:w-[170px] lg:border-r lg:px-4">
            <Select
              disabled={isFetching}
              removeFirstOption={true}
              options={projectOptions}
              error={errors.projectId?.message}
              {...methods.register("projectId")}
            />
          </div>
          <div className="py-1 lg:px-4 lg:py-0">
            <TimeCounter
              seconds={elapsedSeconds}
              startDate={activeLog?.start ?? new Date()}
              setStartDate={setStartDate}
              setSeconds={setElapsedSeconds}
              isRunning={!!activeLog}
            />
          </div>
          <div className="flex w-full shrink-0 flex-col items-stretch justify-end space-y-2 border-l border-gray-200 lg:w-auto lg:flex-row lg:items-center lg:space-y-0 lg:space-x-3 lg:pl-4">
            <Button
              disabled={!isFetchingActiveLog}
              text={activeLog ? "Stop" : "Start"}
              color={activeLog ? "red" : "blue"}
              icon={activeLog ? <StopIcon /> : <PlayIcon />}
              onClick={toggleTimer}
            />
          </div>
        </div>
      </FormProvider>
    </div>
  );
}
