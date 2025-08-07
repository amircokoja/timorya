import Input from "@/src/components/ui/input";
import Button from "@/src/components/ui/button";
import { PlayIcon } from "@/src/components/icons/play-icon";
import { useEffect, useMemo, useRef, useState } from "react";
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

interface LogForm {
  description: string;
  projectId: string;
}

export default function TimeLogger() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const animationFrameRef = useRef<number | null>(null);

  const queryClient = useQueryClient();
  const { showToast } = useToastStore();

  const { mutateAsync: createTimeLogAsync } = usePost<
    TimeLogCreateDto,
    TimeLogDto
  >({
    url: "/time-logs",
  });

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
      if (startDate) {
        const now = new Date();
        const diff = Math.floor((now.getTime() - startDate.getTime()) / 1000);
        setElapsedSeconds(diff);
        animationFrameRef.current = requestAnimationFrame(update);
      }
    };

    if (isRunning) {
      animationFrameRef.current = requestAnimationFrame(update);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isRunning, startDate]);

  const toggleTimer = () => {
    if (isRunning) {
      setIsRunning(false);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      handleAddLog();
    } else {
      setStartDate(new Date());
      setElapsedSeconds(0);
      setIsRunning(true);
    }
  };

  const handleAddLog = async () => {
    const projectId = watch("projectId");
    const description = watch("description");

    const project = projects?.find((p) => p.id.toString() === projectId);

    const request: TimeLogCreateDto = {
      description,
      start: startDate!,
      end: new Date(),
      projectId: project?.id,
      seconds: elapsedSeconds,
    };

    await createTimeLogAsync(request, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          predicate: (query) =>
            typeof query.queryKey?.[0] === "string" &&
            query.queryKey[0].startsWith("/time-logs"),
        });
        showToast("Time log created successfully", "success");
        reset();
      },
      onError: (error: AxiosError<ApiError>) => {
        const errorMessage = errorExtractor(error);
        showToast(errorMessage, "error");
      },
    });

    reset();
  };

  return (
    <div className="relative rounded-xl border border-gray-200 bg-white">
      <FormProvider {...methods}>
        <div className="flex flex-col items-center justify-between space-y-2 p-3 md:flex-row md:space-y-0">
          <div className="w-full flex-1 border-gray-200 md:border-r md:pr-4">
            <Input
              placeholder="What are you working on?"
              {...methods.register("description")}
            />
          </div>
          <div className="w-full border-gray-200 md:w-[170px] md:border-r md:px-4">
            <Select
              disabled={isFetching}
              removeFirstOption={true}
              options={projectOptions}
              error={errors.projectId?.message}
              {...methods.register("projectId")}
            />
          </div>
          <div className="py-1 md:px-4 md:py-0">
            <TimeCounter
              seconds={elapsedSeconds}
              startDate={startDate ?? new Date()}
              setStartDate={setStartDate}
              setSeconds={setElapsedSeconds}
              isRunning={isRunning}
            />
          </div>
          <div className="flex w-full shrink-0 flex-col items-stretch justify-end space-y-2 border-l border-gray-200 md:w-auto md:flex-row md:items-center md:space-y-0 md:space-x-3 md:pl-4">
            <Button
              text={isRunning ? "Stop" : "Start"}
              color={isRunning ? "red" : "blue"}
              icon={isRunning ? <StopIcon /> : <PlayIcon />}
              onClick={toggleTimer}
            />
          </div>
        </div>
      </FormProvider>
    </div>
  );
}
