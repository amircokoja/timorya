"use client";

import ClientForm from "@/src/components/app/clients/client-form";
import Breadcrumbs from "@/src/components/ui/breadcrumbs";

export type ClientsForm = {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  currency: string;
  color: string;
};

export default function AddClient() {
  return (
    <section className="bg-white">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/app/dashboard" },
          { label: "Clients", href: "/app/clients" },
          { label: "Add new client", href: "/app/clients/add" },
        ]}
      />
      <div className="mx-auto max-w-2xl px-4 py-8 lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900">
          Add a new client
        </h2>
        <ClientForm />
      </div>
    </section>
  );
}
