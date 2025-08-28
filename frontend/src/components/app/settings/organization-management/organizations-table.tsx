import Dropdown from "../../../ui/dropdown";
import Button from "../../../ui/button";
import { ThreeDotsIcon } from "../../../icons/three-dots-icon";
import { useDelete } from "@/src/hooks/use-delete";
import { useQueryClient } from "@tanstack/react-query";
import { useToastStore } from "@/src/store/toast-store";
import { AxiosError } from "axios";
import { errorExtractor } from "@/src/services/error-extractor";
import { CustomApiError } from "@/src/models/abstractions/api-error";
import { OrganizationDto } from "@/src/models/users/organization-dto";
import { getWorkspaceType } from "@/src/models/users/utils";
import { UserDataDto } from "@/src/models/users/user-data-dto";
import { useGet } from "@/src/hooks/use-get";
import { usePut } from "@/src/hooks/use-put";

interface Props {
  organizations: OrganizationDto[];
}

export default function OrganizationsTable({ organizations }: Props) {
  const { showToast } = useToastStore();

  const { data: userData, isFetching } = useGet<UserDataDto>({
    url: "users/me",
  });

  const { mutateAsync: deleteOrganizationAsync } = useDelete<boolean>({
    options: {},
  });

  const { mutateAsync: setActiveOrganizationAsync, isPending } = usePut();

  const queryClient = useQueryClient();

  const handleDelete = async (organization: OrganizationDto) => {
    const url = "users/organizations/" + organization.id;
    await deleteOrganizationAsync(url, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["users/organizations/" + organization.id],
          exact: true,
        });
        queryClient.invalidateQueries({
          queryKey: ["users/organizations"],
        });

        queryClient.invalidateQueries({
          queryKey: ["time-logs/active"],
        });
        queryClient.invalidateQueries({
          predicate: (query) =>
            typeof query.queryKey?.[0] === "string" &&
            query.queryKey[0].startsWith("/time-logs"),
        });
        showToast("Organization successfully deleted", "success");
      },
      onError: (error: AxiosError<CustomApiError>) => {
        const errorMessage = errorExtractor(error);
        showToast(errorMessage, "error");
      },
    });
  };

  const handleSwitchOrganization = (organization: OrganizationDto) => {
    const url = "users/organizations/set-active/" + organization.id;

    setActiveOrganizationAsync(
      {
        url,
        data: {},
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["users/me"],
          });
          queryClient.invalidateQueries({
            queryKey: ["time-logs/active"],
          });
          queryClient.invalidateQueries({
            predicate: (query) =>
              typeof query.queryKey?.[0] === "string" &&
              query.queryKey[0].startsWith("/time-logs"),
          });

          showToast("Successfully switched to " + organization.name, "success");
        },
      },
    );
  };

  return (
    <div className="overflow-auto rounded-lg border border-gray-200">
      <table className="w-full text-left text-sm text-gray-500">
        <thead className="bg-gray-50 text-xs text-gray-700 uppercase">
          <tr>
            <th scope="col" className="px-4 py-3">
              Name
            </th>
            <th scope="col" className="px-4 py-3">
              Role
            </th>
            <th scope="col" className="px-4 py-3">
              Type
            </th>
            <th scope="col" className="px-4 py-3"></th>
            <th scope="col" className="px-4 py-3">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {organizations?.map((organization) => (
            <tr
              className="border-b border-gray-200 last:border-b-0"
              key={organization.id}
            >
              <th
                scope="row"
                className="px-4 py-3 font-medium whitespace-nowrap text-gray-900"
              >
                {organization.name}
              </th>
              <td className="px-4 py-3">{organization.role}</td>
              <td className="px-4 py-3">{getWorkspaceType(organization)}</td>
              <td className="px-4 py-3">
                {userData?.currentOrganizationId !== organization.id && (
                  <Button
                    onClick={() => handleSwitchOrganization(organization)}
                    disabled={isFetching || isPending}
                    text="Switch"
                    size="sm"
                  />
                )}
              </td>
              <td className="flex items-center justify-end px-4 py-3">
                <Dropdown
                  trigger={
                    <div className="relative">
                      <Button
                        icon={<ThreeDotsIcon />}
                        size="xs"
                        color="white"
                      />
                    </div>
                  }
                  items={[
                    {
                      label: "Delete",
                      onClick: () => handleDelete(organization),
                    },
                  ]}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
