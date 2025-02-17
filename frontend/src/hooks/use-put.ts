import {
  MutationFunction,
  useMutation,
  UseMutationOptions,
} from "@tanstack/react-query";
import api from "../services/api";
import { AxiosError } from "axios";
import { CustomApiError } from "../models/abstractions/api-error";

interface UsePutOptions<TRequest, TResponse> {
  url: string;
  options?: UseMutationOptions<TResponse, AxiosError<CustomApiError>, TRequest>;
}

export function usePut<TRequest, TResponse>({
  url,
  options,
}: UsePutOptions<TRequest, TResponse>) {
  const mutationFn: MutationFunction<TResponse, TRequest> = async (
    data: TRequest,
  ) => {
    const response = await api.put<TResponse>(url, data);
    return response.data;
  };

  return useMutation<TResponse, AxiosError<CustomApiError>, TRequest>({
    mutationFn,
    ...options,
  });
}
