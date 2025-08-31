import React from "react";
import ModalLayout from "../layouts/modal-layout";
import { FormProvider, useForm } from "react-hook-form";
import Input from "../ui/input";
import Button from "../ui/button";
import Select from "../ui/select";
import { useGet } from "@/src/hooks/use-get";
import { RoleDto } from "@/src/models/users/role-dto";
import { usePost } from "@/src/hooks/use-post";
import { InviteMemberRequest } from "@/src/models/users/invite-member-request";
import { errorExtractor } from "@/src/services/error-extractor";
import { useToastStore } from "@/src/store/toast-store";
import { emailValidation } from "@/src/app/data/validation-values/invite-member-validations";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface InviteMemberForm {
  email: string;
  role: string;
}

const InviteMembersModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const { showToast } = useToastStore();
  const { mutateAsync: inviteMemberAsync, isPending } = usePost<
    InviteMemberRequest,
    void
  >({ url: "users/invite" });

  const { data: roles, isFetching } = useGet<RoleDto[]>({
    url: "users/roles",
  });

  const methods = useForm<InviteMemberForm>({
    defaultValues: {
      email: "",
      role: "",
    },
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (data: InviteMemberForm) => {
    await inviteMemberAsync(
      {
        email: data.email,
        roleId: parseInt(data.role, 10),
      },
      {
        onSuccess: () => {
          showToast("Member invited successfully", "success");
          onClose();
        },
        onError: (error) => {
          const errorMessage = errorExtractor(error);
          showToast(errorMessage, "error");
        },
      },
    );
  };

  return (
    <ModalLayout isOpen={isOpen} onClose={onClose} title="Invite new member">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 sm:gap-6">
            <Input
              label="Email"
              error={errors.email?.message}
              placeholder="Enter email"
              {...methods.register("email", {
                ...emailValidation,
              })}
            />

            <Select
              label="Select role"
              options={
                roles?.map((role) => ({
                  value: role.id.toString(),
                  label: role.name,
                })) ?? []
              }
              error={errors.role?.message}
              {...methods.register("role")}
              registerOptions={{
                required: "Role selection is required",
              }}
            />
          </div>
          <div className="mt-6">
            <Button
              disabled={isFetching || isPending}
              text="Invite"
              type="submit"
            />
          </div>
        </form>
      </FormProvider>
    </ModalLayout>
  );
};

export default InviteMembersModal;
