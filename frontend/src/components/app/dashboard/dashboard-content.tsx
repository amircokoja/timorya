import TimeLogger from "./time-logger/time-logger";
import { useGet } from "@/src/hooks/use-get";
import { TimeLogWeekGroup } from "@/src/models/time-logs/time-log-week-group";
import DashboardWeek from "./dashboard-week";
import { PaginatedResut } from "@/src/models/abstractions/paginated-result";
import { useState, useEffect } from "react";
import Pagination from "../../ui/pagination";

export default function DashboardContent() {
  const [page, setPage] = useState(1);

  const { data } = useGet<PaginatedResut<TimeLogWeekGroup>>({
    url: "/time-logs?page=" + page + "&pageSize=5",
  });

  // Store the last valid data to prevent flickering
  const [lastData, setLastData] = useState<typeof data>(undefined);

  useEffect(() => {
    if (data !== undefined && data !== null) {
      setLastData(data);
    }
  }, [data]);

  const renderData = data ?? lastData;

  return (
    <>
      <TimeLogger />
      <div className="flex flex-1 flex-col justify-between">
        <div className="mt-4 mb-10">
          {renderData?.items?.map((group) => (
            <div key={group.week} className="mb-8 last:mb-0">
              <DashboardWeek weekGroup={group} />
            </div>
          ))}
        </div>
        <Pagination
          currentPage={page}
          totalPages={renderData?.totalPages || 1}
          onPageChange={setPage}
        />
      </div>
    </>
  );
}
