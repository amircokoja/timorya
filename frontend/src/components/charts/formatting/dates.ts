import { format } from "date-fns";
import { DEFAULT_DATE_FORMAT, LOCALES } from "./locales";
import { getDateLocale } from "./date-locale";

// temporarily set to german
const getLocaleLanguage = () => LOCALES.ENGLISH;

export const formatLocaleDate = (
  date: string | number,
  { isLong = false } = {},
) => {
  if (!date) {
    return "";
  }
  // If the date is a string and can be parsed as a number, treat it as a timestamp
  if (typeof date === "string" && !isNaN(Number(date))) {
    date = Number(date);
  }

  return format(new Date(date), isLong ? "PPP" : "P", {
    locale: getDateLocale(getLocaleLanguage()),
  });
};

export const formatLocaleDateTime = (
  date: string | number,
  { isLong = false, hasTimeZone = false } = {},
) => {
  if (!date) {
    return "";
  }
  // If the date is a string and can be parsed as a number, treat it as a timestamp
  if (typeof date === "string" && !isNaN(Number(date))) {
    date = Number(date);
  }

  const newDate = new Date(date);
  // If the created date is invalid, return the original input
  if (isNaN(newDate.getTime())) {
    return String(date);
  }

  const localeLanguage = getLocaleLanguage();
  const dateTimePattern = isLong
    ? `PPpp${hasTimeZone ? "p" : ""}`
    : `Pp${hasTimeZone ? "pp" : ""}`;

  return format(newDate, dateTimePattern, {
    locale: getDateLocale(localeLanguage),
  });
};

export const formatLocaleTime = (date: Date) => {
  const localeLanguage = getLocaleLanguage();

  return format(date, "p", { locale: getDateLocale(localeLanguage) });
};

export const formatDate = (date: Date, formatter?: string, language?: string) =>
  format(date, formatter || DEFAULT_DATE_FORMAT, {
    locale: getDateLocale(language || getLocaleLanguage()),
  });
