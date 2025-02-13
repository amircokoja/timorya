import { useGet } from "@/src/hooks/use-get";
import { ClientDto } from "@/src/models/clients/client-dto";

export default function ClientsTable() {
  const { data: clients } = useGet<ClientDto[]>({
    url: "/clients",
  });

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
              <button
                id="apple-imac-27-dropdown-button"
                data-dropdown-toggle="apple-imac-27-dropdown"
                className="inline-flex items-center rounded-lg p-0.5 text-center text-sm font-medium text-gray-500 hover:text-gray-800 focus:outline-none"
                type="button"
              >
                <svg
                  className="size-5"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
              </button>
              <div
                id="apple-imac-27-dropdown"
                className="z-10 hidden w-44 divide-y divide-gray-100 rounded bg-white shadow "
              >
                <ul
                  className="py-1 text-sm text-gray-700"
                  aria-labelledby="apple-imac-27-dropdown-button"
                >
                  <li>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                      Show
                    </a>
                  </li>
                  <li>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                      Edit
                    </a>
                  </li>
                </ul>
                <div className="py-1">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Delete
                  </a>
                </div>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
