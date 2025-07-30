"use client";

import AuthLayout from "../../components/layouts/auth-layout";
import Button from "../../components/ui/button";
import LinkButton from "../../components/ui/link-button";
import { GoogleIcon } from "../../components/icons/google-icon";
import { AppleIcon } from "../../components/icons/apple-icon";
import { FormProvider, useForm } from "react-hook-form";
import Input from "../../components/ui/input";
import CustomLink from "../../components/ui/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { usePost } from "@/src/hooks/use-post";
import { AxiosError } from "axios";
import { RegisterUserResponse } from "@/src/models/users/register-user-response";
import { ApiError } from "@/src/models/abstractions/api-error";
import {
  acceptTermsValidation,
  confirmPasswordValidation,
  emailValidation,
  firstNameValidation,
  lastNameValidation,
  passwordValidation,
} from "../data/validation-values/register-user-validations";
import { errorExtractor } from "@/src/services/error-extractor";
import { useToastStore } from "@/src/store/toast-store";

export type RegistrationForm = {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  acceptTerms: boolean;
};

export default function Register() {
  const router = useRouter();
  const { showToast } = useToastStore();

  const { mutateAsync: registerUserAsync, isPending } = usePost<
    RegistrationForm,
    RegisterUserResponse
  >({
    url: "/users/register",
  });

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      router.replace("/app/dashboard");
    }
  }, [router]);

  const methods = useForm<RegistrationForm>({
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      acceptTerms: false,
    },
  });

  const {
    watch,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (data: RegistrationForm) => {
    await registerUserAsync(data, {
      onSuccess: () => {
        showToast("Account created successfully. Please login.", "success");
        router.push("/login");
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
            Create your account
          </h1>
          <FormProvider {...methods}>
            <form
              className="space-y-4 lg:space-y-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Input
                  label="First name"
                  error={errors.firstName?.message}
                  placeholder="Enter your first name"
                  {...methods.register("firstName", {
                    ...firstNameValidation,
                  })}
                />

                <Input
                  label="Last name"
                  error={errors.lastName?.message}
                  placeholder="Enter your last name"
                  {...methods.register("lastName", {
                    ...lastNameValidation,
                  })}
                />
              </div>

              <Input
                label="Email"
                error={errors.email?.message}
                placeholder="Enter your email"
                {...methods.register("email", {
                  ...emailValidation,
                })}
              />

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
                    if (watch("password") != value) {
                      return "Your passwords do no match";
                    }
                  },
                })}
              />

              <Button
                text="Create your account"
                type="submit"
                disabled={Object.keys(errors).length > 0 && !isPending}
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

/* timorya */
