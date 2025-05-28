import { Locales, Locale } from "@/lib/constants/props/locales";

type PersonalInfoProps = {
  sectionTitle: Locale;
  userUrl: any,
  firstName: Locale,
  lastName: Locale,
  email: Locale,
  about: Locale,
  address: Locale,
  phoneNumber: Locale,
  birthday: Locale,
  linkedIn: Locale,
};

export const personalInfoByLocale = (personalInfo: PersonalInfoProps, locale: Locales) => ({
  sectionTitle: personalInfo?.sectionTitle[locale as Locales] ? personalInfo.sectionTitle[locale as Locales] : "",
  userUrl: personalInfo?.userUrl ? [personalInfo.userUrl] : [],
  firstName: personalInfo?.firstName[locale as Locales] ? personalInfo.firstName[locale as Locales] : "",
  lastName: personalInfo?.lastName[locale as Locales] ? personalInfo.lastName[locale as Locales] : "",
  email: personalInfo?.email[locale as Locales] ? personalInfo.email[locale as Locales] : "",
  about: personalInfo?.about[locale as Locales] ? personalInfo.about[locale as Locales] : "",
  address: personalInfo?.address[locale as Locales] ? personalInfo.address[locale as Locales] : "",
  phoneNumber: personalInfo?.phoneNumber[locale as Locales] ? personalInfo.phoneNumber[locale as Locales] : "",
  birthday: personalInfo?.birthday[locale as Locales] ? personalInfo.birthday[locale as Locales] : "",
  linkedIn: personalInfo?.linkedIn[locale as Locales] ? personalInfo.linkedIn[locale as Locales] : "",
});
