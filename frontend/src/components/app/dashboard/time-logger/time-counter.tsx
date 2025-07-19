import { ClockIcon } from "@/src/components/icons/clock-icon";
import { formatSeconds } from "../utils";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useClickAway } from "react-use";
import Input from "@/src/components/ui/input";
import { isFutureTime, isSameTimeAsStart, isValidTimeFormat } from "./utils";

interface Props {
  seconds: number;
  startDate: Date;
  setStartDate: Dispatch<SetStateAction<Date>>;
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
      console.log("Invalid time format");
      return;
    }

    if (isFutureTime(updatedTime)) {
      console.log("Time cannot be in the future");
      return;
    }

    if (isSameTimeAsStart(updatedTime, startDate)) {
      console.log("No change in time");
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
          <div className="absolute left-1/2 top-7 z-10 mt-2 w-64 -translate-x-1/2 rounded-md border border-gray-300 bg-white p-4 shadow-lg">
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Start Time
            </label>
            <Input
              placeholder="Enter start time"
              name="startTime"
              value={updatedTime}
              onChange={(e) => {
                setUpdatedTime(e.target.value);
              }}
              onBlur={(e) => {
                handleTimeUpdate();
              }}
            />
          </div>
        )}
      </div>
    </>
  );
}
