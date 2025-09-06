import React from "react";
import {
  baseStyles,
  getButtonStyles,
  ButtonColor,
  ButtonVariant,
  getSizeStyles,
} from "./button-styles";

interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className"> {
  text?: string;
  color?: ButtonColor;
  variant?: ButtonVariant;
  size?: "xs" | "sm" | "md" | "lg";
  icon?: React.ReactNode;
  additionalClasses?: string;
  iconPosition?: "left" | "right";
}

const Button: React.FC<ButtonProps> = ({
  text,
  color = "blue",
  variant = "solid",
  size = "md",
  icon,
  additionalClasses,
  iconPosition = "left",
  ...props
}) => {
  const hasText = !!text;
  const buttonClass = `${baseStyles} ${getButtonStyles(color, variant)} ${getSizeStyles(size, hasText)} ${additionalClasses}`;

  return (
    <button className={buttonClass} {...props}>
      {icon && iconPosition === "left" && (
        <span className={hasText ? "mr-2" : ""}>{icon}</span>
      )}
      <span>{text}</span>
      {icon && iconPosition === "right" && (
        <span className={hasText ? "ml-2" : ""}>{icon}</span>
      )}
    </button>
  );
};

export default Button;
