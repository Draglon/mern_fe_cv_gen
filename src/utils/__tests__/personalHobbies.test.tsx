import { PersonalHobbiesProps } from "@/lib/constants/props/resume";

import { hobbiesByLocale } from "../personalHobbies";

describe("hobbiesByLocale", () => {
  const personalHobbies: PersonalHobbiesProps = {
    hobbies: {
      en: [{ hobby: "Reading" }, { hobby: "Traveling" }],
      ru: [],
      ua: [],
    },
  };

  it("returns hobbies for the specified locale", () => {
    expect(hobbiesByLocale("en", personalHobbies)).toEqual(
      personalHobbies.hobbies.en
    );
  });

  it("returns an empty array when hobbies for the specified locale are empty", () => {
    expect(hobbiesByLocale("ua", personalHobbies)).toEqual([]);
  });

  it("returns an empty array when personalHobbies is undefined", () => {
    expect(hobbiesByLocale("en", undefined)).toEqual([]);
  });
});
