import { TimeLogWeekGroup } from "@/src/models/time-logs/time-log-week-group";
import LogTable from "./log-table";
import TimeDisplay from "../../ui/time-display";

interface Props {
  weekGroup: TimeLogWeekGroup;
  elapsedSeconds: number;
}

const isCurrentWeek = (week: string): boolean => {
  return week === "This week";
};

export default function TimeTrackerWeek({ weekGroup, elapsedSeconds }: Props) {
  const weekTotal =
    (weekGroup.dates?.reduce(
      (acc, { timeLogs }) =>
        acc + timeLogs.reduce((sum, { seconds }) => sum + seconds, 0),
      0,
    ) ?? 0) + (isCurrentWeek(weekGroup.week) ? elapsedSeconds : 0);

  return (
    <>
      <div className="mb-2 flex items-center justify-between">
        <p className="text-sm">{weekGroup.week}</p>
        <div className="flex items-center gap-2">
          <p className="text-xs text-gray-400">Week total:</p>
          <TimeDisplay
            seconds={weekTotal}
            customClasses="text-sm font-semibold text-gray-600"
          />
        </div>
      </div>
      {weekGroup.dates?.map((group) => (
        <div
          key={group.date.toString()}
          className="mb-4 overflow-auto rounded-lg border border-gray-200 last:mb-0"
        >
          <LogTable logGroup={group} elapsedSeconds={elapsedSeconds} />
        </div>
      ))}
    </>
  );
}
