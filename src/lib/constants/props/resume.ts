import { Locale } from "@/lib/constants/props/locales";

export type personalInfoProps = {
  template: string;
  personalInfo: {
    userUrl?: string;
    firstName: Locale;
    lastName: Locale;
    about?: Locale;
    address?: Locale;
    birthday?: Locale;
    phoneNumber?: Locale;
    email?: Locale;
    linkedIn?: Locale;
  };
};

export type personalFullNameProps = {
  personalFullName: {
    userUrl?: string;
    firstName: Locale;
    lastName: Locale;
    about?: Locale;
    address?: Locale;
    birthday?: Locale;
    phoneNumber?: Locale;
    email?: Locale;
    linkedIn?: Locale;
  };
};
