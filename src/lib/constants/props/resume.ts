import { Locales, Locale } from "@/lib/constants/props/locales";

export type personalInfoProps = {
  template: string;
  templateLanguage: Locales;
  personalInfo: {
    userUrl?: string;
    sectionTitle?: string;
    firstName: Locale;
    lastName: Locale;
    about?: Locale;
    address?: Locale;
    birthday?: Locale;
    phoneNumber?: Locale;
    email?: Locale;
    linkedIn?: Locale;
    telegram?: Locale;
    portfolio?: Locale;
  };
};

export type personalFullNameProps = {
  templateLanguage: Locales;
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
