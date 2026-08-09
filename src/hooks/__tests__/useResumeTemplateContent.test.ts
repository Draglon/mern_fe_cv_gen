import { renderHook } from "@testing-library/react";

import { TEMPLATES } from "@/lib/constants/templates";
import { resume, resumeWithoutSections } from "@/mocks/resume";
import isPresent from "@/utils/isPresent";
import getSectionTitle from "@/utils/getSectionTitle";
import { experienceByLocale } from "@/utils/personalExperience";

import useResumeTemplateContent from "../useResumeTemplateContent";

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string, values?: { number?: number }) =>
    values?.number ? `${key}-${values.number}` : key,
}));

jest.mock("@/utils/isPresent");
jest.mock("@/utils/getSectionTitle");
jest.mock("@/utils/personalExperience");

const mockedIsPresent = jest.mocked(isPresent);
const mockedGetSectionTitle = jest.mocked(getSectionTitle);
const mockedExperienceByLocale = jest.mocked(experienceByLocale);

describe("useResumeTemplateContent", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockedIsPresent.mockReturnValue(true);

    mockedExperienceByLocale.mockReturnValue([
      { position: "Developer" },
      { position: "Senior Developer" },
      { position: "Lead Developer" },
    ] as any);

    mockedGetSectionTitle.mockImplementation(
      ({ defaultTitle }) => defaultTitle,
    );
  });

  it("returns translated section titles", () => {
    const { result } = renderHook(() =>
      useResumeTemplateContent({
        template: TEMPLATES.edinburgh,
        templateLocale: "en",
        resume,
      }),
    );

    expect(result.current.personalInfoTitle).toBe(
      "personalInfo.title.en",
    );

    expect(result.current.personalExperienceTitle).toBe(
      "personalExperience.title.en",
    );

    expect(result.current.personalEducationTitle).toBe(
      "personalEducation.title.en",
    );

    expect(result.current.personalCoursesTitle).toBe(
      "personalCourses.title.en",
    );

    expect(result.current.personalSkillsTitle).toBe(
      "personalSkills.title.en",
    );

    expect(result.current.personalToolsTitle).toBe(
      "personalTools.title.en",
    );
  });

  it("returns experiences for the selected locale", () => {
    renderHook(() =>
      useResumeTemplateContent({
        template: TEMPLATES.edinburgh,
        templateLocale: "en",
        resume,
      }),
    );

    expect(mockedExperienceByLocale).toHaveBeenCalledWith(
      resume.personalExperience,
      "en",
    );
  });

  it("limits formatted experience by recentPositionsCount", () => {
    const { result } = renderHook(() =>
      useResumeTemplateContent({
        template: TEMPLATES.edinburgh,
        templateLocale: "en",
        resume,
      }),
    );

    expect(result.current.formattedExperience).toEqual([
      { position: "Developer" },
      { position: "Senior Developer" },
    ]);
  });

  it("uses all experiences when recentPositionsCount is not provided", () => {
    const resumeWithoutRecentPositions = {
      ...resume,
      personalExperience: {
        ...resume.personalExperience,
        recentPositionsCount: undefined,
      },
    };

    const { result } = renderHook(() =>
      useResumeTemplateContent({
        template: TEMPLATES.edinburgh,
        templateLocale: "en",
        resume: resumeWithoutRecentPositions,
      }),
    );

    expect(result.current.formattedExperience).toEqual([
      { position: "Developer" },
      { position: "Senior Developer" },
      { position: "Lead Developer" },
    ]);
  });

  it("returns personalExperienceText when recentPositionsCount exists", () => {
    const { result } = renderHook(() =>
      useResumeTemplateContent({
        template: TEMPLATES.edinburgh,
        templateLocale: "en",
        resume,
      }),
    );

    expect(result.current.personalExperienceText).toBe(
      "personalExperience.text.en-2",
    );
  });

  it("returns undefined personalExperienceText when recentPositionsCount does not exist", () => {
    const resumeWithoutRecentPositions = {
      ...resume,
      personalExperience: {
        ...resume.personalExperience,
        recentPositionsCount: undefined,
      },
    };

    const { result } = renderHook(() =>
      useResumeTemplateContent({
        template: TEMPLATES.edinburgh,
        templateLocale: "en",
        resume: resumeWithoutRecentPositions,
      }),
    );

    expect(result.current.personalExperienceText).toBeUndefined();
  });

  it("gets custom section titles using getSectionTitle", () => {
    mockedGetSectionTitle.mockImplementation(
      ({ defaultTitle }) => `Custom ${defaultTitle}`,
    );

    const { result } = renderHook(() =>
      useResumeTemplateContent({
        template: TEMPLATES.edinburgh,
        templateLocale: "en",
        resume,
      }),
    );

    expect(result.current.personalExperienceTitle).toBe(
      "Custom personalExperience.title.en",
    );

    expect(result.current.personalEducationTitle).toBe(
      "Custom personalEducation.title.en",
    );

    expect(result.current.personalCoursesTitle).toBe(
      "Custom personalCourses.title.en",
    );

    expect(result.current.personalSkillsTitle).toBe(
      "Custom personalSkills.title.en",
    );

    expect(result.current.personalToolsTitle).toBe(
      "Custom personalTools.title.en",
    );
  });

  it("returns section presence flags", () => {
    const { result } = renderHook(() =>
      useResumeTemplateContent({
        template: TEMPLATES.standford,
        templateLocale: "en",
        resume,
      }),
    );

    expect(result.current.isPersonalInfo).toBe(true);
    expect(result.current.isPersonalExperience).toBe(true);
    expect(result.current.isPersonalEducation).toBe(true);
    expect(result.current.isPersonalCourses).toBe(true);
    expect(result.current.isPersonalSkills).toBe(true);
    expect(result.current.isPersonalTools).toBe(true);
  });

  it.each([TEMPLATES.edinburgh, TEMPLATES.modern])(
    "hides skills and tools for %s template",
    (template) => {
      const { result } = renderHook(() =>
        useResumeTemplateContent({
          template,
          templateLocale: "en",
          resume,
        }),
      );

      expect(result.current.isPersonalSkills).toBe(false);
      expect(result.current.isPersonalTools).toBe(false);
    },
  );

  it("keeps skills and tools visible for other templates", () => {
    const { result } = renderHook(() =>
      useResumeTemplateContent({
        template: TEMPLATES.edinburgh,
        templateLocale: "en",
        resume,
      }),
    );

    expect(result.current.isPersonalSkills).toBe(false);
    expect(result.current.isPersonalTools).toBe(false);
  });

  it("returns false for sections that are not present", () => {
    mockedIsPresent.mockReturnValue(false);

    const { result } = renderHook(() =>
      useResumeTemplateContent({
        template: TEMPLATES.edinburgh,
        templateLocale: "en",
        resume: resumeWithoutSections,
      }),
    );

    expect(result.current.isPersonalInfo).toBe(false);
    expect(result.current.isPersonalExperience).toBe(false);
    expect(result.current.isPersonalEducation).toBe(false);
    expect(result.current.isPersonalCourses).toBe(false);
    expect(result.current.isPersonalSkills).toBe(false);
    expect(result.current.isPersonalTools).toBe(false);
  });
});
