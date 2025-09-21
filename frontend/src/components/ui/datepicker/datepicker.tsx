import { DatePicker as ReactDatePicker } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./datepicker.scss";

interface Props {
  startDate: Date | null;
  endDate: Date | null;
  onChange: (dates: [Date | null, Date | null]) => void;
}

const DatePicker: React.FC<Props> = ({ startDate, endDate, onChange }) => {
  return (
    <>
      <ReactDatePicker
        className="timorya-datepicker"
        selected={startDate}
        calendarStartDay={1}
        onChange={onChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        inline
        formatWeekDay={(nameOfDay) => nameOfDay.slice(0, 3)}
      />
    </>
  );
};

export default DatePicker;
