import { AxiosError } from "axios";
import {
  ApiError,
  CustomApiError,
  ProblemDetails,
} from "../models/abstractions/api-error";

export const errorExtractor = (error: AxiosError<ApiError>) => {
  let errorMessage = "An error occurred";
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

const isCustomApiError = (error: any): error is CustomApiError => {
  return typeof error?.code === "string" && typeof error?.name === "string";
};

const isProblemDetailsError = (error: any): error is ProblemDetails => {
  return (
    typeof error?.title === "string" &&
    typeof error?.type === "string" &&
    typeof error?.detail === "string" &&
    typeof error?.status === "number" &&
    Array.isArray(error?.errors)
  );
};
