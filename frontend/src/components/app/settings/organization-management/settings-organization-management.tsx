import { useGet } from "@/src/hooks/use-get";
import { OrganizationDto } from "@/src/models/users/organization-dto";
import Input from "../../../ui/input";
import { SearchIcon } from "../../../icons/search-icon";
import { PlusIcon } from "../../../icons/plus-icon";
import { LoadingIcon } from "../../../icons/loading-icon";
import OrganizationsTable from "./organizations-table";
import { useState } from "react";
import { getWorkspaceType } from "@/src/models/users/utils";
import CreateOrganizationModal from "@/src/components/modals/create-organization-modal";
import Button from "@/src/components/ui/button";

export default function SettingsOrganizationManagement() {
  const { data: organizations, isFetching } = useGet<OrganizationDto[]>({
    url: "users/organizations",
  });

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value.toLowerCase());
  };

  const filteredOrganizations =
    organizations?.filter(
      (organization) =>
        organization.name.toLowerCase().includes(searchText) ||
        organization.role.toLowerCase().includes(searchText) ||
        getWorkspaceType(organization).toLowerCase().includes(searchText),
    ) ?? [];

  const generateOrganizationsContent = () => {
    return (
      <>
        {organizations?.length === 0 ? (
          <section className="bg-white">
            <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
              <div className="mx-auto max-w-screen-sm text-center">
                <p className="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-2xl">
                  No organizations found.
                </p>
                <p className="mb-4 text-base font-light text-gray-500">
                  You have no organizations, please add a new organization to
                  get started.
                </p>
              </div>
            </div>
          </section>
        ) : (
          <div className="overflow-x-auto">
            <OrganizationsTable organizations={filteredOrganizations} />
          </div>
        )}
      </>
    );
  };

  return (
    <div className="space-y-4 py-4 md:py-8">
      <div className="overflow-hidden bg-white">
        <div className="flex flex-col items-center justify-between space-y-3 pb-4 md:flex-row md:space-y-0 md:space-x-4">
          <div className="w-full md:w-1/3">
            <form className="flex items-center">
              <div className="relative w-full">
                <Input
                  onChange={handleSearch}
                  icon={<SearchIcon />}
                  type="text"
                  id="simple-search"
                  name="search"
                  placeholder="Search"
                />
              </div>
            </form>
          </div>
          <div className="flex w-full shrink-0 flex-col items-stretch justify-end space-y-2 md:w-auto md:flex-row md:items-center md:space-y-0 md:space-x-3">
            <Button
              text="Add new organization"
              icon={<PlusIcon />}
              onClick={() => setIsCreateModalOpen(true)}
            />
          </div>
        </div>
        {isFetching ? (
          <div className="flex h-32 items-center justify-center">
            <LoadingIcon />
          </div>
        ) : (
          generateOrganizationsContent()
        )}
      </div>

      <CreateOrganizationModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
}
