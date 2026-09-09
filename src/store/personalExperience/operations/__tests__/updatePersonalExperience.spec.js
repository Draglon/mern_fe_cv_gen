import axios from "@/lib/axios";
import { personalExperienceRoute } from "@/lib/apiRoutes";
import { personalExperiencesIdSelector } from "@/store/auth/selectors";

import updatePersonalExperienceOperation from "../updatePersonalExperience";

jest.mock("@/lib/axios");
jest.mock("@/store/auth/selectors");

const mockedAxios = jest.mocked(axios);
const mockedPersonalExperiencesIdSelector = jest.mocked(personalExperiencesIdSelector);

describe("updatePersonalExperienceOperation", () => {
  const personalEducationId = "personalEducationId-123";
  const locale = "en";
  const resumeLocale = "en";

  const params = {
    values: {
      sectionTitle: "Title",
      recentPositionsCount: 2,
      experiences: [
        {
          position: "Developer",
          companyName: "Luxsoft",
          location: "Dnipro",
          employmentType: "internship",
          workFormat: "office",
          startDate: "2024-01-20",
          endDate: "",
          isCurrent: true,
          description: "Description",
          skills: ["skill 1", "skill 2"],
        }
      ],
    },
    locale,
    resumeLocale,
  };

  const formattedParams = {
    ...params.values,
    locale,
    resumeLocale
  };

  const responseData = {
    sectionTitle: {
      en: params.values.sectionTitle,
      ua: "",
      ru: "",
    },
    recentPositionsCount: {
      en: params.values.recentPositionsCount,
      ua: 0,
      ru: 0,
    },
    education: {
      en: params.values.experiences,
      ua: [],
      ru: [],
    }
  };

  const dispatch = jest.fn();
  const getState = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    mockedPersonalExperiencesIdSelector.mockReturnValue(personalEducationId);
    getState.mockReturnValue({});
  });

  it("should update personal experience successfully", async () => {
    mockedAxios.put.mockResolvedValue({ data: responseData });

    const result = await updatePersonalExperienceOperation(params)(
      dispatch,
      getState,
      undefined,
    );

    expect(mockedPersonalExperiencesIdSelector).toHaveBeenCalledWith({});
    expect(mockedAxios.put).toHaveBeenCalledWith(personalExperienceRoute(personalEducationId), formattedParams);
    expect(result.type).toBe(updatePersonalExperienceOperation.fulfilled.type);
    expect(result.payload).toEqual(responseData);
  });

  it("should reject with error", async () => {
    const error = new Error("Update personal experience failed");

    mockedAxios.put.mockRejectedValue(error);

    const result = await updatePersonalExperienceOperation(params)(
      dispatch,
      getState,
      undefined,
    );

    expect(mockedPersonalExperiencesIdSelector).toHaveBeenCalledWith({});
    expect(mockedAxios.put).toHaveBeenCalledWith(personalExperienceRoute(personalEducationId), formattedParams);
    expect(result.type).toBe(updatePersonalExperienceOperation.rejected.type);
    expect(result.payload).toBe(error);
  });
});
