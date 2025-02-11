import { RegisterOptions } from "react-hook-form";
import { ClientsForm } from "../../app/clients/add/page";

export const firstNameValidation:
  | RegisterOptions<ClientsForm, "firstName">
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
  | RegisterOptions<ClientsForm, "lastName">
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
  | RegisterOptions<ClientsForm, "email">
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
