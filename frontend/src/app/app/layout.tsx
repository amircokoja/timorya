"use client";

import AppLayout from "@/src/components/layouts/app-layout/app-layout";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AppLayout>{children}</AppLayout>;
}
