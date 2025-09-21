import { useEffect, useRef, useState } from "react";
import { Dropdown as FlowbiteDropdown } from "flowbite-react";
import Button from "../../ui/button";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "../../ui/datepicker/datepicker";
import { generateSuggestionOptions, SuggestionOption } from "./utils";
import classNames from "classnames";

const suggestionOptions = generateSuggestionOptions();

interface Props {
  selectedRange: SuggestionOption;
  setSelectedRange: (option: SuggestionOption) => void;
}

export const ChartDateFilter: React.FC<Props> = ({
  selectedRange,
  setSelectedRange,
}) => {
  const toggleRef = useRef<HTMLButtonElement>(null);

  const [draftRange, setDraftRange] = useState<[Date | null, Date | null]>([
    selectedRange.start,
    selectedRange.end,
  ]);

  useEffect(() => {
    setDraftRange([selectedRange.start, selectedRange.end]);
  }, [selectedRange.start, selectedRange.end]);

  const handleClose = () => {
    toggleRef.current?.click();
  };

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setDraftRange(dates);

    if (start && end) {
      setSelectedRange({
        label: "Custom",
        start,
        end,
        dateRange: "",
      });
    }
  };

  const handleSuggestionClick = (option: SuggestionOption) => {
    setSelectedRange(option);
    setDraftRange([option.start, option.end]);
  };

  return (
    <FlowbiteDropdown
      className="cursor-pointer p-0 text-xs text-gray-600 shadow-none"
      size="sm"
      outline={false}
      placement="bottom"
      label={selectedRange.label}
    >
      <div className="w-[600px]">
        <div className="flex border-b border-gray-200">
          <div className="flex flex-4/7 flex-col items-center border-r border-gray-200 p-4">
            <div className="mb-4 flex w-[280px] justify-between">
              <div className="flex-1/2">
                <span className="block text-xs font-bold text-gray-800">
                  From
                </span>
                <span className="text-xs text-gray-600">
                  {(draftRange[0] || selectedRange.start)?.toDateString()}
                </span>
              </div>
              <div className="flex-1/2">
                <span className="block text-xs font-bold text-gray-800">
                  To
                </span>
                <span className="text-xs text-gray-600">
                  {draftRange[1]
                    ? draftRange[1].toDateString()
                    : selectedRange.end?.toDateString()}
                </span>
              </div>
            </div>
            <DatePicker
              startDate={draftRange[0] || selectedRange.start}
              endDate={draftRange[1]}
              onChange={handleDateChange}
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
                      className={classNames(
                        "group/list hover:bg-primary-100 hover:text-primary-700! block cursor-pointer px-2 py-2",
                        {
                          "bg-primary-100 text-primary-700":
                            option.label === selectedRange.label,
                        },
                      )}
                      // className="group/list hover:bg-primary-100 hover:text-primary-700! block cursor-pointer px-2 py-2"
                      onClick={() => handleSuggestionClick(option)}
                    >
                      <span
                        className="text-xs"
                        onClick={() => setSelectedRange(selectedRange)}
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
  );
};

export default ChartDateFilter;
