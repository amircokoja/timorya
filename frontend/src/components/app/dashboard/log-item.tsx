import { ClockIcon } from "../../icons/clock-icon";
import { ThreeDotsIcon } from "../../icons/three-dots-icon";
import Button from "../../ui/button";
import Dropdown from "../../ui/dropdown";
import { formatSeconds, formatTime } from "./utils";
import { TimeLogDto } from "@/src/models/time-logs/time-log-dto";
import { useEffect, useState } from "react";
import { isValidTimeFormat } from "./time-logger/utils";
import { useToastStore } from "@/src/store/toast-store";
import { useGet } from "@/src/hooks/use-get";
import { ProjectDto } from "@/src/models/projects/project-dto";

interface Props {
  logItem: TimeLogDto;
}

export default function LogItem({ logItem }: Props) {
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const { showToast } = useToastStore();

  const { data: projects, isFetching } = useGet<ProjectDto[]>({
    url: "projects",
  });

  useEffect(() => {
    setStartTime(formatTime(logItem.start));
    setEndTime(formatTime(logItem.end));
  }, [logItem]);

  const handleStartTimeUpdate = () => {
    if (!isValidTimeFormat(startTime)) {
      showToast("Invalid time format", "error");
      setStartTime(formatTime(logItem.start));
      return;
    }
    setTimeAndSeconds();
  };

  const handleEndTimeUpdate = () => {
    if (!isValidTimeFormat(endTime)) {
      showToast("Invalid time format", "error");
      setEndTime(formatTime(logItem.end));
      return;
    }
    setTimeAndSeconds("end");
  };

  const setTimeAndSeconds = (type: "start" | "end" = "start") => {
    if (type === "start") {
      const [hours, minutes] = startTime.split(":").map(Number);
      const newStartDate = new Date(logItem.start);
      newStartDate.setHours(hours, minutes, 0);

      const endDate = new Date(logItem.end);
      const diffInSeconds = Math.floor(
        (endDate.getTime() - newStartDate.getTime()) / 1000,
      );

      const newLogItem = {
        ...logItem,
        start: newStartDate,
        seconds: diffInSeconds,
      };
    } else if (type === "end") {
      const [hours, minutes] = endTime.split(":").map(Number);
      const newEndDate = new Date(logItem.end);
      newEndDate.setHours(hours, minutes, 0);

      const startDate = new Date(logItem.start);
      const diffInSeconds = Math.floor(
        (newEndDate.getTime() - startDate.getTime()) / 1000,
      );

      const newLogItem = {
        ...logItem,
        end: newEndDate,
        seconds: diffInSeconds,
      };

      console.log("End time updated:", newLogItem);
      console.log("New seconds:", formatSeconds(diffInSeconds));
    }
  };

  const handleDelete = () => {
    console.log("Delete log item:", logItem.id);
  };

  const handleEdit = () => {
    console.log("Edit log item:", logItem.id);
  };

  return (
    <div className="flex items-center justify-between border-b border-gray-200 bg-white p-4 text-sm text-gray-500 last:border-b-0">
      <div className="flex-1">
        <h4 className="mb-1 text-sm font-medium text-gray-800">
          {logItem.description}
        </h4>
        <p className="text-xs text-gray-400">
          {logItem.projectName ?? "No project"}
        </p>
      </div>
      <div className="flex w-[200px] items-center justify-center gap-2 px-4">
        <span>
          {startTime} - {endTime}
        </span>
      </div>
      <div className="flex w-[200px] items-center justify-center gap-2 px-4">
        <ClockIcon />
        {formatSeconds(logItem.seconds)}
      </div>
      <div>
        <Dropdown
          trigger={
            <div className="relative">
              <Button icon={<ThreeDotsIcon />} size="xs" color="white" />
            </div>
          }
          items={[
            {
              label: "Edit",
              onClick: () => handleEdit(),
            },
            {
              label: "Delete",
              onClick: () => handleDelete(),
            },
          ]}
        />
      </div>
    </div>
  );
}
