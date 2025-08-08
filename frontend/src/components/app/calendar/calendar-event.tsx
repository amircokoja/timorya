import moment from "moment";
import classNames from "classnames";

import "./calendar.scss";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { TimeLogDto } from "@/src/models/time-logs/time-log-dto";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";

interface Props {
  event: TimeLogDto;
}

export default function CalendarEvent({ event }: Props) {
  const durationMinutes = (event.end.getTime() - event.start.getTime()) / 60000;
  let eventSize = "normal";
  if (durationMinutes < 15) {
    eventSize = "small";
  } else if (durationMinutes < 30) {
    eventSize = "medium";
  }
  return (
    <div
      className={classNames(
        "custom-calendar-event",
        `custom-event-${event.projectColor ?? "red"}`,
        {
          "small-event": eventSize === "small",
          "medium-event": eventSize === "medium",
        },
      )}
    >
      <div className="custom-calendar-content">
        <div className="event-title">
          <strong>{event.description}</strong>
        </div>
        <span className="event-time">
          {moment(event.start).format("HH:mm")} -{" "}
          {moment(event.end).format("HH:mm")}
        </span>
      </div>
    </div>
  );
}
