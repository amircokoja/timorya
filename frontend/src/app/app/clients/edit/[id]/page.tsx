"use client";

import ClientForm from "@/src/components/app/clients/client-form";
import { LoadingIcon } from "@/src/components/icons/loading-icon";
import Breadcrumbs from "@/src/components/ui/breadcrumbs";
import { useGet } from "@/src/hooks/use-get";
import { ClientDto } from "@/src/models/clients/client-dto";
import { useToastStore } from "@/src/store/toast-store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface Params {
  params: { id: string };
}

export default function EditClient({ params }: Params) {
  const { id } = params;
  const { showToast } = useToastStore();
  const router = useRouter();
  const { data, isLoading, isFetching, error } = useGet<ClientDto>({
    url: "clients/" + id,
    options: {
      retry: 1,
      queryKey: ["clients/" + id],
    },
  });

  useEffect(() => {
    if (!isFetching && error) {
      showToast("Client not found", "error");
      router.replace("/app/clients");
    }
  }, [error, isFetching, router, showToast]);

  return (
    <section className="bg-white">
      <Breadcrumbs
        items={[
          { label: "Clients", href: "/app/clients" },
          { label: "Edit client", href: "/app/clients/edit/" },
        ]}
      />
      <div className="mx-auto max-w-2xl px-4 py-8 lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900">Edit client</h2>
        {isLoading ? (
          <div className="flex h-32 items-center justify-center">
            <LoadingIcon />
          </div>
        ) : (
          <ClientForm client={data} />
        )}
      </div>
    </section>
  );
}
