export const lowerWords = [
  "a",
  "an",
  "the",
  "and",
  "but",
  "or",
  "nor",
  "for",
  "so",
  "yet",
  "to",
  "of",
  "in",
  "on",
  "with",
  "at",
  "by",
  "from",
];

export const convertToReadableText = (input: string): string => {
  // If the string already contains spaces or dashes and looks human-readable, return as-is
  if (/[\p{L}]+\s[\p{L}]+|[\p{L}]+-[\p{L}]+/u.test(input)) {
    return input;
  }

  // Convert camelCase to snake_case
  const snakeCase = input.replace(/([a-z])([A-Z])/g, "$1_$2").toLowerCase();

  // Replace underscores with spaces
  const withSpaces = snakeCase.replace(/_/g, " ");

  // Capitalize each word except common prepositions/conjunctions
  const words = withSpaces.split(" ").map((word) => {
    if (lowerWords.includes(word.toLowerCase())) {
      return word.toLowerCase();
    }
    return word.charAt(0).toUpperCase() + word.slice(1);
  });

  return words.join(" ");
};
