import { ClockIcon } from "@/src/components/icons/clock-icon";
import { formatSeconds } from "../utils";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useClickAway } from "react-use";
import { isFutureTime, isSameTimeAsStart, isValidTimeFormat } from "./utils";
import StartTimeEditor from "./start-time-editor";
import { useToastStore } from "@/src/store/toast-store";

interface Props {
  seconds: number;
  startDate: Date;
  setStartDate: (date: Date) => void;
  setSeconds: Dispatch<SetStateAction<number>>;
  isRunning: boolean;
}

export default function TimeCounter({
  seconds,
  startDate,
  setStartDate,
  setSeconds,
  isRunning,
}: Props) {
  const { showToast } = useToastStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const clockRef = useRef(null);
  const [updatedTime, setUpdatedTime] = useState<string>("");

  useEffect(() => {
    const formattedTime = new Date(startDate).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    setUpdatedTime(formattedTime);
  }, [startDate]);

  useClickAway(clockRef, () => {
    if (isMenuOpen) {
      handleTimeUpdate();
      setIsMenuOpen(false);
    }
  });

  const handleTimeClick = () => {
    if (!isRunning) {
      return;
    }

    if (isMenuOpen) {
      handleTimeUpdate();
    }

    setIsMenuOpen((prev) => !prev);
  };

  const handleTimeUpdate = () => {
    if (!isValidTimeFormat(updatedTime)) {
      showToast("Invalid time format", "error");
      return;
    }

    if (isFutureTime(updatedTime)) {
      showToast("Time cannot be in the future", "error");
      return;
    }

    if (isSameTimeAsStart(updatedTime, startDate)) {
      showToast("No change in time", "info");
      return;
    }

    const [hours, minutes] = updatedTime.split(":").map(Number);
    const newStartDate = new Date(startDate);
    newStartDate.setHours(hours, minutes, 0);

    setStartDate(newStartDate);

    const now = new Date();
    const diffInSeconds = Math.floor(
      (now.getTime() - newStartDate.getTime()) / 1000,
    );
    setSeconds(diffInSeconds);

    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      <div className="relative px-4" ref={clockRef}>
        <div
          className="flex items-center justify-center gap-2"
          ref={clockRef}
          onClick={handleTimeClick}
        >
          <ClockIcon />
          <p className="w-[60px] text-center text-sm">
            {formatSeconds(seconds)}
          </p>
        </div>

        {isMenuOpen && isRunning && (
          <StartTimeEditor
            updatedTime={updatedTime}
            setUpdatedTime={setUpdatedTime}
            handleTimeUpdate={handleTimeUpdate}
          />
        )}
      </div>
    </>
  );
}
