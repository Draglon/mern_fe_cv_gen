export type PersonalInfoProps = {
  resumeLocale: string;
  isEdit?: boolean;
};

export type HobbyType = {
  hobby: string;
};

export type FieldType = {
  sectionTitle?: string;
  userUrl?: string[];
  firstName: string;
  lastName: string;
  email: string;
  aboutMe: string;
  address: string;
  phoneNumber: string;
  birthday: string;
  linkedIn?: string;
  telegram?: string;
  portfolio?: string;
};

export type ParamsType = {
  values: FieldType;
  locale: string;
  resumeLocale: string;
};
