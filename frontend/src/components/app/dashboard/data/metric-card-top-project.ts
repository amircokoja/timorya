import {
  ChartData,
  ChartType,
  FormatTypes,
} from "@/src/components/charts/chart-model";

export const MetricCardTopProject: ChartData = {
  type: ChartType.MetricCard,
  data: [
    {
      project: "oneLake",
    },
  ],
  meta: {
    title: "Top Project",
    selectedMeasures: [
      {
        key: "project",
        label: "Top Project",
      },
    ],
    selectedDimensions: [],
    format: {
      project: {
        dataType: FormatTypes.string,
      },
    },
  },
};
