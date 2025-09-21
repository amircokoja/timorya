"use client";
import React from "react";
import {
  Bar,
  BarChart as RechartsBarChart,
  ResponsiveContainer,
  Tooltip,
  TooltipContentProps,
  XAxis,
} from "recharts";
import { ChartData } from "../../chart-model";
import { getChartHeight } from "./utils";
import { BarChartTooltip } from "./bar-chart-tooltip";
import { BarChartLegend } from "./bar-chart-legend";
import "./bar-chart.scss";
import { valueFormatter } from "../../formatting/utils";

interface Props {
  chartData: ChartData;
}

export const BarChart = React.memo(({ chartData }: Props) => {
  const labelFormatType = chartData.meta.format.label?.dataType;

  const selectedMeasure = chartData.meta.selectedMeasures[0];
  const selectedDimension = chartData.meta.selectedDimensions[0];

  return (
    <>
      <ResponsiveContainer
        width="100%"
        height={getChartHeight(
          chartData.data,
          labelFormatType,
          selectedDimension.key,
        )}
        minHeight={50}
      >
        <RechartsBarChart data={chartData.data} layout="horizontal">
          <Tooltip
            content={(props: TooltipContentProps<string, string>) => (
              <BarChartTooltip
                {...props}
                dataFormats={chartData.meta.format}
                hideMeasureName
              />
            )}
            cursor={false}
            wrapperStyle={{ zIndex: 1000 }}
          />
          {/* <YAxis
            type="number"
            style={{
              fontSize: "0.875rem",
            }}
          /> */}
          <XAxis
            dataKey={selectedDimension.key}
            type="category"
            style={{
              fontSize: "0.875rem",
            }}
            axisLine={false}
            tickLine={false}
          />
          <Bar
            isAnimationActive={false}
            dataKey={selectedMeasure.key}
            fill={selectedMeasure.fill}
            format={chartData.meta.format[selectedMeasure.key]?.dataType}
            radius={[6, 6, 6, 6]}
            label={{
              position: "top",
              style: { fontSize: "0.75rem", fill: "gray" },
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              formatter: (value: any) =>
                valueFormatter(
                  value,
                  chartData.meta.format[selectedMeasure.key]?.dataType,
                ),
            }}
          />
        </RechartsBarChart>
      </ResponsiveContainer>
      <BarChartLegend selectedMeasures={chartData.meta.selectedMeasures} />
    </>
  );
});

BarChart.displayName = "BarChart";
