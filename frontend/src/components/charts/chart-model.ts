export type ChartData = {
  type: ChartType;
  data: DataType[];
  meta: ChartMeta;
};

export type DataType = {
  [x: string]: number | string | null;
};

export enum ChartType {
  MetricCard = "MetricCard",
  BarChart = "BarChart",
  // AreaChart = "AreaChart",
  // LineChart = "LineChart",
  // PieChart = "PieChart",
  // ScatterChart = "ScatterChart",
  // ComposedChart = "ComposedChart",
}

interface ChartMeasure {
  key: string;
  label: string;
  fill?: string;
}

interface ChartDimension {
  key: string;
  label: string;
}

export type FormatType = {
  [x: string]: {
    dataType: FormatTypes;
  };
};

export type ChartMeta = {
  title: string;
  selectedMeasures: ChartMeasure[];
  selectedDimensions: ChartDimension[];
  format: FormatType;
};

export enum FormatTypes {
  string = "string",
  int = "int",
  decimal = "decimal",
  date = "date",
  date_time = "date_time",
  time = "time",
  currency = "currency",
  tinyint = "tinyint",
}
