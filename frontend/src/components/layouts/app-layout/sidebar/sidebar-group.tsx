"use client";

import { SidebarGroupType } from "./sidebar-data";
import SidebarItem from "./sidebar-item";

interface Props {
  group: SidebarGroupType;
}

export default function SidebarGroup({ group }: Props) {
  return (
    <div className="px-2 py-4">
      <p className="mb-1 ml-3 text-[11px] font-light uppercase tracking-wider text-gray-400">
        {group.title}
      </p>
      <ul>
        {group.items.map((item) => (
          <SidebarItem key={item.label} item={item} />
        ))}
      </ul>
    </div>
  );
}
