import {
  MutationFunction,
  useMutation,
  UseMutationOptions,
} from "@tanstack/react-query";
import api from "../services/api";

interface UsePostOptions<TRequest, TResponse> {
  url: string;
  options?: UseMutationOptions<TResponse, unknown, TRequest>;
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

  return useMutation<TResponse, unknown, TRequest>({
    mutationFn,
    ...options,
  });
}
