"use client";

import DashboardContent from "@/src/components/app/dashboard/dashboard-content";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

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
