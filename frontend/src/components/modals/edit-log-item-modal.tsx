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
} from "../app/dashboard/utils";
import { TimeLogDto } from "@/src/models/time-logs/time-log-dto";
import { usePut } from "@/src/hooks/use-put";
import { errorExtractor } from "@/src/services/error-extractor";
import { useToastStore } from "@/src/store/toast-store";
import { useQueryClient } from "@tanstack/react-query";
import { isValidTimeFormat } from "../app/dashboard/time-logger/utils";
import { TimeLogUpdateDto } from "@/src/models/time-logs/time-log-update-dto";

interface ModalProps {
  logItem: TimeLogDto;
  isOpen: boolean;
  onClose: () => void;
}

interface LogItemForm {
  startTime: string;
  endTime: string;
  projectId: number;
  description: string;
}

const EditLogItemModal: React.FC<ModalProps> = ({
  logItem,
  isOpen,
  onClose,
}) => {
  const queryClient = useQueryClient();
  const { showToast } = useToastStore();
  const { mutateAsync: updateTimeLogAsync } = usePut<
    TimeLogUpdateDto,
    TimeLogDto
  >();

  const { data: projects, isFetching } = useGet<ProjectDto[]>({
    url: "projects",
  });
  const methods = useForm<LogItemForm>({
    defaultValues: {
      startTime: "",
      endTime: "",
      projectId: 0,
      description: "",
    },
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const startTime = methods.watch("startTime");
  const endTime = methods.watch("endTime");

  const onSubmit = async (data: LogItemForm) => {
    const newStartDate = updateTimeForDate(logItem.start, data.startTime);
    const newEndDate = updateTimeForDate(
      logItem.end,
      data.endTime,
      isMultiDayEvent,
    );
    const seconds = getTimeDifferenceInSeconds(newStartDate, newEndDate);

    await updateTimeLogAsync(
      {
        url: "/time-logs/" + logItem.id,
        data: {
          description: data.description,
          start: newStartDate,
          end: newEndDate,
          projectId: data.projectId || undefined,
          seconds,
        },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            predicate: (query) =>
              typeof query.queryKey?.[0] === "string" &&
              query.queryKey[0].startsWith("/time-logs"),
          });
          showToast("Log updated successfully", "success");
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

  useEffect(() => {
    if (logItem && projects) {
      methods.reset({
        startTime: formatTime(logItem.start),
        endTime: formatTime(logItem.end),
        projectId: logItem.projectId,
        description: logItem.description,
      });
    }
  }, [logItem, projects, methods]);

  const isMultiDayEvent = useMemo(() => {
    if (isValidTimeFormat(startTime) && isValidTimeFormat(endTime)) {
      const newStartDate = updateTimeForDate(logItem.start, startTime);
      const newEndDate = updateTimeForDate(logItem.end, endTime);

      return newEndDate < newStartDate;
    }
    return false;
  }, [logItem.start, logItem.end, startTime, endTime]);

  return (
    <ModalLayout isOpen={isOpen} onClose={onClose} title="Edit time log">
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
            <Button disabled={isFetching} text="Update log" type="submit" />
          </div>
        </form>
      </FormProvider>
    </ModalLayout>
  );
};

export default EditLogItemModal;
