import { formatSeconds } from "../../app/time-tracker/utils";
import { FormatTypes } from "../chart-model";
import { formatLocaleDate, formatLocaleDateTime } from "./dates";
import { formatCurrency, formatDecimal, formatInteger } from "./numbers";

export const valueFormatter = (
  value: string | number,
  type: FormatTypes,
): string => {
  if (value === null || value === undefined) return "";

  switch (type) {
    case FormatTypes.currency:
      return formatCurrency(value);
    case FormatTypes.date:
      return formatLocaleDate(value);
    case FormatTypes.date_time:
      return formatLocaleDateTime(String(value));
    case FormatTypes.time:
      return formatSeconds(value);
    case FormatTypes.tinyint:
      return String(value);
    case FormatTypes.decimal:
      return formatDecimal(value).toString();
    case FormatTypes.int:
    case "bigint" as FormatTypes: // TODO: remove this once we have a bigint type
      return formatInteger(value).toString();
    default:
      return String(value);
  }
};
