"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useGet } from "@/src/hooks/use-get";
import AppLayout from "@/src/components/layouts/app-layout/app-layout";

export default function Dashboard() {
  const { data } = useGet({
    url: "/users/test",
  });

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      router.replace("/login");
    }
  }, [router]);

  return (
    <>
      <AppLayout>content</AppLayout>
    </>
  );
}
