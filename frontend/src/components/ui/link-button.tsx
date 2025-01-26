import React from "react";
import {
  baseStyles,
  getButtonStyles,
  ButtonColor,
  ButtonVariant,
} from "./button-styles";
import Link from "next/link";

interface LinkButtonProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "className"> {
  text: string;
  color?: ButtonColor;
  variant?: ButtonVariant;
  icon?: React.ReactNode;
  href: string;
}

const LinkButton: React.FC<LinkButtonProps> = ({
  text,
  color = "blue",
  variant = "solid",
  icon,
  href,
  ...props
}) => {
  const linkClass = `${baseStyles} ${getButtonStyles(color, variant)}`;

  return (
    <Link href={href} className={linkClass} {...props}>
      {icon && <>{icon}</>}
      {text}
    </Link>
  );
};

export default LinkButton;
