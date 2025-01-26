import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import api from "../services/api";

interface UseDeleteOptions<T> {
  url: string;
  options?: UseMutationOptions<T, unknown, T, unknown>;
}

export function useDelete<T>({ url, options }: UseDeleteOptions<T>) {
  return useMutation<T, unknown, T>({
    mutationFn: async () => {
      const { data } = await api.delete<T>(url);
      return data;
    },
    ...options,
  });
}
