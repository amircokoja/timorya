import React from "react";
import ModalLayout from "../layouts/modal-layout";
import Button from "../ui/button";
import { TimeLogDto } from "@/src/models/time-logs/time-log-dto";
import { useToastStore } from "@/src/store/toast-store";
import { useDelete } from "@/src/hooks/use-delete";
import { useQueryClient } from "@tanstack/react-query";

interface ModalProps {
  logItem: TimeLogDto;
  isOpen: boolean;
  onClose: () => void;
}

const DeleteLogItemModal: React.FC<ModalProps> = ({
  logItem,
  isOpen,
  onClose,
}) => {
  const { showToast } = useToastStore();
  const queryClient = useQueryClient();
  const { mutateAsync: deleteTimeLogAsync } = useDelete<boolean>({
    options: {},
  });

  const handleDelete = () => {
    const url = `time-logs/${logItem.id}`;

    deleteTimeLogAsync(url, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          predicate: (query) =>
            typeof query.queryKey?.[0] === "string" &&
            query.queryKey[0].startsWith("/time-logs"),
        });
        showToast("Time log deleted successfully", "success");
        onClose();
      },
      onError: (error) => {
        showToast(`Error deleting time log: ${error.message}`, "error");
      },
    });
  };

  return (
    <ModalLayout isOpen={isOpen} onClose={onClose} title="Delete time log">
      <div className="p-10 text-center">
        <p className="mb-1 text-sm text-gray-600">
          You are about to delete this time log.
        </p>
        <p className="text-sm text-gray-600">Do you want to proceed?</p>
      </div>
      <div className="flex justify-end">
        <Button
          text="Cancel"
          onClick={onClose}
          additionalClasses="mr-2"
          color="white"
        />
        <Button onClick={handleDelete} text="Delete" color="red" />
      </div>
    </ModalLayout>
  );
};

export default DeleteLogItemModal;
