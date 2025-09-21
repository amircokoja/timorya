import ChartCard from "../../charts/chart-card";
import { MetricCardTotalTimeLogged } from "./data/metric-card-total-time-logged";
import { MetricCardBillableHours } from "./data/metric-card-billable-hours";
import { MetricCardTopProject } from "./data/metric-card-top-project";
import { MetricCardTotalEarnings } from "./data/metric-card-total-earnings";
import { BarChartTotalHours } from "./data/bar-chart-total-hours";
import { BarChartTopProjects } from "./data/bar-chart-top-projects";
import { useState } from "react";
import { generateSuggestionOptions } from "../../charts/chart-date-filter/utils";

const suggestionOptions = generateSuggestionOptions();

export default function DashboardContent() {
  const initialOption = suggestionOptions.find(
    (option) => option.label === "Last 7 days",
  );

  const [totalTimeLoggedDateFilter, setTotalTimeLoggedDateFilter] = useState(
    initialOption || suggestionOptions[0],
  );
  const [billableHoursDateFilter, setBillableHoursDateFilter] = useState(
    initialOption || suggestionOptions[0],
  );

  const [totalEarningsDateFilter, setTotalEarningsDateFilter] = useState(
    initialOption || suggestionOptions[0],
  );

  const [topProjectDateFilter, setTopProjectDateFilter] = useState(
    initialOption || suggestionOptions[0],
  );
  const [totalHoursDateFilter, setTotalHoursDateFilter] = useState(
    initialOption || suggestionOptions[0],
  );
  const [topProjectsDateFilter, setTopProjectsDateFilter] = useState(
    initialOption || suggestionOptions[0],
  );

  return (
    <>
      <div className="mb-6">
        <h3 className="mb-2 text-xl font-normal text-gray-800">Dashboard</h3>
        <p className="text-sm text-gray-500">
          This is the dashboard where you can view various charts and metrics.
        </p>
      </div>
      <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <ChartCard
          chartData={MetricCardTotalTimeLogged}
          dateFilter={totalTimeLoggedDateFilter}
          setDateFilter={setTotalTimeLoggedDateFilter}
        />

        <ChartCard
          chartData={MetricCardBillableHours}
          dateFilter={billableHoursDateFilter}
          setDateFilter={setBillableHoursDateFilter}
        />
        <ChartCard
          chartData={MetricCardTotalEarnings}
          dateFilter={totalEarningsDateFilter}
          setDateFilter={setTotalEarningsDateFilter}
        />
        <ChartCard
          chartData={MetricCardTopProject}
          dateFilter={topProjectDateFilter}
          setDateFilter={setTopProjectDateFilter}
        />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <ChartCard
          chartData={BarChartTotalHours}
          dateFilter={totalHoursDateFilter}
          setDateFilter={setTotalHoursDateFilter}
        />
        <ChartCard
          chartData={BarChartTopProjects}
          dateFilter={topProjectsDateFilter}
          setDateFilter={setTopProjectsDateFilter}
        />
      </div>
    </>
  );
}
