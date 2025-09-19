import { SidebarIconProps } from "../../layouts/app-layout/sidebar/sidebar-data";

export const TimeTrackerIcon = ({ color }: SidebarIconProps) => {
  const colorValue = color ?? "#374151";
  return (
    <svg
      className={`h-[20px] w-[20px] text-[${colorValue}]`}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke={colorValue}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
  );
};
