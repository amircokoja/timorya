import {
  Dropdown as FlowbiteDropdown,
  DropdownItem as FlowbiteDropdownItem,
} from "flowbite-react";
import { DropdownProps } from "flowbite-react/components/Dropdown";
import React from "react";

interface DropdownItem {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

interface Props extends Omit<Partial<DropdownProps>, "trigger"> {
  items: DropdownItem[];
  trigger: React.ReactElement;
}

const Dropdown: React.FC<Props> = ({
  items,
  trigger,
  className,
  ...rest
}: Props) => {
  return (
    <FlowbiteDropdown
      label={""}
      dismissOnClick={true}
      renderTrigger={() => trigger}
      placement="bottom-start"
      className={className}
      {...rest}
    >
      {items.map((item) => (
        <FlowbiteDropdownItem
          key={item.label}
          onClick={() => item.onClick && item.onClick()}
        >
          {item.icon && item.icon}
          {item.label}
        </FlowbiteDropdownItem>
      ))}
    </FlowbiteDropdown>
  );
};

export default Dropdown;
