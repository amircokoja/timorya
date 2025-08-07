export const isValidTimeFormat = (time: string): boolean => {
  const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/;
  return timePattern.test(time);
};

export const isFutureTime = (time: string): boolean => {
  const [hours, minutes] = time.split(":").map(Number);
  const now = new Date();
  return (
    hours > now.getHours() ||
    (hours === now.getHours() && minutes > now.getMinutes())
  );
};

export const isSameTimeAsStart = (time: string, start: Date): boolean => {
  const [hours, minutes] = time.split(":").map(Number);
  return (
    hours === new Date(start).getHours() &&
    minutes === new Date(start).getMinutes()
  );
};
