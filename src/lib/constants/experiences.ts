export const EMPLOYMENT_TYPES = [
  "fullTime",
  "partTime",
  "contract",
  "internship",
] as const;

export type EmploymentTypesType = (typeof EMPLOYMENT_TYPES)[number];

export const WORK_FORMATS = [
  "office",
  "remote",
  "hybrid",
] as const;

export type WorkFormatType = (typeof WORK_FORMATS)[number];
