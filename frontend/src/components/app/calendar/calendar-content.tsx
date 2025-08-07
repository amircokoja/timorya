import { EventInteractionArgs } from "react-big-calendar/lib/addons/dragAndDrop";
import Calendar from "./calendar";
import { usePut } from "@/src/hooks/use-put";
import { TimeLogCreateDto } from "@/src/models/time-logs/time-log-create-dto";
import { TimeLogDto } from "@/src/models/time-logs/time-log-dto";
import { useQueryClient } from "@tanstack/react-query";
import { SlotInfo } from "react-big-calendar";
import CreateLogItemModal from "../../modals/create-log-item-modal";
import { useState } from "react";
import PreviewLogItemModal from "../../modals/preview-log-item-modal";
import EditLogItemModal from "../../modals/edit-log-item-modal";
import DeleteLogItemModal from "../../modals/delete-log-item-modal";
import { TimeLogUpdateDto } from "@/src/models/time-logs/time-log-update-dto";

export default function CalendarContent() {
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [openPreviewModal, setOpenPreviewModal] = useState(false);
  const [event, setEvent] = useState<TimeLogDto | null>(null);

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
    const updatedTimeLog: TimeLogUpdateDto = {
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

  const onEventSelect = (event: TimeLogDto) => {
    setEvent(event);
    setOpenPreviewModal(true);
  };

  const onEditClick = () => {
    setOpenPreviewModal(false);
    setOpenEditModal(true);
  };

  const onDeleteClick = () => {
    setOpenPreviewModal(false);
    setOpenDeleteModal(true);
  };

  return (
    <>
      <Calendar
        onEventDrop={onEventDrop}
        onSelectSlot={onSelectSlot}
        onSelectEvent={onEventSelect}
      />
      <CreateLogItemModal
        start={startDate}
        end={endDate}
        isOpen={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
      />
      {event && (
        <PreviewLogItemModal
          logItem={event}
          isOpen={openPreviewModal}
          onClose={() => setOpenPreviewModal(false)}
          onEditClick={onEditClick}
          onDeleteClick={onDeleteClick}
        />
      )}
      {event && (
        <EditLogItemModal
          logItem={event}
          isOpen={openEditModal}
          onClose={() => setOpenEditModal(false)}
        />
      )}
      {event && (
        <DeleteLogItemModal
          logItem={event}
          isOpen={openDeleteModal}
          onClose={() => setOpenDeleteModal(false)}
        />
      )}
    </>
  );
}
