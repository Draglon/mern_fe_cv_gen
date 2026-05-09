export const LANGUAGE_LEVEL = [
  "native",
  "elementary",
  "preIntermediate",
  "intermediate",
  "upperIntermediate",
  "advanced",
  "proficiency",
] as const;

export type LanguageLevel = (typeof LANGUAGE_LEVEL)[number];
