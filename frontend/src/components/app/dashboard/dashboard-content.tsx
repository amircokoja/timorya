import TimeLogger, { TimeLogGroup } from "./time-logger";
import LogTable from "./log-table";
import { useGet } from "@/src/hooks/use-get";

export default function DashboardContent() {
  const { data } = useGet<TimeLogGroup[]>({ url: "/time-logs" });
  return (
    <>
      <TimeLogger />
      {data?.map((group) => (
        <LogTable key={group.date.toString()} logGroup={group} />
      ))}
    </>
  );
}
