import { SidebarIconProps } from "../../layouts/app-layout/sidebar/sidebar-data";

export const ClientsIcon = ({ color }: SidebarIconProps) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 16C5 13.4227 7.08934 11.3333 9.66667 11.3333C12.244 11.3333 14.3333 13.4227 14.3333 16M12.3333 6.66667C12.3333 8.13943 11.1394 9.33333 9.66667 9.33333C8.19391 9.33333 7 8.13943 7 6.66667C7 5.19391 8.19391 4 9.66667 4C11.1394 4 12.3333 5.19391 12.3333 6.66667Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
