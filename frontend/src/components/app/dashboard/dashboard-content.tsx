import ChartCard from "../../charts/chart-card";
import { MetricCardTotalTimeLogged } from "./data/metric-card-total-time-logged";
import { MetricCardBillableHours } from "./data/metric-card-billable-hours";
import { MetricCardTopProject } from "./data/metric-card-top-project";
import { MetricCardTotalEarnings } from "./data/metric-card-total-earnings";
import { BarChartTotalHours } from "./data/bar-chart-total-hours";
import { BarChartTopProjects } from "./data/bar-chart-top-projects";

export default function DashboardContent() {
  return (
    <>
      <div className="mb-6">
        <h3 className="mb-2 text-xl font-normal text-gray-800">Dashboard</h3>
        <p className="text-sm text-gray-500">
          This is the dashboard where you can view various charts and metrics.
        </p>
      </div>
      <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <ChartCard chartData={MetricCardTotalTimeLogged} />
        <ChartCard chartData={MetricCardBillableHours} />
        <ChartCard chartData={MetricCardTotalEarnings} />
        <ChartCard chartData={MetricCardTopProject} />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <ChartCard chartData={BarChartTotalHours} />
        <ChartCard chartData={BarChartTopProjects} />
      </div>
    </>
  );
}
