import { Modal, ModalBody, ModalFooter, ModalHeader } from "flowbite-react";
import React from "react";

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const ModalLayout: React.FC<ModalProps> = ({ children, isOpen, onClose }) => {
  return (
    <Modal show={isOpen} onClose={onClose} popup>
      <ModalHeader>header</ModalHeader>
      <ModalBody>{children}</ModalBody>
      <ModalFooter>footer</ModalFooter>
    </Modal>
  );
};

export default ModalLayout;
