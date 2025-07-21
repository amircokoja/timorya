import React from "react";

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  footer?: React.ReactNode;
  disableBackdropClose?: boolean;
}

const ModalLayout: React.FC<ModalProps> = ({
  children,
  isOpen,
  onClose,
  title,
  footer,
  disableBackdropClose = false,
}) => {
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={() => {
        if (!disableBackdropClose) onClose();
      }}
    >
      <div
        className="relative mx-4 flex w-full max-w-md flex-col rounded-lg bg-white shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-gray-100 p-3 md:p-4">
          {title && <div className="text-base font-semibold">{title}</div>}
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 focus:outline-none"
            aria-label="Close modal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="flex-1 p-3 md:p-4">{children}</div>
        {footer && (
          <div className="border-t border-gray-100 px-6 pt-2 pb-6">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default ModalLayout;
