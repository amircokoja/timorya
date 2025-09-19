"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import TimeTrackerContent from "@/src/components/app/time-tracker/time-tracker-content";

export default function TimeTracker() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      router.replace("/login");
    }
  }, [router]);

  return (
    <>
      <TimeTrackerContent />
    </>
  );
}
