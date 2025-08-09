import { TimeLogDto } from "@/src/models/time-logs/time-log-dto";
import { useGet } from "../use-get";

export const useGetCalendarTimeLogs = (startDate: Date, endDate: Date) => {
  const normalizedStart = new Date(startDate);
  normalizedStart.setHours(0, 0, 0, 0);

  const normalizedEnd = new Date(endDate);
  normalizedEnd.setHours(23, 59, 59, 999);

  const { data } = useGet<TimeLogDto[]>({
    url:
      "/time-logs/calendar?startDate=" +
      normalizedStart.toUTCString() +
      "&endDate=" +
      normalizedEnd.toUTCString(),
  });

  return {
    data:
      data?.map((item) => ({
        ...item,
        start: new Date(item.start),
        end: new Date(item.end),
      })) ?? [],
  };
};
