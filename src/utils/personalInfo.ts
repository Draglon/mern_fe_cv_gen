import { Locales, Locale } from "@/lib/constants/props/locales";

type PersonalInfoProps = {
  sectionTitle: Locale;
  userUrl?: string,
  firstName: Locale,
  lastName: Locale,
  email: Locale,
  about: Locale,
  address: Locale,
  phoneNumber: Locale,
  birthday: Locale,
  linkedIn: Locale,
  telegram: Locale,
  portfolio: Locale,
};

export const personalInfoByLocale = (personalInfo: PersonalInfoProps, locale: Locales) => ({
  sectionTitle: personalInfo?.sectionTitle[locale] ? personalInfo.sectionTitle[locale] : "",
  userUrl: personalInfo?.userUrl ? [personalInfo.userUrl] : [],
  firstName: personalInfo?.firstName[locale] ? personalInfo.firstName[locale] : "",
  lastName: personalInfo?.lastName[locale] ? personalInfo.lastName[locale] : "",
  email: personalInfo?.email[locale] ? personalInfo.email[locale] : "",
  about: personalInfo?.about[locale] ? personalInfo.about[locale] : "",
  address: personalInfo?.address[locale] ? personalInfo.address[locale] : "",
  phoneNumber: personalInfo?.phoneNumber[locale] ? personalInfo.phoneNumber[locale] : "",
  birthday: personalInfo?.birthday[locale] ? personalInfo.birthday[locale] : "",
  linkedIn: personalInfo?.linkedIn[locale] ? personalInfo.linkedIn[locale] : "",
  telegram: personalInfo?.telegram[locale] ? personalInfo.telegram[locale] : "",
  portfolio: personalInfo?.portfolio[locale] ? personalInfo.portfolio[locale] : "",
});
