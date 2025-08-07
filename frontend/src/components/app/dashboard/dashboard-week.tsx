import { TimeLogWeekGroup } from "@/src/models/time-logs/time-log-week-group";
import LogTable from "./log-table";
import { formatSeconds } from "./utils";

interface Props {
  weekGroup: TimeLogWeekGroup;
  elapsedSeconds: number;
}

const isCurrentWeek = (week: string): boolean => {
  return week === "This week";
};

export default function DashboardWeek({ weekGroup, elapsedSeconds }: Props) {
  const weekTotal = weekGroup.dates?.reduce((acc, group) => {
    const groupTotal = group.timeLogs.reduce(
      (sum, log) => sum + log.seconds,
      0,
    );

    if (isCurrentWeek(weekGroup.week)) {
      return acc + groupTotal + elapsedSeconds;
    }
    return acc + groupTotal;
  }, 0);

  return (
    <>
      <div className="mb-2 flex items-center justify-between">
        <p className="text-sm">{weekGroup.week}</p>
        <div>
          <p className="text-xs text-gray-400">
            Week total:{" "}
            <span className="text-sm font-semibold text-gray-600">
              {formatSeconds(weekTotal)}
            </span>
          </p>
        </div>
      </div>
      {weekGroup.dates?.map((group) => (
        <div
          key={group.date.toString()}
          className="mb-4 overflow-auto rounded-lg border border-gray-200 last:mb-0"
        >
          <LogTable
            logGroup={group}
            elapsedSeconds={elapsedSeconds}
            isCurrentWeek={isCurrentWeek(weekGroup.week)}
          />
        </div>
      ))}
    </>
  );
}
