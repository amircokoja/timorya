import { useRef, useState } from "react";
import { Dropdown as FlowbiteDropdown } from "flowbite-react";
import Button from "../../ui/button";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "../../ui/datepicker/datepicker";
import { generateSuggestionOptions, SuggestionOption } from "./utils";

const suggestionOptions = generateSuggestionOptions();

export const ChartDateFilter: React.FC = () => {
  const toggleRef = useRef<HTMLButtonElement>(null);

  const handleClose = () => {
    toggleRef.current?.click();
  };

  const initialOption = suggestionOptions.find(
    (option) => option.label === "Last 7 days",
  );

  const [selectedRange, setSelectedRange] = useState(
    initialOption?.label || "Last 7 days",
  );
  const [startDate, setStartDate] = useState<Date | null>(
    initialOption?.start || new Date(),
  );
  const [endDate, setEndDate] = useState<Date | null>(
    initialOption?.end || null,
  );
  const onChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);

    setSelectedRange("Custom");
  };

  const handleSuggestionClick = (option: SuggestionOption) => {
    setSelectedRange(option.label);
    setStartDate(option.start);
    setEndDate(option.end);
  };

  return (
    <div>
      <FlowbiteDropdown
        id="date-filter"
        className="w-[700px] rounded-xl"
        label={""}
        renderTrigger={() => (
          <button
            ref={toggleRef}
            className="inline-flex cursor-pointer items-center text-center text-xs font-medium text-gray-500 hover:text-gray-900"
          >
            {selectedRange}
            <svg
              className="m-2.5 ms-1.5 w-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>
        )}
        placement="bottom-end"
      >
        <div>
          <div className="flex border-b border-gray-200">
            <div className="flex flex-4/7 flex-col items-center border-r border-gray-200 p-4">
              <div className="mb-4 flex w-[280px] justify-between">
                <div className="flex-1/2">
                  <span className="block text-xs font-bold text-gray-800">
                    From
                  </span>
                  <span className="text-xs text-gray-600">
                    {startDate?.toDateString()}
                  </span>
                </div>
                <div className="flex-1/2">
                  <span className="block text-xs font-bold text-gray-800">
                    To
                  </span>
                  <span className="text-xs text-gray-600">
                    {endDate?.toDateString()}
                  </span>
                </div>
              </div>
              <DatePicker
                startDate={startDate}
                endDate={endDate}
                onChange={onChange}
              />
            </div>
            <div className="flex-3/7 p-2">
              <h3 className="text-primary-600 px-2 text-sm font-medium">
                Suggestions
              </h3>
              <div id="dropdown">
                <ul className="w-full py-2 text-sm text-gray-700">
                  {suggestionOptions.map((option) => (
                    <li key={option.label}>
                      <div
                        className="group/list hover:bg-primary-100 hover:text-primary-700! block cursor-pointer px-2 py-2"
                        onClick={() => handleSuggestionClick(option)}
                      >
                        <span
                          className="text-xs"
                          onClick={() => setSelectedRange(option.label)}
                        >
                          {option.label}
                        </span>
                        <span className="group-hover/list:text-primary-500 text-xs text-gray-400">
                          {" "}
                          {option.dateRange}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between p-2">
            <Button text="Cancel" color="transparent" onClick={handleClose} />
            <Button text="Apply" />
          </div>
        </div>
      </FlowbiteDropdown>
    </div>
  );
};

export default ChartDateFilter;
