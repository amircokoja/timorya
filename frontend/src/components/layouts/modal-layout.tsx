import React from "react";
import Button from "../ui/button";

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  footer?: React.ReactNode;
  closeOnOutsideClick?: boolean;
}

const ModalLayout: React.FC<ModalProps> = ({
  children,
  title,
  isOpen,
  onClose,
  closeOnOutsideClick = true,
}) => {
  React.useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);
  if (!isOpen) return null;
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnOutsideClick && e.target === e.currentTarget) {
      onClose();
    }
  };
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={handleOverlayClick}
    >
      <div
        className="relative mx-4 flex w-full max-w-md flex-col rounded-lg bg-white shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4">
          <div>
            <h3 className="text-sm font-semibold">{title}</h3>
          </div>
          <Button
            onClick={onClose}
            additionalClasses="cursor-pointer text-gray-400 hover:text-gray-600 focus:outline-none"
            icon={
              <svg
                className="h-[18px] w-[18px] text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18 17.94 6M18 18 6.06 6"
                />
              </svg>
            }
            size="xs"
            color="white"
          />
        </div>
        <div className="flex-1 px-6 py-4">{children}</div>
      </div>
    </div>
  );
};

export default ModalLayout;
