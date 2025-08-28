import { RegisterOptions } from "react-hook-form";
import { CreateWorkspaceForm } from "@/src/components/modals/create-organization-modal";

export const nameValidation:
  | RegisterOptions<CreateWorkspaceForm, "name">
  | undefined = {
  required: "Name is required",
  minLength: {
    value: 3,
    message: "Name must be at least 3 characters long",
  },
  maxLength: {
    value: 50,
    message: "Name must be at most 50 characters long",
  },
};
