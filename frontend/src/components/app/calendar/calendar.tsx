import {
  Calendar as ReactBigCalendar,
  SlotInfo,
  View,
  Views,
  momentLocalizer,
} from "react-big-calendar";
import moment from "moment";
import withDragAndDrop, {
  EventInteractionArgs,
} from "react-big-calendar/lib/addons/dragAndDrop";
import classNames from "classnames";

import "./calendar.scss";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { PaginatedResut } from "@/src/models/abstractions/paginated-result";
import { TimeLogWeekGroup } from "@/src/models/time-logs/time-log-week-group";
import { useGet } from "@/src/hooks/use-get";
import { TimeLogDto } from "@/src/models/time-logs/time-log-dto";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import { useEffect, useState } from "react";
import useIsMobile from "@/src/hooks/useIsMobile";

export interface CalendarEvent {
  id: number;
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
}

moment.locale("en", {
  week: {
    dow: 1,
    doy: 1,
  },
});
const localizer = momentLocalizer(moment);

const DnDCalendar = withDragAndDrop(ReactBigCalendar<TimeLogDto>);

interface Props {
  onEventDrop?: (event: EventInteractionArgs<TimeLogDto>) => void;
  onSelectSlot?: (slotInfo: SlotInfo) => void;
  onSelectEvent?: (event: TimeLogDto) => void;
}

export default function Calendar({
  onEventDrop,
  onSelectSlot,
  onSelectEvent,
}: Props) {
  const isMobile = useIsMobile();

  const [viewValue, setViewValue] = useState<View>(Views.WEEK);
  const { data } = useGet<PaginatedResut<TimeLogWeekGroup>>({
    url: "/time-logs?page=" + 1 + "&pageSize=1335",
  });

  useEffect(() => {
    setViewValue(isMobile ? Views.DAY : Views.WEEK);
  }, [isMobile]);

  const events: TimeLogDto[] =
    data?.items.flatMap((group) =>
      group.dates.flatMap((log) =>
        log.timeLogs.map((timeLog) => ({
          id: timeLog.id,
          description: timeLog.description || "No description",
          start: new Date(timeLog.start),
          end: new Date(timeLog.end),
          projectId: timeLog.projectId,
          seconds: timeLog.seconds,
          projectColor: timeLog.projectColor || "blue",
          projectName: timeLog.projectName || "No project",
        })),
      ),
    ) || [];

  const onViewChange = (event: string) => {
    if (event === "day") {
      setViewValue(Views.DAY);
    } else {
      setViewValue(Views.WEEK);
    }
  };

  return (
    <div
      className={classNames(
        "timorya-calendar",
        `timorya-calendar-${viewValue}`,
      )}
      style={{ flex: 1, minHeight: 0, height: 500 }}
    >
      <DnDCalendar
        localizer={localizer}
        events={events}
        view={viewValue}
        timeslots={4}
        step={15}
        onView={onViewChange}
        views={["day", "week"]}
        resizable={true}
        onEventDrop={(event) => {
          if (onEventDrop) {
            onEventDrop(event);
          }
        }}
        onEventResize={(event) => {
          if (onEventDrop) {
            onEventDrop(event);
          }
        }}
        onSelectSlot={(slotInfo) => {
          if (onSelectSlot) {
            onSelectSlot(slotInfo);
          }
        }}
        dayLayoutAlgorithm="no-overlap"
        onSelectEvent={onSelectEvent}
        selectable={true}
        startAccessor="start"
        endAccessor="end"
        scrollToTime={new Date(1970, 1, 1, 8, 0, 0)}
        eventPropGetter={(event) => {
          const durationMinutes =
            (event.end.getTime() - event.start.getTime()) / 60000;
          return {
            style: {
              minHeight: durationMinutes < 10 ? "20px" : undefined,
            },
          };
        }}
        formats={{
          timeGutterFormat: (date, culture, localizer) =>
            localizer ? localizer.format(date, "HH:mm", culture) : "", // 24-hour format
          eventTimeRangeFormat: ({ start, end }, culture, localizer) =>
            localizer
              ? `${localizer.format(start, "HH:mm", culture)} - ${localizer.format(end, "HH:mm", culture)}`
              : "",
          dayFormat: (date, culture, localizer) => {
            if (!localizer) return "";
            const day = localizer.format(date, "ddd", culture); // e.g. Mon
            const num = localizer.format(date, "D", culture); // e.g. 3
            return `<div class="calendar-day"><span class="calendar-day-name">${day}</span>${" "}<span class="calendar-day-num">${num}</span></div>`;
          },
        }}
        components={{
          header: ({ label }) => (
            <span dangerouslySetInnerHTML={{ __html: label }} />
          ),
          event: ({ event }) => {
            const durationMinutes =
              (event.end.getTime() - event.start.getTime()) / 60000;
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
          },
        }}
      />
    </div>
  );
}
