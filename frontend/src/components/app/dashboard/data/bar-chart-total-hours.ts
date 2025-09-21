import {
  ChartData,
  ChartType,
  FormatTypes,
} from "@/src/components/charts/chart-model";

export const BarChartTotalHours: ChartData = {
  type: ChartType.BarChart,
  data: [
    { day: "Monday", value: 3000 },
    { day: "Tuesday", value: 3000 },
    { day: "Wednesday", value: 2000 },
    { day: "Thursday", value: 4780 },
    { day: "Friday", value: 1890 },
    { day: "Saturday", value: 2390 },
    { day: "Sunday", value: 3490 },
  ],
  meta: {
    title: "Total Hours Worked",
    selectedMeasures: [
      {
        key: "value",
        label: "Hours Worked",
        fill: "#6baed6",
      },
    ],
    selectedDimensions: [
      {
        key: "day",
        label: "Day",
      },
    ],
    format: {
      value: {
        dataType: FormatTypes.time,
      },
      day: {
        dataType: FormatTypes.string,
      },
    },
  },
};
