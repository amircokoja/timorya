import ChartBuilder from "./chart-builder";
import { ChartData } from "./chart-model";
import ChartDateFilter from "./chart-date-filter/chart-date-filter";

interface Props {
  chartData: ChartData;
}

export const ChartCard: React.FC<Props> = ({ chartData }) => {
  return (
    <div className="shadow-sm-light flex flex-col justify-between rounded-lg border border-gray-200 bg-white p-4">
      <div className="relative mb-2 flex items-center justify-between">
        <div>
          <h5 className="text-sm font-normal text-gray-800">
            {chartData.meta.title}
          </h5>
        </div>

        <ChartDateFilter />
      </div>

      <div>
        <ChartBuilder chartData={chartData} />
      </div>
    </div>
  );
};

export default ChartCard;
