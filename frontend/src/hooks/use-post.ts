import {
  MutationFunction,
  useMutation,
  UseMutationOptions,
} from "@tanstack/react-query";
import api from "../services/api";
import { AxiosError } from "axios";
import { ApiError } from "../models/abstractions/api-error";

interface UsePostOptions<TRequest, TResponse> {
  url: string;
  options?: UseMutationOptions<TResponse, AxiosError<ApiError>, TRequest>;
}

export function usePost<TRequest, TResponse>({
  url,
  options,
}: UsePostOptions<TRequest, TResponse>) {
  const mutationFn: MutationFunction<TResponse, TRequest> = async (
    data: TRequest,
  ) => {
    const response = await api.post<TResponse>(url, data);
    return response.data;
  };

  return useMutation<TResponse, AxiosError<ApiError>, TRequest>({
    mutationFn,
    ...options,
  });
}
