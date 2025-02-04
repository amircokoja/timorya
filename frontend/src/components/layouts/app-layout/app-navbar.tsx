import classNames from "classnames";
import Image from "next/image";

interface Props {
  isSidebarOpen: boolean;
  handleSidebarToggle: () => void;
}

export default function AppNavbar({
  isSidebarOpen,
  handleSidebarToggle,
}: Props) {
  const sidebarButtonOpenClasses = classNames(
    "inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200",
    isSidebarOpen ? "block sm:hidden" : "",
  );
  return (
    <header className="border-b border-gray-200 antialiased">
      <nav className=" bg-white px-4 py-2.5 lg:px-6">
        <div className="flex h-[50px] items-center justify-between">
          <div>
            <button
              data-drawer-target="separator-sidebar"
              data-drawer-toggle="separator-sidebar"
              aria-controls="separator-sidebar"
              type="button"
              className={sidebarButtonOpenClasses}
              onClick={handleSidebarToggle}
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                className="size-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                ></path>
              </svg>
            </button>
          </div>

          <div className="flex items-center justify-between lg:order-2">
            <button
              type="button"
              data-dropdown-toggle="notification-dropdown"
              className="mr-1 rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:ring-4 focus:ring-gray-300"
            >
              <span className="sr-only">View notifications</span>
              <svg
                className="size-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 14 20"
              >
                <path d="M12.133 10.632v-1.8A5.406 5.406 0 0 0 7.979 3.57.946.946 0 0 0 8 3.464V1.1a1 1 0 0 0-2 0v2.364a.946.946 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C1.867 13.018 0 13.614 0 14.807 0 15.4 0 16 .538 16h12.924C14 16 14 15.4 14 14.807c0-1.193-1.867-1.789-1.867-4.175ZM3.823 17a3.453 3.453 0 0 0 6.354 0H3.823Z" />
              </svg>
            </button>
            <button
              type="button"
              className="mx-3 flex rounded-full bg-gray-800 text-sm focus:ring-4 focus:ring-gray-300 md:mr-0"
              id="user-menu-button"
              aria-expanded="false"
              data-dropdown-toggle="dropdown"
            >
              <span className="sr-only">Open user menu</span>
              <Image
                className="size-8 rounded-full"
                src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                alt="user photo"
                width={32}
                height={32}
              />
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
