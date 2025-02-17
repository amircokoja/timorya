import { useGet } from "@/src/hooks/use-get";
import { ClientDto } from "@/src/models/clients/client-dto";
import Dropdown from "../../ui/dropdown";
import Button from "../../ui/button";
import { ThreeDotsIcon } from "../../icons/three-dots-icon";
import { useRouter } from "next/navigation";

export default function ClientsTable() {
  const router = useRouter();
  const { data: clients } = useGet<ClientDto[]>({
    url: "clients",
  });

  const handleEdit = (client: ClientDto) => {
    router.push(`/app/clients/edit/${client.id}`);
  };

  const handleDelete = (client: ClientDto) => {
    console.log("Delete");
    console.log(client);
  };

  return (
    <table className="w-full text-left text-sm text-gray-500">
      <thead className="bg-gray-50 text-xs uppercase text-gray-700">
        <tr>
          <th scope="col" className="px-4 py-3">
            Name
          </th>
          <th scope="col" className="px-4 py-3">
            Email
          </th>
          <th scope="col" className="px-4 py-3">
            Color
          </th>
          <th scope="col" className="px-4 py-3">
            <span className="sr-only">Actions</span>
          </th>
        </tr>
      </thead>
      <tbody>
        {clients?.map((client) => (
          <tr className="border-b" key={client.id}>
            <th
              scope="row"
              className="whitespace-nowrap px-4 py-3 font-medium text-gray-900"
            >
              {client.firstName} {client.lastName}
            </th>
            <td className="px-4 py-3">{client.email}</td>
            <td className="px-4 py-3">
              {<div className={`size-4 rounded-sm ${client.color}`}></div>}
            </td>
            <td className="flex items-center justify-end px-4 py-3">
              <Dropdown
                trigger={
                  <div className="relative">
                    <Button icon={<ThreeDotsIcon />} size="xs" color="white" />
                  </div>
                }
                items={[
                  {
                    label: "Edit",
                    onClick: () => handleEdit(client),
                  },
                  {
                    label: "Delete",
                    onClick: () => handleDelete(client),
                  },
                ]}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
