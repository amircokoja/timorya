"use client";

import {
  emailValidation,
  firstNameValidation,
  lastNameValidation,
} from "@/src/app/data/validation-values/client-form-validation";
import Breadcrumbs from "@/src/components/ui/breadcrumbs";
import Button from "@/src/components/ui/button";
import ColorSelector from "@/src/components/ui/color-selector";
import Input from "@/src/components/ui/input";
import Select from "@/src/components/ui/select";
import { usePost } from "@/src/hooks/use-post";
import { ApiError } from "@/src/models/abstractions/api-error";
import { ClientDto } from "@/src/models/clients/client-dto";
import { errorExtractor } from "@/src/services/error-extractor";
import { useToastStore } from "@/src/store/toast-store";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";

export type ClientsForm = {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  currency: string;
  color: string;
};

export default function AddClient() {
  const { showToast } = useToastStore();
  const router = useRouter();
  const { mutateAsync: createClientAsync, isPending } = usePost<
    ClientsForm,
    ClientDto
  >({
    url: "/clients",
  });

  const methods = useForm<ClientsForm>({
    mode: "onBlur",
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      address: "",
      currency: "",
      color: "bg-blue-600",
    },
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (data: ClientsForm) => {
    await createClientAsync(data, {
      onSuccess: () => {
        showToast("Client successfully created.", "success");
        router.push("/app/clients");
      },
      onError: (error: AxiosError<ApiError>) => {
        const errorMessage = errorExtractor(error);
        showToast(errorMessage, "error");
      },
    });
  };

  const handleColorChange = (color: string) => {
    methods.setValue("color", color);
  };

  return (
    <section className="bg-white">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/app/dashboard" },
          { label: "Clients", href: "/app/clients" },
          { label: "Add new client", href: "/app/clients/add" },
        ]}
      />
      <div className="mx-auto max-w-2xl px-4 py-8 lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900">
          Add a new client
        </h2>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <Input
                label="First name"
                error={errors.firstName?.message}
                placeholder="Enter first name"
                {...methods.register("firstName", {
                  ...firstNameValidation,
                })}
              />

              <Input
                label="Last name"
                error={errors.lastName?.message}
                placeholder="Enter last name"
                {...methods.register("lastName", {
                  ...lastNameValidation,
                })}
              />

              <Input
                label="Email"
                error={errors.email?.message}
                placeholder="Enter email"
                {...methods.register("email", {
                  ...emailValidation,
                })}
              />

              <Input
                label="Address"
                error={errors.lastName?.message}
                placeholder="Enter address"
                {...methods.register("address", {
                  ...lastNameValidation,
                })}
              />
              <div className="sm:col-span-2">
                <Select
                  label="Select currency"
                  options={[
                    { value: "EUR", label: "EUR" },
                    { value: "USD", label: "USD" },
                    { value: "GBP", label: "GBP" },
                    { value: "KM", label: "KM" },
                  ]}
                  error={errors.currency?.message}
                  {...methods.register("currency")}
                  registerOptions={{
                    required: "Currency selection is required",
                  }}
                />
              </div>

              <div className="sm:col-span-2">
                <ColorSelector
                  handleColorChange={handleColorChange}
                  value={methods.watch("color")}
                />
              </div>
            </div>
            <div className="mt-6">
              <Button text="Add user" type="submit" />
            </div>
          </form>
        </FormProvider>
      </div>
    </section>
  );
}
