import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import api from "../services/api";

interface UsePutOptions<T> {
  url: string;
  options?: UseMutationOptions<T, unknown, T, unknown>;
}

export function usePut<T>({ url, options }: UsePutOptions<T>) {
  return useMutation<T, unknown, T>({
    mutationFn: async (data) => {
      const { data: response } = await api.put<T>(url, data);
      return response;
    },
    ...options,
  });
}
