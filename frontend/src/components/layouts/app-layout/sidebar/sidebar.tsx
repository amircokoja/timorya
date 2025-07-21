import { GeneralSidebarGroup, SupportSidebarGroup } from "./sidebar-data";
import SidebarGroup from "./sidebar-group";

interface Props {
  closeSidebar: () => void;
}

export default function Sidebar({ closeSidebar }: Props) {
  return (
    <>
      <div>
        <SidebarGroup group={GeneralSidebarGroup} closeSidebar={closeSidebar} />
      </div>
      <div className="border-t border-gray-200">
        <SidebarGroup group={SupportSidebarGroup} closeSidebar={closeSidebar} />
      </div>
    </>
  );
}
