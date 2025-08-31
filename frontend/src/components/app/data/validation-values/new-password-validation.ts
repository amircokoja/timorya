import { RegisterOptions } from "react-hook-form";
import { SettingsPasswordsForm } from "@/src/components/app/settings/settings-passwords";

export const newPasswordValidation:
  | RegisterOptions<SettingsPasswordsForm, "newPassword">
  | undefined = {
  required: "Password is required",
  minLength: {
    value: 3,
    message: "Password must be at least 3 characters long",
  },
  maxLength: {
    value: 50,
    message: "Password must be at most 50 characters long",
  },
};
