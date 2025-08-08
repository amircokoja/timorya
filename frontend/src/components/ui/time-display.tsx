import { formatSeconds } from "../app/dashboard/utils";

interface Props {
  seconds: number;
  customClasses?: string;
}

const TimeDisplay: React.FC<Props> = ({ seconds, customClasses }: Props) => {
  return (
    <p className={`w-[65px] text-left text-sm ${customClasses}`}>
      {formatSeconds(seconds)}
    </p>
  );
};

export default TimeDisplay;
