import { ResetPasswordForm } from "@/src/app/reset-password-with-token/page";
import { RegisterOptions } from "react-hook-form";

export const passwordValidation:
  | RegisterOptions<ResetPasswordForm, "password">
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

export const confirmPasswordValidation:
  | RegisterOptions<ResetPasswordForm, "confirmPassword">
  | undefined = {
  required: "Confirm password is required",
  minLength: {
    value: 3,
    message: "Confirm password must be at least 3 characters long",
  },
  maxLength: {
    value: 50,
    message: "Confirm password must be at most 50 characters long",
  },
};
