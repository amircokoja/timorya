"use client";

import React from "react";
import { ChartData, ChartType } from "./chart-model";
import dynamic from "next/dynamic";
import "./charts.scss";

const BarChart = dynamic(
  () => import("./implementation/bar-chart/bar-chart").then((m) => m.BarChart),
  {
    ssr: false,
    loading: () => <div className="animate-pulse">Loading chart…</div>,
  },
);

const MetricCard = dynamic(
  () => import("./implementation/metric-card").then((m) => m.MetricCard),
  { ssr: false, loading: () => <div className="animate-pulse">Loading…</div> },
);

const chartMap: Partial<
  Record<ChartType, React.ComponentType<{ chartData: ChartData }>>
> = {
  [ChartType.BarChart]: BarChart,
  [ChartType.MetricCard]: MetricCard,
};

interface Props {
  chartData: ChartData;
}

export const ChartBuilder: React.FC<Props> = React.memo(({ chartData }) => {
  const ChartComponent = chartMap[chartData.type];
  if (!ChartComponent) {
    return null;
  }
  return <ChartComponent chartData={chartData} />;
});

export default ChartBuilder;
ChartBuilder.displayName = "ChartBuilder";
