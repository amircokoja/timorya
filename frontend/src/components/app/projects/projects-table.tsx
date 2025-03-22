import Dropdown from "../../ui/dropdown";
import Button from "../../ui/button";
import { ThreeDotsIcon } from "../../icons/three-dots-icon";
import { useRouter } from "next/navigation";
import { useDelete } from "@/src/hooks/use-delete";
import { useQueryClient } from "@tanstack/react-query";
import { useToastStore } from "@/src/store/toast-store";
import { AxiosError } from "axios";
import { errorExtractor } from "@/src/services/error-extractor";
import { CustomApiError } from "@/src/models/abstractions/api-error";
import { ProjectDto } from "@/src/models/projects/project-dto";

interface Props {
  projects: ProjectDto[];
}

export default function ProjectsTable({ projects }: Props) {
  const { showToast } = useToastStore();

  const router = useRouter();

  const { mutateAsync: deleteClientAsync } = useDelete<boolean>({
    options: {},
  });

  const queryClient = useQueryClient();

  const handleEdit = (project: ProjectDto) => {
    router.push(`/app/projects/edit/${project.id}`);
  };

  const handleDelete = async (project: ProjectDto) => {
    const url = "projects/" + project.id;

    await deleteClientAsync(url, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["projects/" + project.id],
          exact: true,
        });
        queryClient.invalidateQueries({
          queryKey: ["projects"],
        });

        showToast("Project successfully deleted", "success");
        router.push("/app/projects");
      },
      onError: (error: AxiosError<CustomApiError>) => {
        const errorMessage = errorExtractor(error);
        showToast(errorMessage, "error");
      },
    });
  };

  return (
    <div className="overflow-auto rounded-lg border border-gray-200">
      <table className="w-full text-left text-sm text-gray-500">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700">
          <tr>
            <th scope="col" className="px-4 py-3">
              Project name
            </th>
            <th scope="col" className="px-4 py-3">
              Client name
            </th>
            <th scope="col" className="px-4 py-3">
              Color
            </th>
            <th scope="col" className="px-4 py-3">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {projects?.map((project) => (
            <tr className="border-b" key={project.id}>
              <th
                scope="row"
                className="whitespace-nowrap px-4 py-3 font-medium text-gray-900"
              >
                {project.name}
              </th>
              <td className="px-4 py-3">{project.clientName ?? "-"}</td>
              <td className="px-4 py-3">
                {<div className={`size-4 rounded-sm ${project.color}`}></div>}
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
                      label: "Edit",
                      onClick: () => handleEdit(project),
                    },
                    {
                      label: "Delete",
                      onClick: () => handleDelete(project),
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
