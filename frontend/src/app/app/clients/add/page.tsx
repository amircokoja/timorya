"use client";

import {
  emailValidation,
  firstNameValidation,
  lastNameValidation,
} from "@/src/app/data/validation-values/client-form-validation";
import Breadcrumbs from "@/src/components/ui/breadcrumbs";
import ColorSelector from "@/src/components/ui/color-selector";
import Input from "@/src/components/ui/input";
import Select from "@/src/components/ui/select";
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
    console.log(data);
  };

  const handleColorChange = (color: string) => {
    // console.log(color);
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
            <button
              type="submit"
              className="mt-4 inline-flex items-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-200 sm:mt-6"
            >
              Add user
            </button>
          </form>
        </FormProvider>
      </div>
    </section>
  );
}
