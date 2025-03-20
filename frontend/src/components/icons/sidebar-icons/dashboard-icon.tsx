import { SidebarIconProps } from "../../layouts/app-layout/sidebar/sidebar-data";

export const DashboardIcon = ({ color }: SidebarIconProps) => {
  const colorValue = color ?? "#374151";

  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.72784 9.24044H6.23216C5.86597 9.23743 5.51356 9.38001 5.25248 9.63679C4.9914 9.89358 4.84302 10.2436 4.84 10.6097V15.792C4.84678 16.5543 5.46994 17.1669 6.23216 17.1604H8.72784C9.09401 17.1635 9.44645 17.021 9.70754 16.7642C9.96864 16.5074 10.117 16.1574 10.12 15.7912V10.6097C10.117 10.2436 9.96864 9.89358 9.70754 9.63679C9.44645 9.38001 9.09401 9.23743 8.72784 9.24044Z"
        stroke={colorValue}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.72784 3.96053H6.23216C5.48527 3.93981 4.86252 4.52753 4.84 5.27437V6.16669C4.86252 6.91354 5.48527 7.50125 6.23216 7.48053H8.72784C9.4747 7.50125 10.0975 6.91354 10.12 6.16669V5.27437C10.0975 4.52753 9.4747 3.93981 8.72784 3.96053Z"
        stroke={colorValue}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.2722 11.8806H15.767C16.1333 11.8839 16.4859 11.7414 16.7472 11.4846C17.0085 11.2277 17.157 10.8777 17.16 10.5113V5.32986C17.157 4.96368 17.0086 4.61368 16.7475 4.35689C16.4864 4.1001 16.134 3.95754 15.7678 3.96058H13.2722C12.906 3.95754 12.5536 4.1001 12.2925 4.35689C12.0314 4.61368 11.883 4.96368 11.88 5.32986V10.5113C11.883 10.8775 12.0314 11.2275 12.2925 11.4843C12.5536 11.741 12.906 11.8836 13.2722 11.8806Z"
        stroke={colorValue}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.2722 17.1605H15.767C16.5142 17.1817 17.1375 16.5939 17.16 15.8467V14.9544C17.1375 14.2075 16.5147 13.6198 15.7678 13.6405H13.2722C12.5253 13.6198 11.9025 14.2075 11.88 14.9544V15.8458C11.902 16.593 12.525 17.1812 13.2722 17.1605Z"
        stroke={colorValue}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
