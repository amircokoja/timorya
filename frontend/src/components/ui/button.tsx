import React from "react";
import {
  baseStyles,
  getButtonStyles,
  ButtonColor,
  ButtonVariant,
} from "./button-styles";

interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className"> {
  text: string;
  color?: ButtonColor;
  variant?: ButtonVariant;
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  text,
  color = "blue",
  variant = "solid",
  icon,
  ...props
}) => {
  const buttonClass = `${baseStyles} ${getButtonStyles(color, variant)}`;

  return (
    <button className={buttonClass} {...props}>
      {icon && <span className="mr-2">{icon}</span>}
      {text}
    </button>
  );
};

export default Button;
