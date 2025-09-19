import { TimeLogGroup } from "@/src/models/time-logs/time-log-group";
import { generateDateValue } from "./utils";
import LogItem from "./log-item";
import TimeDisplay from "../../ui/time-display";

interface Props {
  logGroup: TimeLogGroup;
  elapsedSeconds: number;
}

const isToday = (date: Date) => {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

export default function LogTable({ logGroup, elapsedSeconds }: Props) {
  let total = logGroup.timeLogs.reduce((acc, log) => acc + log.seconds, 0);

  if (isToday(new Date(logGroup.date))) {
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
          <TimeDisplay customClasses="py-4 text-sm" seconds={total} />
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
