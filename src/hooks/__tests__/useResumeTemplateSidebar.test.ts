import { renderHook } from "@testing-library/react";

import { TEMPLATES } from "@/lib/constants/templates";
import { resume, resumeWithoutSections } from "@/mocks/resume";
import isPresent from "@/utils/isPresent";
import getSectionTitle from "@/utils/getSectionTitle";

import useResumeTemplateSidebar from "../useResumeTemplateSidebar";

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string, values?: { number?: number }) =>
    values?.number ? `${key}-${values.number}` : key,
}));

jest.mock("@/utils/isPresent");
jest.mock("@/utils/getSectionTitle");

const mockedIsPresent = jest.mocked(isPresent);
const mockedGetSectionTitle = jest.mocked(getSectionTitle);

describe("useResumeTemplateSidebar", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockedIsPresent.mockReturnValue(true);
    mockedGetSectionTitle.mockImplementation(
      ({ defaultTitle }) => defaultTitle,
    );
  });

  it("returns translated section titles", () => {
    const { result } = renderHook(() =>
      useResumeTemplateSidebar({
        template: TEMPLATES.edinburgh,
        templateLocale: "en",
        resume,
      }),
    );

    expect(result.current.personalPhoto).toBe(
      "photoUrl",
    );

    expect(result.current.personalPhotoAlt).toBe(
      "personalPhoto.alt.en",
    );

    expect(result.current.personalInfoTitle).toBe(
      "personalData.title.en",
    );

    expect(result.current.personalHobbiesTitle).toBe(
      "personalHobbies.title.en",
    );

    expect(result.current.personalLanguagesTitle).toBe(
      "personalLanguages.title.en",
    );

    expect(result.current.personalSkillsTitle).toBe(
      "personalSkills.title.en",
    );

    expect(result.current.personalToolsTitle).toBe(
      "personalTools.title.en",
    );
  });

  it("returns true for sections that are present and template is edinburgh or modern", () => {
    const { result } = renderHook(() =>
      useResumeTemplateSidebar({
        template: TEMPLATES.edinburgh,
        templateLocale: "en",
        resume,
      }),
    );

    expect(result.current.isPersonalPhoto).toBe(true);
    expect(result.current.isPersonalFullName).toBe(true);
    expect(result.current.isPersonalInfo).toBe(true);
    expect(result.current.isPersonalHobbies).toBe(true);
    expect(result.current.isPersonalLanguages).toBe(true);
    expect(result.current.isPersonalSkills).toBe(true);
    expect(result.current.isPersonalTools).toBe(true);
  });

  it("returns true for sections that are present and template is not edinburgh or modern", () => {
    const { result } = renderHook(() =>
      useResumeTemplateSidebar({
        template: TEMPLATES.standford,
        templateLocale: "en",
        resume,
      }),
    );

    expect(result.current.isPersonalPhoto).toBe(true);
    expect(result.current.isPersonalFullName).toBe(false);
    expect(result.current.isPersonalInfo).toBe(true);
    expect(result.current.isPersonalHobbies).toBe(true);
    expect(result.current.isPersonalLanguages).toBe(true);
    expect(result.current.isPersonalSkills).toBe(false);
    expect(result.current.isPersonalTools).toBe(false);
  });

  it("returns false for sections that are not present", () => {
    mockedIsPresent.mockReturnValue(false);

    const { result } = renderHook(() =>
      useResumeTemplateSidebar({
        template: TEMPLATES.edinburgh,
        templateLocale: "en",
        resume: resumeWithoutSections,
      }),
    );

    expect(result.current.isPersonalPhoto).toBe(false);
    expect(result.current.isPersonalFullName).toBe(false);
    expect(result.current.isPersonalInfo).toBe(false);
    expect(result.current.isPersonalHobbies).toBe(false);
    expect(result.current.isPersonalLanguages).toBe(false);
    expect(result.current.isPersonalSkills).toBe(false);
    expect(result.current.isPersonalTools).toBe(false);
  });
});
