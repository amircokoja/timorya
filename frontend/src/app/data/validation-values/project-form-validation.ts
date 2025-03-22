import { ProjectForm } from "@/src/components/app/projects/project-form";
import { RegisterOptions } from "react-hook-form";

export const projectNameValidation:
  | RegisterOptions<ProjectForm, "name">
  | undefined = {
  required: "Project name is required",
  minLength: {
    value: 3,
    message: "Project name must be at least 3 characters long",
  },
  maxLength: {
    value: 50,
    message: "Project name must be at most 50 characters long",
  },
};
