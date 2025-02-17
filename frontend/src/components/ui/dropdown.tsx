import { Dropdown as FlowbiteDropdown } from "flowbite-react";
import React, { ReactElement } from "react";

interface DropdownItem {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

interface Props {
  items: DropdownItem[];
  trigger: ReactElement;
}

const Dropdown: React.FC<Props> = ({ items, trigger }: Props) => {
  return (
    <FlowbiteDropdown
      className="z-50"
      label="Dropdown"
      dismissOnClick={true}
      renderTrigger={() => trigger}
      placement={"bottom-end"}
    >
      {items.map((item) => (
        <FlowbiteDropdown.Item
          key={item.label}
          onClick={() => item.onClick && item.onClick()}
        >
          {item.icon}
          {item.label}
        </FlowbiteDropdown.Item>
      ))}
    </FlowbiteDropdown>
  );
};

export default Dropdown;
