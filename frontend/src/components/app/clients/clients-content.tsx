import { useGet } from "@/src/hooks/use-get";
import { PlusIcon } from "../../icons/plus-icon";
import { SearchIcon } from "../../icons/search-icon";
import Input from "../../ui/input";
import LinkButton from "../../ui/link-button";
import ClientsTable from "./clients-table";
import { ClientDto } from "@/src/models/clients/client-dto";
import { LoadingIcon } from "../../icons/loading-icon";

export default function ClientsContent() {
  const { data: clients, isFetching } = useGet<ClientDto[]>({
    url: "clients",
  });

  const generateClientContent = () => {
    return (
      <>
        {clients?.length === 0 ? (
          <section className="bg-white">
            <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
              <div className="mx-auto max-w-screen-sm text-center">
                <p className="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-2xl">
                  No clients found.
                </p>
                <p className="mb-4 text-base font-light text-gray-500">
                  You have no clients, please add a new client to get started.
                </p>
              </div>
            </div>
          </section>
        ) : (
          <div className="overflow-x-auto">
            <ClientsTable clients={clients!} />
          </div>
        )}
      </>
    );
  };

  return (
    <section>
      <div className="overflow-hidden bg-white">
        <div className="flex flex-col items-center justify-between space-y-3 p-2 py-4 md:flex-row md:space-x-4 md:space-y-0">
          <div className="w-full md:w-1/3">
            <form className="flex items-center">
              <div className="relative w-full">
                <Input
                  icon={<SearchIcon />}
                  type="text"
                  id="simple-search"
                  name="search"
                  placeholder="Search"
                />
              </div>
            </form>
          </div>
          <div className="flex w-full shrink-0 flex-col items-stretch justify-end space-y-2 md:w-auto md:flex-row md:items-center md:space-x-3 md:space-y-0">
            <LinkButton
              href="/app/clients/add"
              text="Add new client"
              icon={<PlusIcon />}
            />
          </div>
        </div>
        {isFetching ? (
          <div className="flex h-32 items-center justify-center">
            <LoadingIcon />
          </div>
        ) : (
          generateClientContent()
        )}
      </div>
    </section>
  );
}
