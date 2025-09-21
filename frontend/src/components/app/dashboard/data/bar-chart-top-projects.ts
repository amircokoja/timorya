import {
  ChartData,
  ChartType,
  FormatTypes,
} from "@/src/components/charts/chart-model";

export const BarChartTopProjects: ChartData = {
  type: ChartType.BarChart,
  data: [
    { project: "oneLake", value: 3000 },
    { project: "Timorya", value: 3000 },
    { project: "Rahat kuca", value: 5000 },
    { project: "Kalam", value: 2000 },
  ],
  meta: {
    title: "Project Hours This Week",
    selectedMeasures: [
      {
        key: "value",
        label: "Hours Worked",
        fill: "#7dd195",
      },
    ],
    selectedDimensions: [
      {
        key: "project",
        label: "Project",
      },
    ],
    format: {
      value: {
        dataType: FormatTypes.time,
      },
      project: {
        dataType: FormatTypes.string,
      },
    },
  },
};
