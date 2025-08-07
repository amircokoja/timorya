import { TimeLogGroup } from "@/src/models/time-logs/time-log-group";
import { formatSeconds, generateDateValue } from "./utils";
import LogItem from "./log-item";

interface Props {
  logGroup: TimeLogGroup;
  elapsedSeconds: number;
  isCurrentWeek: boolean;
}

export default function LogTable({
  logGroup,
  elapsedSeconds,
  isCurrentWeek,
}: Props) {
  let total = logGroup.timeLogs.reduce((acc, log) => acc + log.seconds, 0);
  if (isCurrentWeek) {
    total += elapsedSeconds;
  }

  return (
    <>
      <div className="flex justify-between bg-gray-100 px-4">
        <p className="py-4 text-sm">
          {generateDateValue(new Date(logGroup.date))}
        </p>
        <div className="flex items-center">
          <p className="mr-2 text-sm text-gray-500">Total:</p>
          <p className="py-4 text-sm">{formatSeconds(total)}</p>
        </div>
      </div>
      <div>
        {logGroup?.timeLogs?.map((log) => (
          <LogItem logItem={log} key={log.id} />
        ))}
      </div>
    </>
  );
}
