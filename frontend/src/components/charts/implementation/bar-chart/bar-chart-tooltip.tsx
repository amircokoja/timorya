import { TooltipContentProps } from "recharts";
import { ChartData } from "../../chart-model";
import { valueFormatter } from "../../formatting/utils";
import "./bar-chart.scss";

interface Props extends TooltipContentProps<string, string> {
  dataFormats: ChartData["meta"]["format"];
  hideMeasureName?: boolean;
}
export const BarChartTooltip = ({
  payload,
  label,
  dataFormats,
  hideMeasureName,
}: Props) => {
  return (
    <div className="custom-tooltip">
      <p className="tooltip-label">{label}</p>
      <div className="tooltip-items">
        {payload?.map((entry, index) => (
          <div key={`item-${index}`} className="tooltip-item">
            <div className="legend-bar" style={{ background: entry.color }} />{" "}
            <p>
              {!hideMeasureName && (
                <>
                  {entry.name} <b>|</b>{" "}
                </>
              )}
              {entry.value &&
                entry.name &&
                valueFormatter(
                  entry.value,
                  dataFormats?.[entry.name]?.dataType,
                )}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
