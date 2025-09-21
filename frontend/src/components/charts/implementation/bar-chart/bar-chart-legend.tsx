import { ChartData } from "../../chart-model";

interface Props {
  selectedMeasures: ChartData["meta"]["selectedMeasures"];
}

export const BarChartLegend = ({ selectedMeasures }: Props) => {
  return (
    <div className="custom-bar-legend">
      {selectedMeasures?.map((item, index) => (
        <div key={`item-${index}`} className="legend-item">
          <div className="legend-bar" style={{ background: item.fill }} />{" "}
          <p>{item.label}</p>
        </div>
      ))}
    </div>
  );
};
