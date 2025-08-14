"use client";

import SettingsContent from "@/src/components/app/settings/settings-content";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Settings() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      router.replace("/login");
    }
  }, [router]);

  return (
    <>
      <SettingsContent />
    </>
  );
}
