import Button from "@/src/components/ui/button";
import ColorSelector from "@/src/components/ui/color-selector";
import Input from "@/src/components/ui/input";
import Select from "@/src/components/ui/select";
import { useGet } from "@/src/hooks/use-get";
import { usePost } from "@/src/hooks/use-post";
import { usePut } from "@/src/hooks/use-put";
import { ApiError } from "@/src/models/abstractions/api-error";
import { ClientDto } from "@/src/models/clients/client-dto";
import { ProjectDto } from "@/src/models/projects/project-dto";
import { errorExtractor } from "@/src/services/error-extractor";
import { useToastStore } from "@/src/store/toast-store";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { projectNameValidation } from "../data/validation-values/project-form-validation";

export type ProjectForm = {
  name: string;
  color: string;
  isPublic: boolean;
  isBillable: boolean;
  hourlyRate?: number;
  clientId?: number;
};

interface Props {
  project?: ProjectDto;
}
export default function ProjectForm({ project }: Props) {
  const { showToast } = useToastStore();
  const router = useRouter();

  const { data: clients, isFetching } = useGet<ClientDto[]>({
    url: "clients",
  });

  const { mutateAsync: createProjectAsync } = usePost<ProjectForm, ProjectDto>({
    url: "/projects",
  });

  const { mutateAsync: updateProjectAsync } = usePut<ProjectForm, ProjectDto>();

  const methods = useForm<ProjectForm>({
    mode: "onBlur",
    defaultValues: {
      name: project?.name || "",
      isPublic: project?.isPublic || false,
      isBillable: project?.isBillable || false,
      hourlyRate: project?.hourlyRate || undefined,
      clientId: project?.clientId || undefined,
      color: project?.color || "blue",
    },
  });
  const queryClient = useQueryClient();

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (data: ProjectForm) => {
    let normalizedHourlyRate: number | undefined = undefined;
    if (typeof data.hourlyRate === "number" && !isNaN(data.hourlyRate)) {
      normalizedHourlyRate = data.hourlyRate;
    }

    const normalizedData: ProjectForm = {
      ...data,
      hourlyRate: normalizedHourlyRate,
      clientId: data?.clientId || undefined,
    };

    if (project) {
      const url = "/projects/" + project?.id;
      await updateProjectAsync(
        {
          url,
          data: normalizedData,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ["projects/" + project.id],
              exact: true,
            });

            handleSuccess();
          },
          onError: (error: AxiosError<ApiError>) => {
            handleError(error);
          },
        },
      );
    } else {
      await createProjectAsync(normalizedData, {
        onSuccess: () => {
          handleSuccess();
        },
        onError: (error: AxiosError<ApiError>) => {
          handleError(error);
        },
      });
    }
  };

  const handleSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: ["projects"],
    });
    const message = project
      ? "Project successfully updated."
      : "Project successfully created.";
    showToast(message, "success");
    router.push("/app/projects");
  };

  const handleError = (error: AxiosError<ApiError>) => {
    const errorMessage = errorExtractor(error);
    showToast(errorMessage, "error");
  };

  const handleColorChange = (color: string) => {
    methods.setValue("color", color);
  };

  const clientOptions = useMemo(() => {
    return [
      {
        value: "",
        label: "No client",
      },
      ...(clients ?? []).map((client) => ({
        value: client.id.toString(),
        label: `${client.firstName} ${client.lastName}`,
      })),
    ];
  }, [clients]);

  useEffect(() => {
    if (clients && project) {
      methods.reset({
        name: project.name || "",
        isPublic: project.isPublic || false,
        isBillable: project.isBillable || false,
        hourlyRate: project.hourlyRate || undefined,
        clientId: project.clientId,
        color: project.color || "blue",
      });
    }
  }, [clients, project, methods]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <div className="col-span-2">
            <Input
              label="Project name"
              error={errors.name?.message}
              placeholder="Enter project name"
              {...methods.register("name", {
                ...projectNameValidation,
              })}
            />
          </div>
          <Select
            disabled={isFetching}
            label="Select client"
            removeFirstOption={true}
            options={clientOptions}
            error={errors.clientId?.message}
            {...methods.register("clientId")}
          />

          <Input
            label="Hourly rate"
            type="number"
            error={errors.hourlyRate?.message}
            placeholder="Enter hourly rate"
            {...methods.register("hourlyRate")}
          />

          <div>
            <div className="mb-2">
              <h3 className="mb-2 block text-sm font-medium text-gray-900">
                Billable
              </h3>
              <p className="text-xs text-gray-500">
                All new entries on this project will be initially set as
                billable.
              </p>
            </div>
            <label className="inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                className="peer sr-only"
                {...methods.register("isBillable")}
              />
              <div className="peer relative h-6 w-11 rounded-full bg-gray-200 peer-checked:bg-blue-600 peer-focus:ring-4 peer-focus:ring-blue-300 after:absolute after:start-[2px] after:top-0.5 after:size-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white rtl:peer-checked:after:-translate-x-full"></div>
              <span className="ms-3 text-sm font-medium text-gray-900">
                Yes
              </span>
            </label>
          </div>

          <div>
            <div className="mb-2">
              <h3 className="mb-2 block text-sm font-medium text-gray-900">
                Public
              </h3>
              <p className="text-xs text-gray-500">
                Everyone can track time on public projects.
              </p>
            </div>
            <label className="inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                value=""
                className="peer sr-only"
                {...methods.register("isPublic")}
              />
              <div className="peer relative h-6 w-11 rounded-full bg-gray-200 peer-checked:bg-blue-600 peer-focus:ring-4 peer-focus:ring-blue-300 after:absolute after:start-[2px] after:top-0.5 after:size-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white rtl:peer-checked:after:-translate-x-full"></div>
              <span className="ms-3 text-sm font-medium text-gray-900">
                Yes
              </span>
            </label>
          </div>

          <div className="sm:col-span-2">
            <ColorSelector
              handleColorChange={handleColorChange}
              value={methods.watch("color")}
            />
          </div>
        </div>
        <div className="mt-6">
          <Button
            disabled={isFetching}
            text={project ? "Update project" : "Create project"}
            type="submit"
          />
        </div>
      </form>
    </FormProvider>
  );
}
