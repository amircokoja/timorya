import { FormProvider, useForm } from "react-hook-form";
import Input from "../../ui/input";
import Button from "../../ui/button";
import { newPasswordValidation } from "@/src/app/data/validation-values/new-password-validation";
import { usePost } from "@/src/hooks/use-post";
import { useToastStore } from "@/src/store/toast-store";
import { AxiosError } from "axios";
import { errorExtractor } from "@/src/services/error-extractor";
import { ApiError } from "@/src/models/abstractions/api-error";

export interface SettingsPasswordsForm {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface Props {
  isPasswordSet: boolean;
}

export default function SettingsPasswords({ isPasswordSet }: Props) {
  const { showToast } = useToastStore();
  const { mutateAsync: changePasswordAsync, isPending } = usePost<
    SettingsPasswordsForm,
    void
  >({
    url: "/users/change-password",
  });

  const methods = useForm<SettingsPasswordsForm>({
    mode: "onBlur",
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });
  const {
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = methods;

  const onSubmit = async (data: SettingsPasswordsForm) => {
    await changePasswordAsync(data, {
      onSuccess: () => {
        showToast("Password changed successfully.", "success");
        reset();
      },
      onError: (error: AxiosError<ApiError>) => {
        const errorMessage = errorExtractor(error);
        showToast(errorMessage, "error");
      },
    });
  };

  return (
    <div className="space-y-4 py-4 md:py-8">
      <FormProvider {...methods}>
        <form
          className="space-y-4 lg:space-y-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          {isPasswordSet && (
            <Input
              label="Old password"
              type="password"
              error={errors.oldPassword?.message}
              placeholder="••••••••"
              {...methods.register("oldPassword")}
            />
          )}

          <Input
            label="New password"
            type="password"
            error={errors.newPassword?.message}
            placeholder="••••••••"
            {...methods.register("newPassword", {
              ...newPasswordValidation,
            })}
          />

          <Input
            label="Confirm password"
            type="password"
            error={errors.confirmPassword?.message}
            placeholder="••••••••"
            {...methods.register("confirmPassword", {
              validate: (value) => {
                if (watch("newPassword") !== value) {
                  return "Your passwords do not match";
                }
              },
            })}
          />

          <Button
            text={isPending ? "Processing..." : "Change password"}
            type="submit"
            disabled={isPending}
          />
        </form>
      </FormProvider>
    </div>
  );
}
