"use client";
export const dynamic = "force-dynamic";

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

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import {
  confirmPasswordValidation,
  passwordValidation,
} from "@/src/components/app/data/validation-values/reset-password-validation";

export type ResetPasswordForm = {
  password: string;
  confirmPassword: string;
};

type ResetPasswordRequest = {
  token: string;
  newPassword: string;
};

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.replace("/app/dashboard");
    }
  }, [token, router]);

  const { showToast } = useToastStore();

  const { mutateAsync: resetPasswordAsync, isPending } = usePost<
    ResetPasswordRequest,
    void
  >({
    url: "/users/reset-password-with-token",
  });

  const methods = useForm<ResetPasswordForm>({
    mode: "onBlur",
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const {
    handleSubmit,
    watch,
    formState: { errors },
  } = methods;

  const onSubmit = async (data: ResetPasswordForm) => {
    await resetPasswordAsync(
      {
        token: token || "",
        newPassword: data.password,
      },
      {
        onSuccess: () => {
          showToast("Password reset successfully.", "success");
          router.push("/login");
        },
        onError: (error: AxiosError<ApiError>) => {
          const errorMessage = errorExtractor(error);
          showToast(errorMessage, "error");
        },
      },
    );
  };

  return (
    <div className="col-span-6 mx-auto w-full rounded-lg bg-white shadow sm:max-w-lg md:mt-0 xl:p-0">
      <div className="space-y-4 p-6 sm:p-8 lg:space-y-6">
        <h1 className="text-xl leading-tight font-bold tracking-tight text-gray-900 sm:text-2xl">
          Reset Password
        </h1>
        <FormProvider {...methods}>
          <form
            className="space-y-4 lg:space-y-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              label="Password"
              type="password"
              error={errors.password?.message}
              placeholder="••••••••"
              {...methods.register("password", {
                ...passwordValidation,
              })}
            />

            <Input
              label="Confirm password"
              type="password"
              error={errors.confirmPassword?.message}
              placeholder="••••••••"
              {...methods.register("confirmPassword", {
                ...confirmPasswordValidation,
                validate: (value) => {
                  if (watch("password") !== value) {
                    return "Your passwords do not match";
                  }
                },
              })}
            />

            <Button
              text={isPending ? "Processing..." : "Reset Password"}
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
  );
}

export default function ResetPasswordWithTokenPage() {
  return (
    <AuthLayout>
      <Suspense fallback={null}>
        <ResetPasswordForm />
      </Suspense>
    </AuthLayout>
  );
}
