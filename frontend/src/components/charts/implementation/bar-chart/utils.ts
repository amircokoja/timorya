import { ChartData, FormatTypes } from "../../chart-model";
import { formatDecimal } from "../../formatting/numbers";
import { valueFormatter } from "../../formatting/utils";
export const FONT_FAMILY: string = "16px Inter";

export const getLeftMargin = (
  data: ChartData["data"],
  labelFormatType: FormatTypes,
  dimensionKey: string,
) => {
  const font = FONT_FAMILY;
  const maxLabel = data.reduce((max, item) => {
    const words = String(
      valueFormatter(item[dimensionKey]!, labelFormatType),
    ).split(" ");

    const widestWord = words.reduce((widest, word) => {
      const wordWidth = getTextWidth(word, font);
      return wordWidth > getTextWidth(widest, font) ? word : widest;
    }, "");
    return getTextWidth(widestWord, font) > getTextWidth(max, font)
      ? widestWord
      : max;
  }, "");

  const pixelWidth = getTextWidth(maxLabel, font);

  //weird formula for getting the correct margin, found with trial and error
  const res = pixelWidth + 15;

  return res;
};

// cached canvas for client-side text measurement
let measurementCanvas: HTMLCanvasElement | null = null;

export const getTextWidth = (text: string, font = FONT_FAMILY): number => {
  if (typeof window === "undefined" || typeof document === "undefined") {
    // Fallback approximation during SSR (average char width heuristic)
    return text.length * 8;
  }

  if (!measurementCanvas) {
    measurementCanvas = document.createElement("canvas");
  }

  const context = measurementCanvas.getContext("2d");
  if (!context) {
    return text.length * 8;
  }

  context.font = font;
  return context.measureText(text).width;
};

// different heights for different data/label lengths
export const getChartHeight = (
  data: ChartData["data"],
  labelFormatType: FormatTypes,
  dimensionKey: string,
) => {
  const leftMarginWidth = getLeftMargin(data, labelFormatType, dimensionKey);

  const isMultipleThreeRowLabels = data.some((item, index) => {
    if (index < data.length - 1) {
      const currentLabelWidth = getTextWidth(String(item[dimensionKey]));
      const nextLabelWidth = getTextWidth(
        String(data[index + 1][dimensionKey]),
      );

      return (
        currentLabelWidth > 1.5 * leftMarginWidth &&
        nextLabelWidth > 1.5 * leftMarginWidth
      );
    }
    return false;
  });

  if (isMultipleThreeRowLabels) {
    return data.length * 65;
  }

  if (data.some((item) => String(item[dimensionKey]).split(" ").length >= 3))
    return data.length * 55;

  if (data.length === 1) return 55;

  return data.length * 55;
};

export const getRightMargin = (
  data: ChartData["data"],
  dimensionKey: string,
) => {
  const font = FONT_FAMILY;

  const maxValueLabel = data.reduce((max, item) => {
    const valueKey = Object.keys(item).find(
      (key) => key !== "label" && key !== dimensionKey,
    );
    if (!valueKey) return max;

    const valueFormatted = item[valueKey] ? formatDecimal(+item[valueKey]) : "";

    return getTextWidth(valueFormatted, font) > getTextWidth(max, font)
      ? valueFormatted
      : max;
  }, "");

  const pixelWidth = getTextWidth(maxValueLabel, font);

  if (pixelWidth < 80) return pixelWidth;

  //weird formula for getting the correct margin, found with trial and error
  return Math.ceil((7 / 3) * (pixelWidth - 45));
};
