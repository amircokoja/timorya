import { LOCALES } from "./locales";

// locale is hardoced to GERMAN because of thousand(.) and decimal(,) sperators

/**
 * Parses a string into a number, supporting both EU and US styles.
 * - Handles comma/period decimal separators.a
 * - Strips currency symbols, spaces, and thousand separators.
 */
export const parseLocaleNumber = (raw: string): number => {
  if (!raw) return NaN;

  let s = raw.toString().trim().normalize("NFKC");

  if (!/\d/.test(s)) return NaN;

  // Reject if letters exist (allow only digits, separators, symbols, parentheses, minus)
  // NOTE: currency symbols ($€£¥) and spaces are allowed
  if (/[a-zA-Z]/.test(s)) return NaN;

  // Remove leading non-digit (e.g. currency) and trailing junk
  s = s.replace(/^[^\d\-()]+/, "").replace(/[^0-9,)]+$/u, "");

  const isNegative = /^\(.*\)$/.test(s);
  if (isNegative) s = s.replace(/[()]/g, "");

  const lastDot = s.lastIndexOf(".");
  const lastComma = s.lastIndexOf(",");

  if (lastDot > -1 && lastComma > -1) {
    // Both separators present – the last one is the decimal
    if (lastDot > lastComma) {
      s = s.replace(/,/g, "");
    } else {
      s = s.replace(/\./g, "").replace(",", ".");
    }
  } else if (lastComma > -1) {
    s = s.replace(",", "."); // only comma → decimal
  } else {
    // Remove thousands separators (dot, apostrophe, thin space, NBSP, etc.)
    s = s.replace(/(?<=\d)[.’'\u202F\u00A0\s](?=\d{3}\b)/g, "");
  }

  // Extra guard: string must now be purely numeric with optional dot
  if (!/^-?\d*\.?\d*$/.test(s)) return NaN;

  const num = Number(s);
  return isNegative ? -num : num;
};

/**
 * Formats a number with 2 decimal digits in German locale.
 * Accepts numbers and locale-formatted strings.
 */
export const formatDecimal = (
  input: number | string,
  options?: Intl.NumberFormatOptions,
): string => {
  const parsed = typeof input === "number" ? input : parseLocaleNumber(input);

  if (!Number.isFinite(parsed)) return "";

  return parsed.toLocaleString(LOCALES.ENGLISH, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    ...options,
  });
};

/**
 * Formats a number with 0 decimal digits in German locale.
 */
export const formatInteger = (input: number | string): string => {
  const parsed = typeof input === "number" ? input : parseLocaleNumber(input);

  if (!Number.isFinite(parsed)) return "";

  return parsed.toLocaleString(LOCALES.ENGLISH, {
    maximumFractionDigits: 0,
  });
};

/**
 * Formats a number as currency in German locale.
 * Accepts strings like "1.234,56 €" or "$1,234.56".
 */
export const formatCurrency = (
  input: number | string,
  currency: string = "EUR",
): string => {
  const parsed = typeof input === "number" ? input : parseLocaleNumber(input);

  if (!Number.isFinite(parsed)) return "";

  return new Intl.NumberFormat(LOCALES.ENGLISH, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(parsed);
};
