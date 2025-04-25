import TimeLogger from "./time-logger/time-logger";
import { useGet } from "@/src/hooks/use-get";
import { TimeLogWeekGroup } from "@/src/models/time-logs/time-log-week-group";
import DashboardWeek from "./dashboard-week";

export default function DashboardContent() {
  const { data } = useGet<TimeLogWeekGroup[]>({ url: "/time-logs" });
  return (
    <>
      <TimeLogger />
      <div className="mt-4">
        {data?.map((group) => (
          <div key={group.week} className="mb-8 last:mb-0">
            <DashboardWeek weekGroup={group} />
          </div>
        ))}
      </div>
    </>
  );
}
