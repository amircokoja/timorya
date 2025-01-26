"use client";

import AuthLayout from "../../components/layouts/auth-layout";
import Button from "../../components/ui/button";
import LinkButton from "../../components/ui/link-button";
import { GoogleIcon } from "../../components/icons/google-icon";
import { AppleIcon } from "../../components/icons/apple-icon";
import { FormProvider, useForm } from "react-hook-form";
import Input from "../../components/ui/input";
import CustomLink from "../../components/ui/link";

type FormValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

export default function Register() {
  const methods = useForm<FormValues>({
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = (data: FormValues) => {
    console.log("Form Data:", data);
  };

  return (
    <AuthLayout>
      <div className="col-span-6 mx-auto w-full rounded-lg bg-white shadow sm:max-w-lg md:mt-0 xl:p-0">
        <div className="space-y-4 p-6 sm:p-8 lg:space-y-6">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 sm:text-2xl">
            Create your account
          </h1>
          <div className="items-center space-y-3 sm:flex sm:space-x-4 sm:space-y-0">
            <LinkButton
              href="#"
              color="white"
              text="Sign up with Google"
              icon={<GoogleIcon />}
            />
            <LinkButton
              href="#"
              color="white"
              text="Sign up with Apple"
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
                error={errors.email?.message}
                placeholder="Enter your email"
              />

              <Input
                name="password"
                label="Password"
                type="password"
                error={errors.password?.message}
                placeholder="••••••••"
              />

              <Input
                name="confirmPassword"
                label="Confirm password"
                type="password"
                error={errors.confirmPassword?.message}
                placeholder="••••••••"
              />
              <div className="flex items-start">
                <div className="flex h-5 items-center">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    className="size-4 rounded border border-gray-300 bg-gray-50 focus:ring-4 focus:ring-blue-300"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="font-light text-gray-500 ">
                    By signing up, you are creating a TimeHub account, and you
                    agree to TimeHub&apos;s{" "}
                    <CustomLink href="#" text="Terms of Use" /> and{" "}
                    <CustomLink href="#" text="Privacy Policy" />.
                  </label>
                </div>
              </div>
              <Button text="Create your account" type="submit" />
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
