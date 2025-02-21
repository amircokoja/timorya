import { useState } from "react";
import { BackIcon } from "../../icons/back-icon";
import { TimeHubLogo } from "../../icons/timehub-logo";
import Button from "../../ui/button";
import AppNavbar from "./app-navbar";
import classNames from "classnames";
import Sidebar from "./sidebar/sidebar";

interface Props {
  children: React.ReactNode;
}

export default function AppLayout({ children }: Props) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const asideClassnames = classNames(
    "fixed left-0 top-0 z-40 bg-white h-screen w-64 border-r border-gray-200 transition-transform",
    isSidebarOpen ? "translate-x-0" : "-translate-x-full",
  );

  return (
    <>
      <aside
        id="separator-sidebar"
        className={asideClassnames}
        aria-label="Sidebar"
      >
        <div className="h-full overflow-y-auto">
          <div className="border-b border-gray-200 bg-white px-4 py-2.5 lg:px-6">
            <div className="flex h-[50px] items-center justify-between">
              <a href="/" className="relative top-0.5">
                <TimeHubLogo />
              </a>
              <Button
                color="white"
                icon={<BackIcon />}
                size="sm"
                onClick={handleToggleSidebar}
              />
            </div>
          </div>
          <Sidebar />
        </div>
      </aside>

      <div
        className={classNames(
          "flex min-h-screen flex-col",
          isSidebarOpen ? "sm:ml-64" : "",
        )}
      >
        <AppNavbar
          handleSidebarToggle={handleToggleSidebar}
          isSidebarOpen={isSidebarOpen}
        />
        <div className="flex flex-1 bg-gray-100 p-5">
          <div className="flex-1 overflow-auto rounded-lg border border-gray-200 bg-white p-8">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
