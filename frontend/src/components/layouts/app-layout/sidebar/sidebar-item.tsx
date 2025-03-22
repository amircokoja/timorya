import { usePathname } from "next/navigation";
import { SidebarItemType } from "./sidebar-data";
import Link from "next/link";
import classNames from "classnames";

interface Props {
  item: SidebarItemType;
}

const generateIconColor = (isActivePath: boolean) =>
  isActivePath ? "#2563eb" : "#374151";

export default function SidebarItem({ item }: Props) {
  const pathname = usePathname();

  const isActivePath = pathname.startsWith(item.href) && pathname !== "/";

  const linkClasses = classNames(
    "group flex items-center rounded-lg border p-2 hover:bg-gray-100 mb-1",
    {
      "bg-gray-50 border-gray-200 text-blue-600": isActivePath,
      "border-transparent text-gray-500": !isActivePath,
    },
  );

  return (
    <li>
      <Link href={item.href} className={linkClasses}>
        <item.icon color={generateIconColor(isActivePath)} />
        <span className="ms-3 text-sm">{item.label}</span>
      </Link>
    </li>
  );
}
