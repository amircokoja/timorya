import { RegistrationForm } from "@/src/app/register/page";
import { RegisterOptions } from "react-hook-form";

export const firstNameValidation:
  | RegisterOptions<RegistrationForm, "firstName">
  | undefined = {
  required: "First name is required",
  minLength: {
    value: 3,
    message: "First name must be at least 3 characters long",
  },
  maxLength: {
    value: 50,
    message: "First name must be at most 50 characters long",
  },
};

export const lastNameValidation:
  | RegisterOptions<RegistrationForm, "lastName">
  | undefined = {
  required: "Last name is required",
  minLength: {
    value: 3,
    message: "Last name must be at least 3 characters long",
  },
  maxLength: {
    value: 50,
    message: "Last name must be at most 50 characters long",
  },
};

export const emailValidation:
  | RegisterOptions<RegistrationForm, "email">
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

export const passwordValidation:
  | RegisterOptions<RegistrationForm, "password">
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
  | RegisterOptions<RegistrationForm, "confirmPassword">
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

export const acceptTermsValidation:
  | RegisterOptions<RegistrationForm, "acceptTerms">
  | undefined = {
  required: {
    value: true,
    message: "You must accept the terms and conditions",
  },
};
