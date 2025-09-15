import ModalLayout from "../layouts/modal-layout";
import { FormProvider, useForm } from "react-hook-form";
import Input from "../ui/input";
import Button from "../ui/button";
import { usePut } from "@/src/hooks/use-put";
import { errorExtractor } from "@/src/services/error-extractor";
import { useToastStore } from "@/src/store/toast-store";
import { useQueryClient } from "@tanstack/react-query";
import {
  OrganizationDto,
  UpdateOrganizationRequest,
} from "@/src/models/users/organization-dto";

interface ModalProps {
  organization: OrganizationDto;
  isOpen: boolean;
  onClose: () => void;
}

interface RenameOrganizationForm {
  name: string;
}

const RenameOrganizationModal: React.FC<ModalProps> = ({
  organization,
  isOpen,
  onClose,
}) => {
  const queryClient = useQueryClient();
  const { showToast } = useToastStore();
  const { mutateAsync: updateOrganizationAsync } = usePut<
    UpdateOrganizationRequest,
    OrganizationDto
  >();

  const methods = useForm<RenameOrganizationForm>({
    defaultValues: {
      name: organization.name,
    },
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (data: RenameOrganizationForm) => {
    await updateOrganizationAsync(
      {
        url: "users/organizations/" + organization.id,
        data: {
          name: data.name,
        },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["users/organizations/" + organization.id],
            exact: true,
          });
          queryClient.invalidateQueries({
            queryKey: ["users/organizations"],
          });
          showToast("Organization renamed successfully", "success");
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
    <ModalLayout isOpen={isOpen} onClose={onClose} title="Rename organization">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Name"
            error={errors.name?.message}
            placeholder="Enter name"
            {...methods.register("name")}
          />
          <div className="mt-6">
            <Button text="Update organization" type="submit" />
          </div>
        </form>
      </FormProvider>
    </ModalLayout>
  );
};

export default RenameOrganizationModal;
