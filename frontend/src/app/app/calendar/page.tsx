"use client";

import CalendarContent from "@/src/components/app/calendar/calendar-content";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CustomCalendar() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      router.replace("/login");
    }
  }, [router]);

  return <CalendarContent />;
}
