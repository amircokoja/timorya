import {
  ChartData,
  ChartType,
  FormatTypes,
} from "@/src/components/charts/chart-model";

export const MetricCardBillableHours: ChartData = {
  type: ChartType.MetricCard,
  data: [
    {
      total: 100000,
    },
  ],
  meta: {
    title: "Total Billable Hours",
    selectedMeasures: [
      {
        key: "total",
        label: "Total Billable Hours",
      },
    ],
    selectedDimensions: [],
    format: {
      total: {
        dataType: FormatTypes.time,
      },
    },
  },
};
