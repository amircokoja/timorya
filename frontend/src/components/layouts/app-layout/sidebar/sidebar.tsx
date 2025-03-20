import {
  GeneralSidebarGroup,
  SupportSidebarGroup,
  // ToolsSidebarGroup,
} from "./sidebar-data";
import SidebarGroup from "./sidebar-group";

export default function Sidebar() {
  return (
    <>
      <div>
        <SidebarGroup group={GeneralSidebarGroup} />
      </div>
      {/* <div className="border-t border-gray-200">
        <SidebarGroup group={ToolsSidebarGroup} />
      </div> */}
      <div className="border-t border-gray-200">
        <SidebarGroup group={SupportSidebarGroup} />
      </div>
    </>
  );
}
