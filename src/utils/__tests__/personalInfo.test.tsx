import { PersonalInfoProps } from "@/lib/constants/props/resume";

import { personalInfoByLocale } from "../personalInfo";

describe("personalInfoByLocale", () => {
  const personalInfo: PersonalInfoProps = {
    sectionTitle: {
      en: "Personal information",
      ru: "Личная информация",
      ua: "Особиста інформація",
    },
    userUrl: {
      en: "john-doe",
      ru: "john-doe-ru",
      ua: "john-doe-ua",
    },
    firstName: {
      en: "John",
      ru: "Джон",
      ua: "Джон",
    },
    lastName: {
      en: "Doe",
      ru: "Доу",
      ua: "Доу",
    },
    email: {
      en: "john@example.com",
      ru: "john@example.com",
      ua: "john@example.com",
    },
    aboutMe: {
      en: "Frontend developer",
      ru: "Frontend разработчик",
      ua: "Frontend розробник",
    },
    address: {
      en: "New York",
      ru: "Нью-Йорк",
      ua: "Нью-Йорк",
    },
    phoneNumber: {
      en: "+123456789",
      ru: "+123456789",
      ua: "+123456789",
    },
    birthday: {
      en: "01.01.1990",
      ru: "01.01.1990",
      ua: "01.01.1990",
    },
    linkedIn: {
      en: "linkedin.com/john",
      ru: "linkedin.com/john",
      ua: "linkedin.com/john",
    },
    telegram: {
      en: "@john",
      ru: "@john",
      ua: "@john",
    },
    portfolio: {
      en: "john.dev",
      ru: "john.dev",
      ua: "john.dev",
    },
  };

  it("returns personal info for the specified locale", () => {
    expect(personalInfoByLocale(personalInfo, "en")).toEqual({
      sectionTitle: "Personal information",
      userUrl: ["john-doe"],
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      aboutMe: "Frontend developer",
      address: "New York",
      phoneNumber: "+123456789",
      birthday: "01.01.1990",
      linkedIn: "linkedin.com/john",
      telegram: "@john",
      portfolio: "john.dev",
    });
  });

  it("returns default values when optional fields are not provided", () => {
    const personalInfoWithoutOptionalFields: PersonalInfoProps = {
      firstName: personalInfo.firstName,
      lastName: personalInfo.lastName,
      email: personalInfo.email,
      aboutMe: personalInfo.aboutMe,
      address: personalInfo.address,
      phoneNumber: personalInfo.phoneNumber,
      birthday: personalInfo.birthday,
    };

    expect(
      personalInfoByLocale(personalInfoWithoutOptionalFields, "en")
    ).toEqual({
      sectionTitle: "",
      userUrl: [],
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      aboutMe: "Frontend developer",
      address: "New York",
      phoneNumber: "+123456789",
      birthday: "01.01.1990",
      linkedIn: "",
      telegram: "",
      portfolio: "",
    });
  });
});
