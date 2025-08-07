import { AxiosError } from "axios";
import {
  ApiError,
  CustomApiError,
  ProblemDetails,
} from "../models/abstractions/api-error";

export const errorExtractor = (error: AxiosError<ApiError>) => {
  const errorMessage = "An error occurred";
  const apiError = error.response?.data;
  if (isCustomApiError(apiError)) {
    return apiError?.name ?? errorMessage;
  } else if (isProblemDetailsError(apiError)) {
    if (apiError.errors && apiError.errors.length > 0) {
      return apiError.errors[0].errorMessage;
    }
    return apiError.detail ?? errorMessage;
  }
  return errorMessage;
};

const isCustomApiError = (error: unknown): error is CustomApiError => {
  return (
    typeof (error as CustomApiError)?.code === "string" &&
    typeof (error as CustomApiError)?.name === "string"
  );
};

const isProblemDetailsError = (error: unknown): error is ProblemDetails => {
  return (
    typeof (error as ProblemDetails)?.title === "string" &&
    typeof (error as ProblemDetails)?.type === "string" &&
    typeof (error as ProblemDetails)?.detail === "string" &&
    typeof (error as ProblemDetails)?.status === "number" &&
    Array.isArray((error as ProblemDetails)?.errors)
  );
};
