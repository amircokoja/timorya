import { useEffect, useState } from "react";
import { BackIcon } from "../../icons/back-icon";
import Button from "../../ui/button";
import AppNavbar from "./app-navbar";
import classNames from "classnames";
import Sidebar from "./sidebar/sidebar";
import Link from "next/link";
import { TimoryaLogo } from "../../icons/timorya-logo";
import useIsMobile from "@/src/hooks/useIsMobile";
import { UserDataDto } from "@/src/models/users/user-data-dto";
import { useGet } from "@/src/hooks/use-get";
import CreateOrganizationModal from "../../modals/create-organization-modal";

interface Props {
  children: React.ReactNode;
}

export default function AppLayout({ children }: Props) {
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { data: userData } = useGet<UserDataDto>({
    url: "users/me",
  });
  const [isCreateOrganizationModalOpen, setIsCreateOrganizationModalOpen] =
    useState(false);

  useEffect(() => {
    if (userData && !userData.currentOrganizationId) {
      setIsCreateOrganizationModalOpen(true);
    }
  }, [userData]);

  useEffect(() => {
    setIsSidebarOpen(!isMobile);
  }, [isMobile]);

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
              <Link href="/" className="relative top-0.5">
                <TimoryaLogo />
              </Link>
              <Button
                color="white"
                icon={<BackIcon />}
                size="sm"
                onClick={handleToggleSidebar}
              />
            </div>
          </div>
          <Sidebar closeSidebar={handleToggleSidebar} />
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
        <div className="flex flex-1 bg-gray-100 p-2 md:p-5">
          <div className="flex flex-1 flex-col overflow-auto rounded-lg border border-gray-200 bg-white p-2 md:p-8">
            {children}
          </div>
        </div>
      </div>

      <CreateOrganizationModal
        isOpen={isCreateOrganizationModalOpen}
        onClose={() => setIsCreateOrganizationModalOpen(false)}
      />
    </>
  );
}
