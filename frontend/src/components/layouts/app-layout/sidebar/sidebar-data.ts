import { ActivityIcon } from "@/src/components/icons/sidebar-icons/activity-icon";
import { CalendarIcon } from "@/src/components/icons/sidebar-icons/calendar-icon";
import { ClientsIcon } from "@/src/components/icons/sidebar-icons/clients-icon";
import { DashboardIcon } from "@/src/components/icons/sidebar-icons/dashboard-icon";
import { MembersIcon } from "@/src/components/icons/sidebar-icons/members-icon";
import { ProjectsIcon } from "@/src/components/icons/sidebar-icons/projects-icon";
import { ReportsIcon } from "@/src/components/icons/sidebar-icons/reports-icon";
import { SettingsIcon } from "@/src/components/icons/sidebar-icons/settings-icon";

export interface SidebarGroupType {
  title: string;
  items: SidebarItemType[];
}

export interface SidebarItemType {
  icon: () => JSX.Element;
  label: string;
}

export const GeneralSidebarGroup: SidebarGroupType = {
  title: "General",
  items: [
    {
      label: "Dashboard",
      icon: DashboardIcon,
    },
    {
      label: "Calendar",
      icon: CalendarIcon,
    },
  ],
};

export const ToolsSidebarGroup: SidebarGroupType = {
  title: "Tools",
  items: [
    {
      label: "Reports",
      icon: ReportsIcon,
    },
    {
      label: "Activity",
      icon: ActivityIcon,
    },
  ],
};

export const SupportSidebarGroup: SidebarGroupType = {
  title: "Support",
  items: [
    {
      label: "Projects",
      icon: ProjectsIcon,
    },
    {
      label: "Clients",
      icon: ClientsIcon,
    },
    {
      label: "Members",
      icon: MembersIcon,
    },
    {
      label: "Settings",
      icon: SettingsIcon,
    },
  ],
};
