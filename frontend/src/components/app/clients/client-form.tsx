import {
  emailValidation,
  firstNameValidation,
  lastNameValidation,
} from "@/src/components/app/data/validation-values/client-form-validation";
import Button from "@/src/components/ui/button";
import ColorSelector from "@/src/components/ui/color-selector";
import Input from "@/src/components/ui/input";
import Select from "@/src/components/ui/select";
import { usePost } from "@/src/hooks/use-post";
import { usePut } from "@/src/hooks/use-put";
import { ApiError } from "@/src/models/abstractions/api-error";
import { ClientDto } from "@/src/models/clients/client-dto";
import { errorExtractor } from "@/src/services/error-extractor";
import { useToastStore } from "@/src/store/toast-store";
import { useQueryClient } from "@tanstack/react-query";
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

interface Props {
  client?: ClientDto;
}
export default function ClientForm({ client }: Props) {
  const { showToast } = useToastStore();
  const router = useRouter();
  const { mutateAsync: createClientAsync } = usePost<ClientsForm, ClientDto>({
    url: "/clients",
  });

  const { mutateAsync: updateClientAsync } = usePut<ClientsForm, ClientDto>();

  const methods = useForm<ClientsForm>({
    mode: "onBlur",
    defaultValues: {
      email: client?.email || "",
      firstName: client?.firstName || "",
      lastName: client?.lastName || "",
      address: client?.address || "",
      currency: client?.currency || "",
      color: client?.color || "bg-blue-600",
    },
  });
  const queryClient = useQueryClient();

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (data: ClientsForm) => {
    if (client) {
      const url = "/clients/" + client?.id;
      await updateClientAsync(
        { url, data },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ["clients/" + client.id],
              exact: true,
            });

            handleSuccess();
          },
          onError: (error: AxiosError<ApiError>) => {
            handleError(error);
          },
        },
      );
    } else {
      await createClientAsync(data, {
        onSuccess: () => {
          handleSuccess();
        },
        onError: (error: AxiosError<ApiError>) => {
          handleError(error);
        },
      });
    }
  };

  const handleSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: ["clients"],
    });
    const message = client
      ? "Client successfully updated."
      : "Client successfully created.";
    showToast(message, "success");
    router.push("/app/clients");
  };

  const handleError = (error: AxiosError<ApiError>) => {
    const errorMessage = errorExtractor(error);
    showToast(errorMessage, "error");
  };

  const handleColorChange = (color: string) => {
    methods.setValue("color", color);
  };

  return (
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
          <Button
            text={client ? "Update client" : "Create client"}
            type="submit"
          />
        </div>
      </form>
    </FormProvider>
  );
}
