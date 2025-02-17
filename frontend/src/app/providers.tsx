"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useToastStore } from "@/src/store/toast-store";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools/production";

const queryClient = new QueryClient();
export default function Providers({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { message, type, clearToast } = useToastStore();

  useEffect(() => {
    if (message) {
      switch (type) {
        case "success":
          toast.success(message);
          break;
        case "error":
          toast.error(message);
          break;
        case "info":
          toast(message);
          break;
        case "warning":
          toast(message, { icon: "⚠️" });
          break;
      }
      clearToast();
    }
  }, [clearToast, message, type]);

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-center" reverseOrder={false} />
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
