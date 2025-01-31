export const baseStyles =
  "inline-flex items-center justify-center w-full rounded-lg px-5 py-2.5 text-center text-sm font-medium focus:outline-none focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed";

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

export type ButtonColor = keyof typeof colorVariants;
export type ButtonVariant = "solid" | "outline" | "ghost";
