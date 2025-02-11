"use client";

import AppLayout from "@/src/components/layouts/app-layout/app-layout";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppLayout>
      <div className="p-5">{children}</div>
    </AppLayout>
  );
}
