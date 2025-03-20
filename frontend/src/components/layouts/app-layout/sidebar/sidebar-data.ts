// import { ActivityIcon } from "@/src/components/icons/sidebar-icons/activity-icon";
// import { CalendarIcon } from "@/src/components/icons/sidebar-icons/calendar-icon";
import { ClientsIcon } from "@/src/components/icons/sidebar-icons/clients-icon";
import { DashboardIcon } from "@/src/components/icons/sidebar-icons/dashboard-icon";
// import { MembersIcon } from "@/src/components/icons/sidebar-icons/members-icon";
// import { ProjectsIcon } from "@/src/components/icons/sidebar-icons/projects-icon";
// import { ReportsIcon } from "@/src/components/icons/sidebar-icons/reports-icon";
// import { SettingsIcon } from "@/src/components/icons/sidebar-icons/settings-icon";

export interface SidebarGroupType {
  title: string;
  items: SidebarItemType[];
}

export interface SidebarItemType {
  icon: (props: SidebarIconProps) => JSX.Element;
  label: string;
  href: string;
}

export interface SidebarIconProps {
  color?: string;
}

export const GeneralSidebarGroup: SidebarGroupType = {
  title: "General",
  items: [
    {
      label: "Dashboard",
      icon: DashboardIcon,
      href: "/app/dashboard",
    },
    // {
    //   label: "Calendar",
    //   icon: CalendarIcon,
    //   href: "/app/calendar",
    // },
  ],
};

// export const ToolsSidebarGroup: SidebarGroupType = {
//   title: "Tools",
//   items: [
//     {
//       label: "Reports",
//       icon: ReportsIcon,
//       href: "/app/reports",
//     },
//     {
//       label: "Activity",
//       icon: ActivityIcon,
//       href: "/app/activity",
//     },
//   ],
// };

export const SupportSidebarGroup: SidebarGroupType = {
  title: "Support",
  items: [
    {
      label: "Clients",
      icon: ClientsIcon,
      href: "/app/clients",
    },
    // {
    //   label: "Projects",
    //   icon: ProjectsIcon,
    //   href: "/app/projects",
    // },
    // {
    //   label: "Members",
    //   icon: MembersIcon,
    //   href: "/app/members",
    // },
    // {
    //   label: "Settings",
    //   icon: SettingsIcon,
    //   href: "/app/settings",
    // },
  ],
};
