import React from "react";
import ModalLayout from "../layouts/modal-layout";
import Button from "../ui/button";
import { useToastStore } from "@/src/store/toast-store";
import { useDelete } from "@/src/hooks/use-delete";
import { AxiosError } from "axios";
import { errorExtractor } from "@/src/services/error-extractor";
import { ApiError } from "@/src/models/abstractions/api-error";
import { useRouter } from "next/navigation";
import { OrganizationDto } from "@/src/models/users/organization-dto";
import { useGet } from "@/src/hooks/use-get";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DeactivateAccountModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const { showToast } = useToastStore();
  const router = useRouter();

  const { data: organizations, isFetching } = useGet<OrganizationDto[]>({
    url: "users/organizations",
  });

  const organizationsWhereOwner = organizations?.filter(
    (org) => org.role === "Owner",
  );

  const { mutateAsync: deactivateAccountAsync, isPending } = useDelete({});

  const handleDelete = async () => {
    await deactivateAccountAsync("users/deactivate-account", {
      onSuccess: () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        router.push("/login");
      },
      onError: (error: AxiosError<ApiError>) => {
        const errorMessage = errorExtractor(error);
        showToast(errorMessage, "error");
      },
    });
  };

  return (
    <ModalLayout isOpen={isOpen} onClose={onClose} title="Deactivate account">
      <div className="p-10 text-center">
        <p className="mb-1 text-sm text-gray-600">
          You are about to deactivate this account.
        </p>
        <p className="text-sm text-gray-600">
          Do you want to proceed? This action cannot be undone.
        </p>
        <div>
          {organizationsWhereOwner && organizationsWhereOwner.length > 0 && (
            <p className="mt-4 text-sm text-red-600">
              You are the owner of{" "}
              {organizationsWhereOwner.length > 1
                ? `${organizationsWhereOwner.length} organizations`
                : "an organization"}
              . Please transfer ownership or delete{" "}
              {organizationsWhereOwner.length > 1
                ? "these organizations"
                : "this organization"}{" "}
              before deactivating your account.
            </p>
          )}
        </div>
      </div>
      <div className="flex justify-end">
        <Button
          text="Cancel"
          onClick={onClose}
          additionalClasses="mr-2"
          color="white"
        />
        <Button
          text={isPending ? "Deactivating..." : "Yes"}
          onClick={handleDelete}
          color="red"
          disabled={isPending || isFetching}
        />
      </div>
    </ModalLayout>
  );
};

export default DeactivateAccountModal;
