export type PersonalHobbiesProps = {
  resumeLocale: string;
  isEdit?: boolean;
};

export type HobbyType = {
  hobby: string;
};

export type FieldType = {
  sectionTitle: string;
  hobbies: HobbyType[];
};

export type ParamsType = {
  values: FieldType;
  locale: string;
  resumeLocale: string;
};
