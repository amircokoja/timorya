"use client";

import ClientsContent from "@/src/components/app/clients/clients-content";
import Breadcrumbs from "@/src/components/ui/breadcrumbs";

export default function Clients() {
  return (
    <>
      <div>
        <Breadcrumbs
          items={[
            { label: "Home", href: "/app/dashboard" },
            { label: "Clients", href: "/app/clients" },
          ]}
        />
      </div>
      <ClientsContent />
    </>
  );
}
