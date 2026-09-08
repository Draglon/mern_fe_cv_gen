import { EXPERIENCES_DEFAULT_VALUES } from "@/lib/constants/forms/resumeEdit/experiences";
import { experienceByLocale } from "@/utils/personalExperience";
import { ExperienceType } from "@/lib/constants/props/resume/personalExperiences";

import {
  isLoadingSelector,
  personalExperienceSelector,
  personalExperienceByLocaleSelector,
} from "../selectors";
import { RootState } from "../../store";

jest.mock("@/utils/personalExperience");

const mockedExperienceByLocale = jest.mocked(experienceByLocale);

type PersonalExperienceState = Pick<RootState, "personalExperience">;

describe("personalExperience selectors", () => {
  const experiences: ExperienceType[] = [
    {
      position: "Frontend Developer",
      companyName: "Company",
      location: "Kyiv",
      employmentType: "fullTime",
      workFormat: "remote",
      startDate: "2020-01-01",
      endDate: "2024-01-01",
      isCurrent: false,
      description: "Development",
      skills: ["React", "TypeScript"],
    },
  ];

  const data = {
    sectionTitle: {
      en: "Experience",
      ua: "Досвід",
      ru: "Опыт",
    },
    recentPositionsCount: {
      en: 2,
      ua: 2,
      ru: 2,
    },
    experiences: {
      en: experiences,
      ua: [],
      ru: [],
    },
  };

  const initialState: PersonalExperienceState = {
    personalExperience: {
      data: null,
      status: undefined,
      error: null,
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("isLoadingSelector", () => {
    it("should return true when status is loading", () => {
      const state = {
        personalExperience: {
          ...initialState.personalExperience,
          status: "loading",
        },
      };

      expect(isLoadingSelector(state)).toBe(true);
    });

    it("should return false when status is not loading", () => {
      const state = {
        personalExperience: {
          ...initialState.personalExperience,
          status: "loaded",
        },
      };

      expect(isLoadingSelector(state)).toBe(false);
    });
  });

  describe("personalExperienceSelector", () => {
    it("should return personal experience data", () => {
      const state = {
        personalExperience: {
          ...initialState.personalExperience,
          data,
          status: "loaded",
        },
      };

      expect(personalExperienceSelector(state)).toEqual(data);
    });
  });

  describe("personalExperienceByLocaleSelector", () => {
    it("should return data for selected locale", () => {
      const state = {
        personalExperience: {
          ...initialState.personalExperience,
          status: "loaded",
          data,
        },
      };

      mockedExperienceByLocale.mockReturnValue(experiences);

      expect(personalExperienceByLocaleSelector(state, "en")).toEqual({
        sectionTitle: "Experience",
        recentPositionsCount: 2,
        experiences,
      });

      expect(mockedExperienceByLocale).toHaveBeenCalledWith("en", data);
    });

    it("should return default experiences when experiences are empty", () => {
      const state = {
        personalExperience: {
          ...initialState.personalExperience,
          data: {
            ...data,
            experiences: {
              ...data.experiences,
              ua: [],
            },
          },
          status: "loaded",
        },
      };

      expect(personalExperienceByLocaleSelector(state, "ua")).toEqual({
        sectionTitle: "Досвід",
        recentPositionsCount: 2,
        experiences: EXPERIENCES_DEFAULT_VALUES,
      });

      expect(mockedExperienceByLocale).not.toHaveBeenCalled();
    });

    it("should return default experiences when personal experience data is null", () => {
      expect(personalExperienceByLocaleSelector(initialState, "en")).toEqual({
        sectionTitle: "",
        recentPositionsCount: 0,
        experiences: EXPERIENCES_DEFAULT_VALUES,
      });

      expect(mockedExperienceByLocale).not.toHaveBeenCalled();
    });

    it("should return zero when recent positions count is missing", () => {
      const state = {
        personalExperience: {
          ...initialState.personalExperience,
          data: {
            ...data,
            recentPositionsCount: undefined,
          },
          status: "loaded",
        },
      };

      mockedExperienceByLocale.mockReturnValue(experiences);

      expect(personalExperienceByLocaleSelector(state, "en")).toEqual({
        sectionTitle: "Experience",
        recentPositionsCount: 0,
        experiences,
      });
    });
  });
});
