import { Locale } from "@/lib/constants/props/locales";

export type personalInfoProps = {
  personalInfo: {
    userUrl?: string;
    firstName: Locale;
    lastName: Locale;
    about?: Locale;
    address?: Locale;
    birthday?: Locale;
    phone?: Locale;
    email?: Locale;
    linkedIn?: Locale;
  };
};