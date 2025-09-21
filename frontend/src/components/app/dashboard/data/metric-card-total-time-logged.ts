import {
  ChartData,
  ChartType,
  FormatTypes,
} from "@/src/components/charts/chart-model";

export const MetricCardTotalTimeLogged: ChartData = {
  type: ChartType.MetricCard,
  data: [
    {
      total: 120000,
    },
  ],
  meta: {
    title: "Total Time Logged",
    selectedMeasures: [
      {
        key: "total",
        label: "Total Time Logged",
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
