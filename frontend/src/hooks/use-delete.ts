import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import api from "../services/api";
import { AxiosError } from "axios";
import { CustomApiError } from "../models/abstractions/api-error";

interface UseDeleteOptions<T> {
  options?: UseMutationOptions<T, AxiosError<CustomApiError>, string>;
}

export function useDelete<T>({ options }: UseDeleteOptions<T>) {
  return useMutation<T, AxiosError<CustomApiError>, string>({
    mutationFn: async (url) => {
      const { data } = await api.delete<T>(url);
      return data;
    },
    ...options,
  });
}
