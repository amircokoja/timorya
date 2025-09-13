import Dropdown from "../../ui/dropdown";
import Button from "../../ui/button";
import { ThreeDotsIcon } from "../../icons/three-dots-icon";
import { MemberDto } from "@/src/models/users/member-dto";
import classNames from "classnames";
import { useState } from "react";
import { DownArrowIcon } from "../../icons/down-arrow-icon";
import { RoleDto } from "@/src/models/users/role-dto";
import { useGet } from "@/src/hooks/use-get";
import { usePost } from "@/src/hooks/use-post";
import { ChangeMemberRoleRequest } from "@/src/models/users/change-member-role-request";
import { useToastStore } from "@/src/store/toast-store";
import { useQueryClient } from "@tanstack/react-query";
import { CustomApiError } from "@/src/models/abstractions/api-error";
import { AxiosError } from "axios";
import { errorExtractor } from "@/src/services/error-extractor";
import { DeleteMemberRequest } from "@/src/models/users/delete-member-request";
import { UserDataDto } from "@/src/models/users/user-data-dto";
import { Permissions } from "../../auth/permission";
import { Can } from "../../auth/can";

interface Props {
  members: MemberDto[];
}

const generateRoleKey = (member: MemberDto) => {
  return (
    member.type.toLocaleLowerCase() +
    "-" +
    (member.type === "User" ? member.userId : member.invitationId)
  );
};

const generateRoleText = (role: string) => {
  if (role === "Administrator") return "Admin";
  return role;
};

export default function MembersTable({ members }: Props) {
  const queryClient = useQueryClient();
  const { showToast } = useToastStore();
  const [selectedRoleDropdown, setSelectedRoleDropdown] = useState<
    string | null
  >(null);

  const { data: userData } = useGet<UserDataDto>({
    url: "users/me",
  });

  const { data: roles, isFetching } = useGet<RoleDto[]>({
    url: "users/roles",
  });

  const { mutateAsync: changeMemberRoleAsync, isPending } = usePost<
    ChangeMemberRoleRequest,
    void
  >({
    url: "/users/change-member-role",
  });

  const { mutateAsync: deleteMemberAsync } = usePost<DeleteMemberRequest, void>(
    {
      url: "/users/members/delete",
    },
  );

  const onChangeRole = (member: MemberDto, newRole: RoleDto) => {
    changeMemberRoleAsync(
      {
        newRoleId: newRole.id,
        userId: member.userId,
        invitationId: member.invitationId,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["users/members"],
          });
          setSelectedRoleDropdown(null);
        },
        onError: (error: AxiosError<CustomApiError>) => {
          const errorMessage = errorExtractor(error);
          showToast(errorMessage, "error");
        },
      },
    );
  };

  const handleDelete = async (member: MemberDto) => {
    await deleteMemberAsync(
      {
        userId: member.userId,
        invitationId: member.invitationId,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["users/members"],
          });

          showToast("User successfully deleted", "success");
        },
        onError: (error: AxiosError<CustomApiError>) => {
          const errorMessage = errorExtractor(error);
          showToast(errorMessage, "error");
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
            <Can check={Permissions.ManageMembers}>
              <th scope="col" className="px-4 py-3"></th>
            </Can>
            <Can check={Permissions.ManageMembers}>
              <th scope="col" className="px-4 py-3">
                Role
              </th>
            </Can>
            <Can check={Permissions.ManageMembers}>
              <th scope="col" className="px-4 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </Can>
          </tr>
        </thead>
        <tbody>
          {members?.map((member) => (
            <tr
              className="border-b border-gray-200 last:border-b-0"
              key={member.type === "User" ? member.userId : member.invitationId}
            >
              <th
                scope="row"
                className="px-4 py-3 font-medium whitespace-nowrap text-gray-900"
              >
                <p>{member.type === "User" ? member.name : member.email}</p>
                {member.type === "User" && (
                  <p className="text-xs text-gray-400">{member.email}</p>
                )}
              </th>
              <Can check={Permissions.ManageMembers}>
                <td className="px-4 py-3 text-right">
                  <span className="text-xs text-gray-400 sm:text-sm">
                    {member.type === "Invitation" && "Pending invitation"}
                  </span>
                </td>
              </Can>
              <Can check={Permissions.ManageMembers}>
                <td className="px-4 py-3">
                  <Button
                    disabled={isFetching || userData?.email === member.email}
                    size="sm"
                    additionalClasses="w-24 justify-between!"
                    text={generateRoleText(member.role)}
                    iconPosition="right"
                    icon={<DownArrowIcon />}
                    onClick={() => {
                      if (selectedRoleDropdown === generateRoleKey(member)) {
                        setSelectedRoleDropdown(null);
                      } else {
                        setSelectedRoleDropdown(generateRoleKey(member));
                      }
                    }}
                  />
                  {!isFetching && (
                    <div
                      className={classNames(
                        "absolute z-10 w-44 divide-y divide-gray-100 rounded-lg bg-white shadow-sm",
                        {
                          block: selectedRoleDropdown === null,
                          hidden:
                            selectedRoleDropdown !== generateRoleKey(member),
                        },
                      )}
                    >
                      <ul className="py-2 text-sm text-gray-700">
                        {roles?.map((role) => (
                          <li key={role.id}>
                            <div
                              onClick={() => {
                                if (role.name !== member.role) {
                                  onChangeRole(member, role);
                                }
                              }}
                              className={classNames("block px-4 py-2", {
                                "bg-gray-100 font-bold":
                                  role.name === member.role,
                                "cursor-pointer hover:bg-gray-100":
                                  role.name !== member.role,
                                "cursor-default! opacity-60 hover:bg-transparent!":
                                  isPending && role.name !== member.role,
                              })}
                            >
                              {generateRoleText(role.name)}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </td>
              </Can>
              <Can check={Permissions.ManageMembers}>
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
                        onClick: () => handleDelete(member),
                      },
                    ]}
                  />
                </td>
              </Can>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
