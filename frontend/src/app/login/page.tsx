"use client";

import AuthLayout from "../../components/layouts/auth-layout";
import Button from "../../components/ui/button";
import LinkButton from "../../components/ui/link-button";
import { GoogleIcon } from "../../components/icons/google-icon";
import { AppleIcon } from "../../components/icons/apple-icon";
import { FormProvider, useForm } from "react-hook-form";
import Input from "../../components/ui/input";
import CustomLink from "../../components/ui/link";
import { usePost } from "@/src/hooks/use-post";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AxiosError } from "axios";
import { ApiError } from "@/src/models/abstractions/api-error";

type FormValues = {
  email: string;
  password: string;
};

export default function Login() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      router.replace("/dashboard");
    }
  }, [router]);

  const { mutateAsync: loginUserAsync } = usePost<
    FormValues,
    { accessToken: string }
  >({
    url: "/users/login",
  });

  const methods = useForm<FormValues>({
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (data: FormValues) => {
    const response = await loginUserAsync(data, {
      onError: (error: AxiosError<ApiError>) => {
        if (error.response?.data?.name) {
          toast.error(error.response.data.name);
        }
      },
    });

    if (response.accessToken) {
      localStorage.setItem("accessToken", response.accessToken);
      router.push("/dashboard");
    }
  };

  return (
    <AuthLayout>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="col-span-6 mx-auto w-full rounded-lg bg-white shadow sm:max-w-lg md:mt-0 xl:p-0">
        <div className="space-y-4 p-6 sm:p-8 lg:space-y-6">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 sm:text-2xl">
            Welcome back
          </h1>
          <div className="items-center space-y-3 sm:flex sm:space-x-4 sm:space-y-0">
            <LinkButton
              href="#"
              color="white"
              text="Log in with Google"
              icon={<GoogleIcon />}
            />
            <LinkButton
              href="#"
              color="white"
              text="Log in with Apple"
              icon={<AppleIcon />}
            />
          </div>
          <div className="flex items-center">
            <div className="h-0.5 w-full bg-gray-200"></div>
            <div className="px-5 text-center text-gray-500">or</div>
            <div className="h-0.5 w-full bg-gray-200"></div>
          </div>
          <FormProvider {...methods}>
            <form
              className="space-y-4 lg:space-y-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Input
                name="email"
                label="Email"
                type="email"
                placeholder="Enter your email"
                error={errors.email?.message}
              />

              <Input
                name="password"
                label="Password"
                type="password"
                placeholder="••••••••"
                error={errors.password?.message}
              />
              <div className="flex justify-end">
                <CustomLink href="#" text="Forgot password?" />
              </div>
              <Button text="Sign in to your account" type="submit" />
              <p className="text-sm font-light text-gray-500">
                Don&apos;t have an account yet?{" "}
                <CustomLink href="/register" text="Sign up here" />
              </p>
            </form>
          </FormProvider>
        </div>
      </div>
    </AuthLayout>
  );
}
