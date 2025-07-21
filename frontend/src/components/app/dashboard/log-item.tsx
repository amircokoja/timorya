import { ClockIcon } from "../../icons/clock-icon";
import { ThreeDotsIcon } from "../../icons/three-dots-icon";
import Button from "../../ui/button";
import Dropdown from "../../ui/dropdown";
import { formatSeconds, formatTime } from "./utils";
import { TimeLogDto } from "@/src/models/time-logs/time-log-dto";
import { useEffect, useState } from "react";
import EditLogItemModal from "../../modals/edit-log-item-modal";
import DeleteLogItemModal from "../../modals/delete-log-item-modal";

interface Props {
  logItem: TimeLogDto;
}

export default function LogItem({ logItem }: Props) {
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  useEffect(() => {
    setStartTime(formatTime(logItem.start));
    setEndTime(formatTime(logItem.end));
  }, [logItem]);

  const handleDelete = () => {
    setOpenDeleteModal(true);
  };

  const handleEdit = () => {
    setOpenEditModal(true);
  };

  const dropdownComponent = (
    <Dropdown
      trigger={
        <div className="relative">
          <Button
            additionalClasses="cursor-pointer"
            icon={<ThreeDotsIcon />}
            size="xs"
            color="white"
          />
        </div>
      }
      items={[
        {
          label: "Edit",
          onClick: () => handleEdit(),
        },
        {
          label: "Delete",
          onClick: () => handleDelete(),
        },
      ]}
    />
  );

  return (
    <>
      <div className="flex flex-col items-center justify-between border-b border-gray-200 bg-white p-2 text-sm text-gray-500 last:border-b-0 md:flex-row md:p-4">
        <div className="mdw-auto mb-4 flex w-full flex-2 justify-between md:mb-0">
          <div>
            <h4 className="mb-1 text-sm font-medium text-gray-800">
              {logItem.description && logItem.description.trim() !== ""
                ? logItem.description
                : "No description"}
            </h4>
            <p className="text-xs text-gray-500">
              {logItem.projectName ?? "No project"}
            </p>
          </div>
          <div className="block md:hidden">{dropdownComponent}</div>
        </div>
        <div className="flex w-full flex-1 gap-6 text-gray-500 md:w-auto md:px-4">
          <div className="flex-1 text-end md:text-center">
            <span>{startTime}</span> - <span>{endTime}</span>
          </div>
          <div className="flex flex-1 items-center justify-start gap-1 text-start md:w-[200px] md:px-4">
            <ClockIcon />
            {formatSeconds(logItem.seconds)}
          </div>
        </div>

        <div>
          <div className="hidden md:block">{dropdownComponent}</div>
        </div>
      </div>
      <EditLogItemModal
        logItem={logItem}
        isOpen={openEditModal}
        onClose={() => setOpenEditModal(false)}
      />

      <DeleteLogItemModal
        logItem={logItem}
        isOpen={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
      />
    </>
  );
}
