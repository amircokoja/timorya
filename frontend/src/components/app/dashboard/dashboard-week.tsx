import { TimeLogWeekGroup } from "@/src/models/time-logs/time-log-week-group";
import LogTable from "./log-table";
import { formatTime } from "./utils";

interface Props {
  weekGroup: TimeLogWeekGroup;
}

export default function DashboardWeek({ weekGroup }: Props) {
  const weekTotal = weekGroup.dates?.reduce((acc, group) => {
    const groupTotal = group.timeLogs.reduce(
      (sum, log) => sum + log.seconds,
      0,
    );
    return acc + groupTotal;
  }, 0);

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm">{weekGroup.week}</p>
        <div>
          <p className="text-xs text-gray-400">
            Week total:{" "}
            <span className="text-sm font-semibold text-gray-600">
              {formatTime(weekTotal)}
            </span>
          </p>
        </div>
      </div>
      {weekGroup.dates?.map((group) => (
        <div
          key={group.date.toString()}
          className="mb-4 overflow-auto rounded-lg border border-gray-200 last:mb-0"
        >
          <LogTable logGroup={group} />
        </div>
      ))}
    </>
  );
}
