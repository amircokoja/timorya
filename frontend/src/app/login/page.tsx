"use client";

import AuthLayout from "../../components/layouts/auth-layout";
import Button from "../../components/ui/button";
import { FormProvider, useForm } from "react-hook-form";
import Input from "../../components/ui/input";
import CustomLink from "../../components/ui/link";
import { usePost } from "@/src/hooks/use-post";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { AxiosError } from "axios";
import { ApiError } from "@/src/models/abstractions/api-error";
import { errorExtractor } from "@/src/services/error-extractor";
import { LoginUserResponse } from "@/src/models/users/login-user-response";
import { useToastStore } from "@/src/store/toast-store";
import LinkButton from "@/src/components/ui/link-button";
import { GoogleIcon } from "@/src/components/icons/google-icon";

type FormValues = {
  email: string;
  password: string;
};

function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const accessToken = searchParams.get("accessToken");
  const refreshToken = searchParams.get("refreshToken");
  const signIn = searchParams.get("sign-in");
  const { showToast } = useToastStore();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL + "/users/google";

  const { mutateAsync: loginUserAsync } = usePost<
    FormValues,
    LoginUserResponse
  >({
    url: "/users/login",
  });

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      router.replace("/app/dashboard");
    }
  }, [router]);

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
        const errorMessage = errorExtractor(error);
        showToast(errorMessage, "error");
      },
    });

    if (response.accessToken && response.refreshToken) {
      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("refreshToken", response.refreshToken);
      router.push("/app/dashboard");
    }
  };

  useEffect(() => {
    if (signIn === "true" && accessToken && refreshToken) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      router.push("/app/dashboard");
    }
  }, [accessToken, refreshToken, router, signIn]);

  return (
    <AuthLayout>
      <div className="col-span-6 mx-auto w-full rounded-lg bg-white shadow sm:max-w-lg md:mt-0 xl:p-0">
        <div className="space-y-4 p-6 sm:p-8 lg:space-y-6">
          <h1 className="text-xl leading-tight font-bold tracking-tight text-gray-900 sm:text-2xl">
            Welcome back
          </h1>
          <div className="items-center space-y-3 sm:flex sm:space-y-0 sm:space-x-4">
            <LinkButton
              additionalClasses="w-full"
              icon={<GoogleIcon />}
              color="white"
              href={apiUrl}
              text="Log in with Google"
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
                label="Email"
                type="email"
                placeholder="Enter your email"
                error={errors.email?.message}
                {...methods.register("email")}
              />

              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                error={errors.password?.message}
                {...methods.register("password")}
              />
              <div className="flex justify-end">
                <CustomLink href="/forgot-password" text="Forgot password?" />
              </div>

              <Button
                additionalClasses="w-full"
                text="Sign in to your account"
                type="submit"
              />
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

export default function LoginPageWithTokens() {
  return (
    <AuthLayout>
      <Suspense fallback={null}>
        <Login />
      </Suspense>
    </AuthLayout>
  );
}
