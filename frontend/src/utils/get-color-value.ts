import { colors } from "../components/ui/color-selector";

export const getColorValue = (colorName: string): string => {
  const color = colors.find((c) => c.name === colorName);
  return color ? color.value : "";
};
