import { PlusIcon } from "../../icons/plus-icon";
import { SearchIcon } from "../../icons/search-icon";
import Input from "../../ui/input";
import LinkButton from "../../ui/link-button";
import ClientsTable from "./clients-table";

export default function ClientsContent() {
  return (
    <section className="p-3 sm:p-5">
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
        <div className="overflow-x-auto">
          <ClientsTable />
        </div>
      </div>
    </section>
  );
}
