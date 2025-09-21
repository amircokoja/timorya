import {
  ChartData,
  ChartType,
  FormatTypes,
} from "@/src/components/charts/chart-model";

export const MetricCardTotalEarnings: ChartData = {
  type: ChartType.MetricCard,
  data: [
    {
      total: 12000,
    },
  ],
  meta: {
    title: "Total Earnings",
    selectedMeasures: [
      {
        key: "total",
        label: "Total Earnings",
      },
    ],
    selectedDimensions: [],
    format: {
      total: {
        dataType: FormatTypes.currency,
      },
    },
  },
};
