import React, { useEffect, useMemo } from "react";
import ModalLayout from "../layouts/modal-layout";
import { FormProvider, useForm } from "react-hook-form";
import Input from "../ui/input";
import Button from "../ui/button";
import Select from "../ui/select";
import { useGet } from "@/src/hooks/use-get";
import { ProjectDto } from "@/src/models/projects/project-dto";
import {
  formatTime,
  getTimeDifferenceInSeconds,
  updateTimeForDate,
} from "../app/time-tracker/utils";
import { TimeLogDto } from "@/src/models/time-logs/time-log-dto";
import { TimeLogCreateDto } from "@/src/models/time-logs/time-log-create-dto";
import { errorExtractor } from "@/src/services/error-extractor";
import { useToastStore } from "@/src/store/toast-store";
import { useQueryClient } from "@tanstack/react-query";
import { isValidTimeFormat } from "../app/time-tracker/time-logger/utils";
import { usePost } from "@/src/hooks/use-post";

interface ModalProps {
  start: Date;
  end: Date;
  isOpen: boolean;
  onClose: () => void;
}

interface LogItemForm {
  startTime: string;
  endTime: string;
  projectId: number;
  description: string;
}

const CreateLogItemModal: React.FC<ModalProps> = ({
  start,
  end,
  isOpen,
  onClose,
}) => {
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
  const methods = useForm<LogItemForm>({
    mode: "onBlur",
    defaultValues: {
      startTime: "",
      endTime: "",
      projectId: 0,
      description: "",
    },
  });

  const startTime = methods.watch("startTime");
  const endTime = methods.watch("endTime");

  useEffect(() => {
    if (isOpen) {
      methods.reset({
        startTime: formatTime(start) ?? "",
        endTime: formatTime(end) ?? "",
        projectId: 0,
        description: "",
      });
    }
  }, [isOpen, start, end, methods]);

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (data: LogItemForm) => {
    const newStartDate = updateTimeForDate(start, data.startTime);
    const newEndDate = updateTimeForDate(end, data.endTime, isMultiDayEvent);
    const seconds = getTimeDifferenceInSeconds(newStartDate, newEndDate);

    await createTimeLogAsync(
      {
        description: data.description,
        start: newStartDate,
        end: newEndDate,
        projectId: data.projectId || undefined,
        seconds,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            predicate: (query) =>
              typeof query.queryKey?.[0] === "string" &&
              query.queryKey[0].startsWith("/time-logs"),
          });
          showToast("Log created successfully", "success");
          onClose();
        },
        onError: (error) => {
          const errorMessage = errorExtractor(error);
          showToast(errorMessage, "error");
        },
      },
    );
  };

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

  const isMultiDayEvent = useMemo(() => {
    if (isValidTimeFormat(startTime) && isValidTimeFormat(endTime)) {
      const newStartDate = updateTimeForDate(start, startTime);
      const newEndDate = updateTimeForDate(end, endTime);

      return newEndDate < newStartDate;
    }
    return false;
  }, [start, startTime, end, endTime]);

  return (
    <ModalLayout isOpen={isOpen} onClose={onClose} title="Create time log">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <Input
              label="Description"
              error={errors.description?.message}
              placeholder="Enter description"
              {...methods.register("description")}
            />

            <Select
              disabled={isFetching}
              label="Select project"
              removeFirstOption={true}
              options={projectOptions}
              error={errors.projectId?.message}
              {...methods.register("projectId")}
            />

            <Input
              label="Start Time"
              error={errors.startTime?.message}
              placeholder="Enter start time"
              {...methods.register("startTime", {
                required: "Start time is required",
                validate: (value) => {
                  if (!isValidTimeFormat(value)) {
                    return "Invalid time format";
                  }
                },
              })}
            />

            <Input
              label={isMultiDayEvent ? "End Time (+1)" : "End Time"}
              error={errors.endTime?.message}
              placeholder="Enter end time"
              {...methods.register("endTime", {
                required: "End time is required",
                validate: (value) => {
                  if (!isValidTimeFormat(value)) {
                    return "Invalid time format";
                  }
                },
              })}
            />
          </div>
          <div className="mt-6">
            <Button disabled={isFetching} text="Create log" type="submit" />
          </div>
        </form>
      </FormProvider>
    </ModalLayout>
  );
};

export default CreateLogItemModal;
