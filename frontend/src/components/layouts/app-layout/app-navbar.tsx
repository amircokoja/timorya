import classNames from "classnames";
import Button from "../../ui/button";
import Dropdown from "../../ui/dropdown";

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

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.href = "/login";
  };

  return (
    <header className="border-b border-gray-200 antialiased">
      <nav className="bg-white px-4 py-2.5 lg:px-6">
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
            <Dropdown
              trigger={
                <Button
                  size="sm"
                  icon={
                    <svg
                      className="h-6 w-6 text-gray-800"
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
                  }
                />
              }
              items={[
                {
                  label: "Log out",
                  onClick: () => handleLogout(),
                },
              ]}
            />
          </div>
        </div>
      </nav>
    </header>
  );
}
