import Input from "@/src/components/ui/input";
import Button from "@/src/components/ui/button";
import { PlayIcon } from "@/src/components/icons/play-icon";
import { ClockIcon } from "@/src/components/icons/clock-icon";
import { useEffect, useMemo, useRef, useState } from "react";
import { StopIcon } from "../../icons/stop-icon";
import { ProjectDto } from "@/src/models/projects/project-dto";
import { useGet } from "@/src/hooks/use-get";
import Select from "../../ui/select";
import { FormProvider, useForm } from "react-hook-form";
import { usePost } from "@/src/hooks/use-post";
import { useQueryClient } from "@tanstack/react-query";
import { useToastStore } from "@/src/store/toast-store";
import { AxiosError } from "axios";
import { ApiError } from "@/src/models/abstractions/api-error";
import { errorExtractor } from "@/src/services/error-extractor";
import { TimeLogCreateDto } from "@/src/models/time-logs/time-log-create-dto";
import { TimeLogDto } from "@/src/models/time-logs/time-log-dto";
import { formatTime } from "./utils";

interface LogForm {
  description: string;
  projectId: string;
}

export default function TimeLogger() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [startDate, setStartDate] = useState<Date>(new Date());
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
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  const toggleTimer = () => {
    if (isRunning) {
      setIsRunning(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      handleAddLog();

      setSeconds(0);
    } else {
      setStartDate(new Date());
      setIsRunning(true);
    }
  };

  const handleAddLog = async () => {
    const projectId = watch("projectId");
    const description = watch("description");

    const project = projects?.find((p) => p.id.toString() === projectId);

    const request: TimeLogCreateDto = {
      description: description,
      start: startDate,
      end: new Date(),
      projectId: project?.id,
      seconds: seconds,
    };

    await createTimeLogAsync(request, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["/time-logs"],
          exact: true,
        });
        showToast("Time log created successfully", "success");
        reset();
      },
      onError: (error: AxiosError<ApiError>) => {
        const errorMessage = errorExtractor(error);
        showToast(errorMessage, "error");
      },
    });
  };

  return (
    <div className="relative rounded-xl border border-gray-200 bg-white">
      <FormProvider {...methods}>
        <div className="flex flex-col items-center justify-between p-3 md:flex-row">
          <div className="w-full flex-1 border-r border-gray-200 pr-4">
            <Input
              placeholder="Whar are you working on?"
              {...methods.register("description")}
            />
          </div>
          <div className="w-[170px] border-r border-gray-200 px-4">
            <Select
              disabled={isFetching}
              removeFirstOption={true}
              options={projectOptions}
              error={errors.projectId?.message}
              {...methods.register("projectId")}
            />
          </div>
          <div className="flex items-center justify-center gap-2 px-4">
            <ClockIcon />
            <p className="w-[60px] text-center text-sm">
              {formatTime(seconds)}
            </p>
          </div>
          <div className="flex w-full  shrink-0 flex-col items-stretch justify-end space-y-2 border-l border-gray-200 pl-4 md:w-auto md:flex-row md:items-center md:space-x-3 md:space-y-0">
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
