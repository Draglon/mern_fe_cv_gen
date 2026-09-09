import axios from "@/lib/axios";
import { personalExperienceRoute } from "@/lib/apiRoutes";
import { personalExperiencesIdSelector } from "@/store/auth/selectors";

import fetchPersonalExperienceOperation from "../fetchPersonalExperience";

jest.mock("@/lib/axios");
jest.mock("@/store/auth/selectors");

const mockedAxios = jest.mocked(axios);
const mockedPersonalExperiencesIdSelector = jest.mocked(personalExperiencesIdSelector);

describe("fetchPersonalExperienceOperation", () => {
  const personalExperiencesId = "personalExperiencesId-123";

  const responseData = {
    sectionTitle: {
      en: "Title",
      ua: "",
      ru: "",
    },
    recentPositionsCount: {
      en: 2,
      ua: 0,
      ru: 0,
    },
    experiences: {
      en: [
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
      ua: [],
      ru: [],
    }
  };

  const dispatch = jest.fn();
  const getState = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    mockedPersonalExperiencesIdSelector.mockReturnValue(personalExperiencesId);
    getState.mockReturnValue({});
  });

  it("should fetch personal experience successfully", async () => {
    mockedAxios.get.mockResolvedValue({ data: responseData });

    const result = await fetchPersonalExperienceOperation()(
      dispatch,
      getState,
      undefined,
    );

    expect(mockedPersonalExperiencesIdSelector).toHaveBeenCalledWith({});
    expect(mockedAxios.get).toHaveBeenCalledWith(personalExperienceRoute(personalExperiencesId));
    expect(result.type).toBe(fetchPersonalExperienceOperation.fulfilled.type);
    expect(result.payload).toEqual(responseData);
  });

  it("should reject with error", async () => {
    const error = new Error("Fetch personal experience failed");

    mockedAxios.get.mockRejectedValue(error);

    const result = await fetchPersonalExperienceOperation()(
      dispatch,
      getState,
      undefined,
    );

    expect(mockedPersonalExperiencesIdSelector).toHaveBeenCalledWith({});
    expect(mockedAxios.get).toHaveBeenCalledWith(personalExperienceRoute(personalExperiencesId));
    expect(result.type).toBe(fetchPersonalExperienceOperation.rejected.type);
    expect(result.payload).toBe(error);
  });
});
