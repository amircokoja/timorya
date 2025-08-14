import { UserDataDto } from "@/src/models/users/user-data-dto";

interface Props {
  userData: UserDataDto;
}

export default function SettingsOverview({ userData }: Props) {
  return (
    <div className="space-y-4 py-4 md:py-8">
      <div className="flex space-x-4">
        <div>
          <div className="bg-primary-600 rounded-lg">
            <svg
              className="h-20 w-20 text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="flex items-center text-xl leading-none font-bold text-gray-900 sm:text-2xl">
            {userData.firstName} {userData.lastName}
          </h2>
        </div>
      </div>
      <dl className="">
        <dt className="font-semibold text-gray-900">Email Address</dt>
        <dd className="text-gray-500">{userData.email}</dd>
      </dl>
    </div>
  );
}
