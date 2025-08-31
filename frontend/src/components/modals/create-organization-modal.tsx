import React, { useEffect } from "react";
import ModalLayout from "../layouts/modal-layout";
import { FormProvider, useForm } from "react-hook-form";
import Input from "../ui/input";
import Button from "../ui/button";
import Select from "../ui/select";
import { usePost } from "@/src/hooks/use-post";
import { errorExtractor } from "@/src/services/error-extractor";
import { useToastStore } from "@/src/store/toast-store";
import { useQueryClient } from "@tanstack/react-query";
import {
  OrganizationDto,
  WorkspaceType,
} from "@/src/models/users/organization-dto";
import { nameValidation } from "../app/data/validation-values/create-organization-validations";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export type CreateWorkspaceForm = {
  type: WorkspaceType;
  name: string;
};

type OrganizationCreateDto = {
  name: string;
  isPersonalWorkspace: boolean;
};

const CreateOrganizationModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const queryClient = useQueryClient();
  const { showToast } = useToastStore();

  const { mutateAsync: createWorkspaceAsync, isPending } = usePost<
    OrganizationCreateDto,
    OrganizationDto
  >({
    url: "users/organizations",
  });

  const methods = useForm<CreateWorkspaceForm>({
    mode: "onBlur",
    defaultValues: {
      type: "organization",
      name: "",
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  useEffect(() => {
    if (isOpen) {
      methods.reset({ type: "organization", name: "" });
    }
  }, [isOpen, methods]);

  const onSubmit = async (data: CreateWorkspaceForm) => {
    const payload: OrganizationCreateDto = {
      name: data.name?.trim(),
      isPersonalWorkspace: data.type === "personal",
    };

    await createWorkspaceAsync(payload, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["users/me"],
        });
        queryClient.invalidateQueries({
          queryKey: ["users/organizations"],
        });

        showToast("Organization created successfully", "success");
        reset();
        onClose();
      },
      onError: (error) => {
        const errorMessage = errorExtractor(error);
        showToast(errorMessage, "error");
      },
    });
  };

  return (
    <ModalLayout isOpen={isOpen} onClose={onClose} title="Create organization">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4 rounded-md border border-blue-100 bg-blue-50 p-3 text-center text-sm text-blue-900">
            Create a personal workspace for yourself or an organization for your
            team. You&apos;ll need this to add clients and projects in the app.
          </div>
          <div className="space-y-2">
            <Select
              label="Workspace type"
              options={[
                { value: "organization", label: "Organization" },
                { value: "personal", label: "Personal workspace" },
              ]}
              error={errors.type?.message as string}
              {...methods.register("type", {
                required: "Please select a workspace type",
              })}
              additionalClasses="w-full"
            />

            <div className="sm:col-span-2">
              <Input
                label="Name"
                placeholder="Enter organization name"
                error={errors.name?.message}
                {...methods.register("name", {
                  ...nameValidation,
                })}
              />
            </div>
          </div>
          <div className="mt-6">
            <Button
              disabled={isPending}
              text={isPending ? "Creating..." : "Create organization"}
              type="submit"
              additionalClasses="w-full"
            />
          </div>
        </form>
      </FormProvider>
    </ModalLayout>
  );
};

export default CreateOrganizationModal;
