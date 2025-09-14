import Button from "@/src/components/ui/button";
import { useGet } from "@/src/hooks/use-get";
import { UserDataDto } from "@/src/models/users/user-data-dto";
import {
  Dropdown as FlowbiteDropdown,
  DropdownItem as FlowbiteDropdownItem,
} from "flowbite-react";
import { useRouter } from "next/navigation";
import React from "react";
import OrganizationListDropdown from "./organization-list-dropdown";

const HeaderDropdown: React.FC = () => {
  const { data: userData } = useGet<UserDataDto>({
    url: "users/me",
  });

  const router = useRouter();

  const items = [
    {
      label: "Settings",
      onClick: () => handleSettingsSelect(),
    },
    {
      label: "Log out",
      onClick: () => handleLogout(),
    },
  ];
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.href = "/login";
  };

  const handleSettingsSelect = () => {
    router.push("/app/settings");
  };
  return (
    <FlowbiteDropdown
      label={""}
      dismissOnClick={true}
      renderTrigger={() => (
        <Button
          size="sm"
          icon={
            <svg
              className="h-6 w-6 text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z"
                clipRule="evenodd"
              />
            </svg>
          }
        />
      )}
      placement="bottom-start"
      className="min-w-[300px]!"
    >
      <div className="border-b border-gray-200 p-4">
        <h3 className="text-sm font-medium text-gray-900">
          {userData?.firstName} {userData?.lastName}
        </h3>
        <p className="text-sm text-gray-500">{userData?.email}</p>
      </div>
      {userData?.currentOrganization && <OrganizationListDropdown />}
      <div className="py-4">
        {items.map((item) => (
          <FlowbiteDropdownItem
            key={item.label}
            onClick={() => item.onClick && item.onClick()}
          >
            {item.label}
          </FlowbiteDropdownItem>
        ))}
      </div>
    </FlowbiteDropdown>
  );
};

export default HeaderDropdown;
