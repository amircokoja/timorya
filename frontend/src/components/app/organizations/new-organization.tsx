import { useState } from "react";
import { PlusIcon } from "../../icons/plus-icon";
import CreateOrganizationModal from "../../modals/create-organization-modal";
import Button from "../../ui/button";

interface Props {
  context: "clients" | "members" | "logs" | "projects";
}

export default function NewOrganization({ context }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <p className="mb-2 text-base font-light text-gray-500">
        You need to create private workspace
        <br /> or organization to add{" "}
        {context === "clients"
          ? "clients"
          : context === "members"
            ? "members"
            : context === "logs"
              ? "time logs"
              : "projects"}
        .
      </p>
      <Button
        icon={<PlusIcon />}
        onClick={() => setIsOpen(true)}
        color="white"
        text="New personal workspace"
      />

      <CreateOrganizationModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}
