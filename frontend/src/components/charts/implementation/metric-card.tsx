"use client";

import { ChartData } from "../chart-model";
import { convertToReadableText } from "../formatting/text";
import { valueFormatter } from "../formatting/utils";

interface Props {
  chartData: ChartData;
}

export const MetricCard = ({ chartData }: Props) => {
  const measureSelection = chartData.meta.selectedMeasures[0];
  const metricCardValue = chartData.data[0][measureSelection.key];

  return (
    <div className="flex flex-col gap-[10px] pt-4">
      <div className="flex items-center gap-1.5">
        <span className="text-base text-gray-600">
          {metricCardValue
            ? valueFormatter(
                metricCardValue,
                chartData.meta.format?.[measureSelection.key].dataType,
              )
            : ""}
        </span>
        <span className="text-sm font-normal text-gray-400">
          {convertToReadableText(measureSelection.key)}
        </span>
      </div>
    </div>
  );
};
