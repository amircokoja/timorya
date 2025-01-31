"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Button from "@/src/components/ui/button";
import { useGet } from "@/src/hooks/use-get";

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
    <div className="max-w-md p-10">
      Dashboard page
      <Button
        style={{ marginTop: "20px" }}
        text="Logout"
        color="white"
        onClick={() => {
          localStorage.removeItem("accessToken");
          router.replace("/login");
        }}
      />
    </div>
  );
}
