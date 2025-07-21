"use client";

import { SidebarGroupType } from "./sidebar-data";
import SidebarItem from "./sidebar-item";

interface Props {
  group: SidebarGroupType;
  closeSidebar: () => void;
}

export default function SidebarGroup({ group, closeSidebar }: Props) {
  return (
    <div className="px-2 py-4">
      <p className="mb-1 ml-3 text-[11px] font-light tracking-wider text-gray-400 uppercase">
        {group.title}
      </p>
      <ul>
        {group.items.map((item) => (
          <SidebarItem
            key={item.label}
            item={item}
            closeSidebar={closeSidebar}
          />
        ))}
      </ul>
    </div>
  );
}
