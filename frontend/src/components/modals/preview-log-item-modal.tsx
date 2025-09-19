import React from "react";
import ModalLayout from "../layouts/modal-layout";
import { formatTime } from "../app/time-tracker/utils";
import { TimeLogDto } from "@/src/models/time-logs/time-log-dto";
import Button from "../ui/button";

interface ModalProps {
  logItem: TimeLogDto;
  isOpen: boolean;
  onClose: () => void;
  onEditClick: () => void;
  onDeleteClick: () => void;
}

const PreviewLogItemModal: React.FC<ModalProps> = ({
  logItem,
  isOpen,
  onClose,
  onEditClick,
  onDeleteClick,
}) => {
  return (
    <ModalLayout isOpen={isOpen} onClose={onClose} title="Log details">
      <dl>
        <dt className="mb-2 leading-none font-semibold text-gray-900">
          Description
        </dt>
        <dd className="mb-4 text-sm font-light text-gray-500 sm:mb-5">
          {logItem.description || "No description"}
        </dd>
        <dt className="mb-2 leading-none font-semibold text-gray-900">
          Project
        </dt>
        <dd className="mb-4 text-sm font-light text-gray-500 sm:mb-5">
          {logItem.projectName || "No project"}
        </dd>
        <dt className="mb-2 leading-none font-semibold text-gray-900">
          Time Spent
        </dt>
        <dd className="mb-4 text-sm font-light text-gray-500 sm:mb-5">
          {formatTime(logItem.start)} - {formatTime(logItem.end)}
        </dd>
      </dl>
      <div className="flex items-center justify-end gap-4">
        <Button
          icon={
            <svg
              aria-hidden="true"
              className="mr-1 -ml-1 h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path>
              <path
                fillRule="evenodd"
                d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                clipRule="evenodd"
              ></path>
            </svg>
          }
          color="blue"
          text="Edit"
          onClick={onEditClick}
        />
        <Button
          icon={
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          }
          text="Delete"
          color="red"
          onClick={onDeleteClick}
        />
      </div>
    </ModalLayout>
  );
};

export default PreviewLogItemModal;
