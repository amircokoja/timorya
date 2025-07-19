import {
  Dropdown as FlowbiteDropdown,
  DropdownItem as FlowbiteDropdownItem,
} from "flowbite-react";
import { FloatingProps } from "flowbite-react/components/Floating";
import React from "react";

interface DropdownItem {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

interface Props extends Omit<Partial<FloatingProps>, "trigger"> {
  items: DropdownItem[];
  trigger: React.ReactElement;
}

const Dropdown: React.FC<Props> = ({ items, trigger }: Props, ...rest) => {
  return (
    <FlowbiteDropdown
      label={""}
      dismissOnClick={true}
      renderTrigger={() => trigger}
      placement="bottom-start"
      {...rest}
    >
      {items.map((item) => (
        <FlowbiteDropdownItem
          key={item.label}
          onClick={() => item.onClick && item.onClick()}
        >
          {item.icon}
          {item.label}
        </FlowbiteDropdownItem>
      ))}
    </FlowbiteDropdown>
  );
};

export default Dropdown;
