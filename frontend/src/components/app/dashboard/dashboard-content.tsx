"use client";

import TimeLogger from "./time-logger/time-logger";
import { useGet } from "@/src/hooks/use-get";
import { TimeLogWeekGroup } from "@/src/models/time-logs/time-log-week-group";
import DashboardWeek from "./dashboard-week";
import { PaginatedResut } from "@/src/models/abstractions/paginated-result";
import { useState, useEffect } from "react";
import Pagination from "../../ui/pagination";
import { formatSeconds } from "./utils";
import { metadata } from "@/src/models/data/metadata";
import Loading from "../../ui/loading";
import { UserDataDto } from "@/src/models/users/user-data-dto";
import NewOrganization from "../organizations/new-organization";

export default function DashboardContent() {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [page, setPage] = useState(1);

  const { data: userData } = useGet<UserDataDto>({
    url: "users/me",
  });

  const { data, isFetching } = useGet<PaginatedResut<TimeLogWeekGroup>>({
    url: "/time-logs?page=" + page + "&pageSize=30",
  });

  // Store the last valid data to prevent flickering
  const [lastData, setLastData] = useState<typeof data>(undefined);

  useEffect(() => {
    if (data !== undefined && data !== null) {
      setLastData(data);
    }
  }, [data]);

  const dataAvailable = data && data.items && data.items.length > 0;
  const renderData = data ?? lastData;

  useEffect(() => {
    if (elapsedSeconds > 0) {
      document.title = `Timorya | ${formatSeconds(elapsedSeconds)}`;
    } else {
      document.title = metadata.title as string;
    }
  }, [elapsedSeconds]);

  const renderDataItems = () => (
    <div className="mt-4 mb-10">
      {renderData?.items?.map((group) => (
        <div key={group.week} className="mb-8 last:mb-0">
          <DashboardWeek weekGroup={group} elapsedSeconds={elapsedSeconds} />
        </div>
      ))}
    </div>
  );

  const renderEmptyState = () => (
    <div className="align-center flex h-full justify-center">
      <div className="flex h-full flex-col items-center justify-center p-6 text-center">
        <div className="mb-4 rounded-lg bg-gray-100 p-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h2 className="mb-2 text-xl font-semibold text-gray-800">
          No hours logged yet
        </h2>
        <p className="mb-6 max-w-md text-base font-light text-gray-500">
          Start tracking your working hours to see your time in calendar.
        </p>
        {!userData?.currentOrganizationId && <NewOrganization context="logs" />}
      </div>
    </div>
  );

  return (
    <>
      <TimeLogger
        elapsedSeconds={elapsedSeconds}
        setElapsedSeconds={setElapsedSeconds}
      />
      <div className="flex flex-1 flex-col justify-between">
        {isFetching ? (
          <Loading />
        ) : dataAvailable ? (
          renderDataItems()
        ) : (
          renderEmptyState()
        )}

        {dataAvailable && (
          <Pagination
            currentPage={page}
            totalPages={renderData?.totalPages || 1}
            onPageChange={setPage}
          />
        )}
      </div>
    </>
  );
}
