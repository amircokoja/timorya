import { TimeLogGroup } from "@/src/models/time-logs/time-log-group";
import { ClockIcon } from "../../icons/clock-icon";
import { ThreeDotsIcon } from "../../icons/three-dots-icon";
import Button from "../../ui/button";
import Dropdown from "../../ui/dropdown";
import { formatDescription, formatTime, generateDateValue } from "./utils";

interface Props {
  logGroup: TimeLogGroup;
}

export default function LogTable({ logGroup }: Props) {
  const total = logGroup.timeLogs.reduce((acc, log) => acc + log.seconds, 0);

  return (
    <div className="mt-4 overflow-auto rounded-lg border border-gray-200">
      <div className="flex justify-between bg-gray-100 px-4">
        <p className="py-4 text-sm">
          {generateDateValue(new Date(logGroup.date))}
        </p>
        <div className="flex items-center">
          <p className="mr-2 text-sm text-gray-500">Total:</p>
          <p className="py-4 text-sm">{formatTime(total)}</p>
        </div>
      </div>
      <div>
        {logGroup?.timeLogs?.map((log) => (
          <div
            key={log.id}
            className="flex items-center justify-between border-b border-gray-200 bg-white p-4 text-sm text-gray-500 last:border-b-0"
          >
            <div className="flex-1">
              <p className="text-gray-900">
                {formatDescription(log.description)}
              </p>
              <p className="text-xs text-gray-400">
                {log.projectName ?? "No project"}
              </p>
            </div>
            <div className="flex w-[200px] items-center justify-center gap-2 px-4">
              {new Date(log.start).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}{" "}
              -{" "}
              {new Date(log.end).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
            <div className="flex w-[200px] items-center justify-center gap-2 px-4">
              <ClockIcon />
              {formatTime(log.seconds)}
            </div>
            <div>
              <Dropdown
                trigger={
                  <div className="relative">
                    <Button icon={<ThreeDotsIcon />} size="xs" color="white" />
                  </div>
                }
                items={
                  [
                    // {
                    //   label: "Edit",
                    //   onClick: () => handleEdit(project),
                    // },
                    // {
                    //   label: "Delete",
                    //   onClick: () => handleDelete(project),
                    // },
                  ]
                }
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
