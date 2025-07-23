import { EventInteractionArgs } from "react-big-calendar/lib/addons/dragAndDrop";
import Calendar from "./calendar";
import { usePut } from "@/src/hooks/use-put";
import { TimeLogCreateDto } from "@/src/models/time-logs/time-log-create-dto";
import { TimeLogDto } from "@/src/models/time-logs/time-log-dto";
import { useQueryClient } from "@tanstack/react-query";
import { SlotInfo } from "react-big-calendar";
import CreateLogItemModal from "../../modals/create-log-item-modal";
import { useState } from "react";

export default function CalendarContent() {
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const queryClient = useQueryClient();
  const { mutateAsync: updateTimeLogAsync } = usePut<
    TimeLogCreateDto,
    TimeLogDto
  >();

  const onSelectSlot = (slotInfo: SlotInfo) => {
    setStartDate(slotInfo.start);
    setEndDate(slotInfo.end);
    setOpenCreateModal(true);
  };

  const onEventDrop = async (event: EventInteractionArgs<TimeLogDto>) => {
    const url = `/time-logs/${event.event.id}`;
    const updatedTimeLog: TimeLogCreateDto = {
      start: new Date(event.start),
      end: new Date(event.end),
      description: event.event.description,
      projectId: event.event.projectId,
      seconds: event.event.seconds,
    };

    await updateTimeLogAsync(
      { url, data: updatedTimeLog },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            predicate: (query) =>
              typeof query.queryKey?.[0] === "string" &&
              query.queryKey[0].startsWith("/time-logs"),
          });
        },
      },
    );
  };

  return (
    <>
      <Calendar onEventDrop={onEventDrop} onSelectSlot={onSelectSlot} />
      <CreateLogItemModal
        start={startDate}
        end={endDate}
        isOpen={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
      />
    </>
  );
}
