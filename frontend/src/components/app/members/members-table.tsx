import Dropdown from "../../ui/dropdown";
import Button from "../../ui/button";
import { ThreeDotsIcon } from "../../icons/three-dots-icon";
// import { useRouter } from "next/navigation";
// import { useDelete } from "@/src/hooks/use-delete";
// import { useQueryClient } from "@tanstack/react-query";
// import { useToastStore } from "@/src/store/toast-store";
// import { AxiosError } from "axios";
// import { errorExtractor } from "@/src/services/error-extractor";
// import { CustomApiError } from "@/src/models/abstractions/api-error";
// import { ProjectDto } from "@/src/models/projects/project-dto";
// import { getColorValue } from "@/src/utils/get-color-value";
import { MemberDto } from "@/src/models/users/member-dto";

interface Props {
  members: MemberDto[];
}

export default function MembersTable({ members }: Props) {
  // const { showToast } = useToastStore();

  // const router = useRouter();

  // const { mutateAsync: deleteClientAsync } = useDelete<boolean>({
  //   options: {},
  // });

  // const queryClient = useQueryClient();

  // const handleEdit = (member: MemberDto) => {
  //   router.push(`/app/members/edit/${member.id}`);
  // };

  // const handleDelete = async (member: MemberDto) => {
  //   const url = "members/" + member.id;

  //   await deleteClientAsync(url, {
  //     onSuccess: () => {
  //       queryClient.invalidateQueries({
  //         queryKey: ["members/" + member.id],
  //         exact: true,
  //       });
  //       queryClient.invalidateQueries({
  //         queryKey: ["projects"],
  //       });

  //       showToast("Project successfully deleted", "success");
  //       router.push("/app/projects");
  //     },
  //     onError: (error: AxiosError<CustomApiError>) => {
  //       const errorMessage = errorExtractor(error);
  //       showToast(errorMessage, "error");
  //     },
  //   });
  // };

  return (
    <div className="overflow-auto rounded-lg border border-gray-200">
      <table className="w-full text-left text-sm text-gray-500">
        <thead className="bg-gray-50 text-xs text-gray-700 uppercase">
          <tr>
            <th scope="col" className="px-4 py-3">
              Name
            </th>
            <th scope="col" className="px-4 py-3"></th>
            <th scope="col" className="px-4 py-3">
              Role
            </th>
            <th scope="col" className="px-4 py-3">
              <span className="sr-only">Actions</span>
            </th>
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
              <td className="px-4 py-3 text-right">
                <span className="text-gray-400">
                  {member.type === "Invitation" && "Pending invitation"}
                </span>
              </td>{" "}
              <td className="px-4 py-3">{member.role}</td>
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
                  items={
                    [
                      // {
                      //   label: "Edit",
                      //   onClick: () => handleEdit(project),
                      // },
                      // {
                      //   label: "Delete",
                      //   onClick: () => handleDelete(project),
                      // },
                    ]
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
