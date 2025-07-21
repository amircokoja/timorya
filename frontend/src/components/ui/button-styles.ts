export const baseStyles =
  "cursor-pointer relative inline-flex items-center justify-center whitespace-nowrap rounded-lg text-center text-sm font-medium focus:outline-none focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed";

// Define size styles for text + icon or just icon
export const sizeVariants: Record<
  string,
  { default: string; iconOnly: string }
> = {
  xs: {
    default: "px-2.5 py-1 text-xxs",
    iconOnly: "w-7 h-7 p-0.5",
  },
  sm: {
    default: "px-3 py-1.5 text-xs",
    iconOnly: "w-8 h-8 p-1",
  },
  md: {
    default: "px-4 py-2 text-sm",
    iconOnly: "w-10 h-10 p-1.5",
  },
  lg: {
    default: "px-5 py-2.5 text-base",
    iconOnly: "w-12 h-12 p-2",
  },
};

// Define color styles
export const colorVariants: Record<string, string> = {
  blue: "text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300",
  red: "text-white bg-red-600 hover:bg-red-700 focus:ring-red-300",
  green: "text-white bg-green-600 hover:bg-green-700 focus:ring-green-300",
  gray: "text-white bg-gray-600 hover:bg-gray-700 focus:ring-gray-300",
  white:
    "text-gray-900 bg-white border border-gray-200 hover:bg-gray-50 focus:ring-blue-300",
};

export const outlineVariants: Record<string, string> = {
  blue: "text-blue-600 border border-blue-600 hover:bg-blue-100 focus:ring-blue-300",
  red: "text-red-600 border border-red-600 hover:bg-red-100 focus:ring-red-300",
  green:
    "text-green-600 border border-green-600 hover:bg-green-100 focus:ring-green-300",
  gray: "text-gray-600 border border-gray-600 hover:bg-gray-100 focus:ring-gray-300",
  white:
    "text-gray-900 border border-gray-200 bg-white hover:bg-gray-50 focus:ring-blue-300",
};

export const ghostVariants: Record<string, string> = {
  blue: "text-blue-600 hover:bg-blue-100 focus:ring-blue-300",
  red: "text-red-600 hover:bg-red-100 focus:ring-red-300",
  green: "text-green-600 hover:bg-green-100 focus:ring-green-300",
  gray: "text-gray-600 hover:bg-gray-100 focus:ring-gray-300",
  white: "text-gray-900 bg-white hover:bg-gray-50 focus:ring-blue-300",
};

export const getButtonStyles = (
  color: keyof typeof colorVariants,
  variant: "solid" | "outline" | "ghost",
) => {
  return variant === "solid"
    ? colorVariants[color]
    : variant === "outline"
      ? outlineVariants[color]
      : ghostVariants[color];
};

// Function to get size styles
export const getSizeStyles = (
  size: keyof typeof sizeVariants,
  hasText: boolean,
) => {
  return hasText ? sizeVariants[size].default : sizeVariants[size].iconOnly;
};

export type ButtonColor = keyof typeof colorVariants;
export type ButtonVariant = "solid" | "outline" | "ghost";
