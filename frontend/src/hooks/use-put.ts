import {
  MutationFunction,
  useMutation,
  UseMutationOptions,
} from "@tanstack/react-query";
import api from "../services/api";
import { AxiosError } from "axios";
import { CustomApiError } from "../models/abstractions/api-error";

interface UsePutOptions<TRequest, TResponse> {
  options?: UseMutationOptions<
    TResponse,
    AxiosError<CustomApiError>,
    { url: string; data: TRequest }
  >;
}

export function usePut<TRequest, TResponse>({
  options,
}: UsePutOptions<TRequest, TResponse> = {}) {
  const mutationFn: MutationFunction<
    TResponse,
    { url: string; data: TRequest }
  > = async ({ url, data }) => {
    const response = await api.put<TResponse>(url, data);
    return response.data;
  };

  return useMutation<
    TResponse,
    AxiosError<CustomApiError>,
    { url: string; data: TRequest }
  >({
    mutationFn,
    ...options,
  });
}
