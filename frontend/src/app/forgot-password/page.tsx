"use client";

import AuthLayout from "../../components/layouts/auth-layout";
import Button from "../../components/ui/button";
import { FormProvider, useForm } from "react-hook-form";
import Input from "../../components/ui/input";
import CustomLink from "../../components/ui/link";
import { usePost } from "@/src/hooks/use-post";
import { AxiosError } from "axios";
import { ApiError } from "@/src/models/abstractions/api-error";
import { errorExtractor } from "@/src/services/error-extractor";
import { useToastStore } from "@/src/store/toast-store";

type ForgotPasswordForm = {
  email: string;
};

export default function ForgotPassword() {
  const { showToast } = useToastStore();

  const { mutateAsync: forgotPasswordAsync, isPending } = usePost<
    ForgotPasswordForm,
    void
  >({
    url: "/users/forgot-password",
  });

  const methods = useForm<ForgotPasswordForm>({
    mode: "onBlur",
    defaultValues: {
      email: "",
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  const onSubmit = async (data: ForgotPasswordForm) => {
    await forgotPasswordAsync(data, {
      onSuccess: () => {
        showToast("Password reset link sent successfully.", "success");
        reset();
      },
      onError: (error: AxiosError<ApiError>) => {
        const errorMessage = errorExtractor(error);
        showToast(errorMessage, "error");
      },
    });
  };

  return (
    <AuthLayout>
      <div className="col-span-6 mx-auto w-full rounded-lg bg-white shadow sm:max-w-lg md:mt-0 xl:p-0">
        <div className="space-y-4 p-6 sm:p-8 lg:space-y-6">
          <h1 className="text-xl leading-tight font-bold tracking-tight text-gray-900 sm:text-2xl">
            Forgot Password
          </h1>
          <div>
            <p className="text-xs text-gray-600">
              You forgot your password? No problem. Enter your email address
              below and we&apos;ll send you a link to reset your password.
            </p>
          </div>
          <FormProvider {...methods}>
            <form
              className="space-y-4 lg:space-y-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Input
                label="Email"
                error={errors.email?.message}
                placeholder="Enter your email"
                {...methods.register("email")}
              />

              <Button
                text={isPending ? "Sending..." : "Send Reset Link"}
                type="submit"
                disabled={isPending}
              />
              <p className="text-sm font-light text-gray-500">
                Already have an account?{" "}
                <CustomLink href="/login" text="Sign in here" />
              </p>
            </form>
          </FormProvider>
        </div>
      </div>
    </AuthLayout>
  );
}
