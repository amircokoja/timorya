export const formatSeconds = (totalSeconds: number) => {
  const hrs = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const mins = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
  const secs = String(totalSeconds % 60).padStart(2, "0");
  return `${hrs}:${mins}:${secs}`;
};

export const formatTime = (date: Date) => {
  return new Date(date).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

export const formatDescription = (description: string) => {
  if (!description || description == "") {
    return "No description";
  }
  return description;
};

export const generateDateValue = (date: Date) => {
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  const isToday = date.toDateString() === today.toDateString();
  const isYesterday = date.toDateString() === yesterday.toDateString();
  if (isToday) {
    return "Today";
  }
  if (isYesterday) {
    return "Yesterday";
  }
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export const updateTimeForDate = (
  date: Date,
  time: string,
  isMultiDayEvent: boolean = false,
): Date => {
  const [hours, minutes] = time.split(":").map(Number);
  const updatedDate = new Date(date);
  updatedDate.setHours(hours, minutes, 0, 0);
  if (isMultiDayEvent) {
    updatedDate.setDate(updatedDate.getDate() + 1);
  }
  return updatedDate;
};

export const getTimeDifferenceInSeconds = (start: Date, end: Date): number => {
  const diffInMilliseconds = end.getTime() - start.getTime();
  return Math.floor(diffInMilliseconds / 1000);
};
