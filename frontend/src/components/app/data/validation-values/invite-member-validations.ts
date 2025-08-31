import { RegisterOptions } from "react-hook-form";
import { InviteMemberForm } from "@/src/components/modals/invite-members-modal";

export const emailValidation:
  | RegisterOptions<InviteMemberForm, "email">
  | undefined = {
  required: "Email is required",
  minLength: {
    value: 3,
    message: "Email must be at least 3 characters long",
  },
  maxLength: {
    value: 50,
    message: "Email must be at most 50 characters long",
  },
};
