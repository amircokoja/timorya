import { useGet } from "@/src/hooks/use-get";
import { OrganizationDto } from "@/src/models/users/organization-dto";
import { UserDataDto } from "@/src/models/users/user-data-dto";
import { ChevronLeftIcon } from "flowbite-react";
import React from "react";
import classNames from "classnames";
import Dropdown from "@/src/components/ui/dropdown";
import { usePut } from "@/src/hooks/use-put";
import { useQueryClient } from "@tanstack/react-query";
import { useToastStore } from "@/src/store/toast-store";

const OrganizationListDropdown: React.FC = () => {
  const { showToast } = useToastStore();
  const queryClient = useQueryClient();
  const { data: userData } = useGet<UserDataDto>({
    url: "users/me",
  });

  const { data: organizations } = useGet<OrganizationDto[]>({
    url: "users/organizations",
  });

  const { mutateAsync: setActiveOrganizationAsync } = usePut();

  const filterOrganizations = organizations?.filter(
    (org) => org.id !== userData?.currentOrganization?.id,
  );

  const handleSwitchOrganization = (organization: OrganizationDto) => {
    const url = "users/organizations/set-active/" + organization.id;

    setActiveOrganizationAsync(
      {
        url,
        data: {},
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries();

          showToast("Successfully switched to " + organization.name, "success");
        },
      },
    );
  };

  const isSwitchAllowed = organizations?.length && organizations.length > 1;

  const dropdownContent = () => (
    <div
      className={classNames("border-b border-gray-200 p-4", {
        "cursor-pointer hover:bg-gray-50": isSwitchAllowed,
      })}
    >
      <div className="flex items-center gap-4">
        {isSwitchAllowed && (
          <div>
            <ChevronLeftIcon className="h-4 w-4 text-gray-600" />
          </div>
        )}
        <div>
          <p className="text-sm font-medium text-gray-900">
            {userData?.currentOrganization?.name}
          </p>
          <p className="text-xs text-gray-600">
            {isSwitchAllowed ? "Switch organization" : "Organization"}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {isSwitchAllowed ? (
        <Dropdown
          items={
            filterOrganizations?.map((organization) => ({
              label: organization.name,
              onClick: () => handleSwitchOrganization(organization),
            })) || []
          }
          trigger={dropdownContent()}
          placement="left-start"
        />
      ) : (
        dropdownContent()
      )}
    </>
  );
};

export default OrganizationListDropdown;
