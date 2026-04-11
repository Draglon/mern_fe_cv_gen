import { pathOr } from "ramda";

import { Locales } from "@/lib/constants/props/locales";
import { PersonalInfoProps } from "@/lib/constants/props/resume";

export const personalInfoByLocale = (personalInfo: PersonalInfoProps, locale: Locales) => ({
  sectionTitle: pathOr("", ["sectionTitle", locale], personalInfo),
  userUrl: personalInfo?.userUrl ? [personalInfo?.userUrl] : [],
  firstName: pathOr("", ["firstName", locale], personalInfo),
  lastName: pathOr("", ["lastName", locale], personalInfo),
  email: pathOr("", ["email", locale], personalInfo),
  about: pathOr("", ["about", locale], personalInfo),
  address: pathOr("", ["address", locale], personalInfo),
  phoneNumber: pathOr("", ["phoneNumber", locale], personalInfo),
  birthday: pathOr("", ["birthday", locale], personalInfo),
  linkedIn: pathOr("", ["linkedIn", locale], personalInfo),
  telegram: pathOr("", ["telegram", locale], personalInfo),
  portfolio: pathOr("", ["portfolio", locale], personalInfo),
});
