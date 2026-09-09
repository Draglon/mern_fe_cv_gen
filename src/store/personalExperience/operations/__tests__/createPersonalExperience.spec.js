import axios from "@/lib/axios";
import { personalExperienceCreateRoute } from "@/lib/apiRoutes";
import { userIdSelector } from "@/store/auth/selectors";

import createPersonalExperienceOperation from "../createPersonalExperience";

jest.mock("@/lib/axios");
jest.mock("@/store/auth/selectors");

const mockedAxios = jest.mocked(axios);
const mockedUserIdSelector = jest.mocked(userIdSelector);

describe("createPersonalExperienceOperation", () => {
  const userId = "user-123";
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
    resumeLocale,
    userId
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

    mockedUserIdSelector.mockReturnValue(userId);
    getState.mockReturnValue({});
  });

  it("should create personal experience successfully", async () => {
    mockedAxios.post.mockResolvedValue({ data: responseData });

    const result = await createPersonalExperienceOperation(params)(
      dispatch,
      getState,
      undefined,
    );

    expect(mockedAxios.post).toHaveBeenCalledWith(personalExperienceCreateRoute, formattedParams);
    expect(result.type).toBe(createPersonalExperienceOperation.fulfilled.type);
    expect(result.payload).toEqual(responseData);
  });

  it("should reject with error", async () => {
    const error = new Error("Create personal experience failed");

    mockedAxios.post.mockRejectedValue(error);

    const result = await createPersonalExperienceOperation(params)(
      dispatch,
      getState,
      undefined,
    );

    expect(mockedAxios.post).toHaveBeenCalledWith(personalExperienceCreateRoute, formattedParams);
    expect(result.type).toBe(createPersonalExperienceOperation.rejected.type);
    expect(result.payload).toBe(error);
  });
});
