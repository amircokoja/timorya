import React from "react";
import {
  baseStyles,
  getButtonStyles,
  ButtonColor,
  ButtonVariant,
  getSizeStyles,
} from "./button-styles";
import Link from "next/link";

interface LinkButtonProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "className"> {
  text: string;
  color?: ButtonColor;
  variant?: ButtonVariant;
  icon?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  href: string;
  additionalClasses?: string;
  disabled?: boolean;
}

const LinkButton: React.FC<LinkButtonProps> = ({
  text,
  color = "blue",
  variant = "solid",
  icon,
  size = "md",
  href,
  additionalClasses,
  disabled,
  ...props
}) => {
  const hasText = !!text;
  const linkClass = `${baseStyles} ${getButtonStyles(color, variant)} ${getSizeStyles(size, hasText)} ${additionalClasses} ${disabled ? "pointer-events-none opacity-50" : ""}`;

  return (
    <Link href={disabled ? "#" : href} className={linkClass} {...props}>
      {icon && <>{icon}</>}
      {text}
    </Link>
  );
};

export default LinkButton;
