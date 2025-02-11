"use client";

import { PlusIcon } from "@/src/components/icons/plus-icon";
import Breadcrumbs from "@/src/components/ui/breadcrumbs";
import LinkButton from "@/src/components/ui/link-button";

export default function Clients() {
  return (
    <>
      <div className="flex flex-col items-center justify-between space-y-3 md:flex-row md:space-x-4 md:space-y-0">
        <div className="w-full md:w-1/2">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/app/dashboard" },
              { label: "Clients", href: "/app/clients" },
            ]}
          />
        </div>
        <div className="flex w-full shrink-0 flex-col items-stretch justify-end space-y-2 md:w-auto md:flex-row md:items-center md:space-x-3 md:space-y-0">
          <div className="flex max-w-xs shrink-0 flex-col">
            <LinkButton
              href="/app/clients/add"
              text="Add new client"
              icon={<PlusIcon />}
            />
          </div>
        </div>
      </div>
    </>
  );
}
