const formatDate = (date: Date) => {
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear().toString().slice(-2);
  return `${day} ${month} ${year}`;
};

const startOfDay = (d: Date) =>
  new Date(d.getFullYear(), d.getMonth(), d.getDate());
const addDays = (d: Date, days: number) => {
  const nd = new Date(d);
  nd.setDate(nd.getDate() + days);
  return startOfDay(nd);
};
const startOfWeekMonday = (d: Date) => {
  const day = d.getDay(); // 0=Sun
  const diff = day === 0 ? -6 : 1 - day; // shift Sunday to previous Monday
  return addDays(d, diff);
};

export interface SuggestionOption {
  label: string;
  dateRange: string;
  start: Date;
  end: Date;
}

export const generateSuggestionOptions = (
  now: Date = new Date(),
): SuggestionOption[] => {
  const today = startOfDay(now);
  const yesterday = addDays(today, -1);

  const rangeLabel = (start: Date, end: Date) =>
    start.getTime() === end.getTime()
      ? formatDate(start)
      : `${formatDate(start)} - ${formatDate(end)}`;

  // Today
  const todayStart = today;
  const todayEnd = today;

  // Yesterday
  const yStart = yesterday;
  const yEnd = yesterday;

  // This week (Monday -> yesterday; if today is Monday use today)
  const weekStart = startOfWeekMonday(today);
  const weekEndCandidate = yesterday;
  const weekEnd = weekEndCandidate < weekStart ? today : weekEndCandidate;

  // Last 7 days (excluding today; 7 distinct days ending yesterday)
  const last7End = yesterday;
  const last7Start = addDays(last7End, -6);

  // Last 30 days (excluding today; 30 distinct days ending yesterday)
  const last30End = yesterday;
  const last30Start = addDays(last30End, -29);

  // This month (1st of month -> yesterday; if today is the 1st use today)
  const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
  const monthEnd = yesterday < monthStart ? today : yesterday;

  // This year (Jan 1 -> yesterday; if today is Jan 1 use today)
  const yearStart = new Date(today.getFullYear(), 0, 1);
  const yearEnd = yesterday < yearStart ? today : yesterday;

  return [
    {
      label: "Today",
      start: todayStart,
      end: todayEnd,
      dateRange: rangeLabel(todayStart, todayEnd),
    },
    {
      label: "Yesterday",
      start: yStart,
      end: yEnd,
      dateRange: rangeLabel(yStart, yEnd),
    },
    {
      label: "This week",
      start: weekStart,
      end: weekEnd,
      dateRange: rangeLabel(weekStart, weekEnd),
    },
    {
      label: "Last 7 days",
      start: last7Start,
      end: last7End,
      dateRange: rangeLabel(last7Start, last7End),
    },
    {
      label: "Last 30 days",
      start: last30Start,
      end: last30End,
      dateRange: rangeLabel(last30Start, last30End),
    },
    {
      label: "This month",
      start: monthStart,
      end: monthEnd,
      dateRange: rangeLabel(monthStart, monthEnd),
    },
    {
      label: "This year",
      start: yearStart,
      end: yearEnd,
      dateRange: rangeLabel(yearStart, yearEnd),
    },
  ];
};
