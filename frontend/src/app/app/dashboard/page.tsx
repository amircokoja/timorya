"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import DashboardContent from "@/src/components/app/dashboard/dashboard-content";

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      router.replace("/login");
    }
  }, [router]);

  return (
    <>
      <DashboardContent />
    </>
  );
}
