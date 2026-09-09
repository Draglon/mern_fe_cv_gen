import axios from "@/lib/axios";
import { personalEducationCreateRoute } from "@/lib/apiRoutes";
import { userIdSelector } from "@/store/auth/selectors";

import createPersonalEducationOperation from "../createPersonalEducation";

jest.mock("@/lib/axios");
jest.mock("@/store/auth/selectors");

const mockedAxios = jest.mocked(axios);
const mockedUserIdSelector = jest.mocked(userIdSelector);

describe("createPersonalEducationOperation", () => {
  const userId = "user-123";
  const locale = "en";
  const resumeLocale = "en";

  const params = {
    values: {
      sectionTitle: "Title",
      education: [{
        institute: "Institute",
        degree: "Degree",
        faculty: "Faculty",
        specialization: "Specialization",
        startDate: "2026-02-24",
        endDate: undefined,
        isCurrent: true,
      }],
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
    education: {
      en: params.values.education,
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

  it("should create personal education successfully", async () => {
    mockedAxios.post.mockResolvedValue({ data: responseData });

    const result = await createPersonalEducationOperation(params)(
      dispatch,
      getState,
      undefined,
    );

    expect(mockedAxios.post).toHaveBeenCalledWith(personalEducationCreateRoute, formattedParams);
    expect(result.type).toBe(createPersonalEducationOperation.fulfilled.type);
    expect(result.payload).toEqual(responseData);
  });

  it("should reject with error", async () => {
    const error = new Error("Create personal education failed");

    mockedAxios.post.mockRejectedValue(error);

    const result = await createPersonalEducationOperation(params)(
      dispatch,
      getState,
      undefined,
    );

    expect(mockedAxios.post).toHaveBeenCalledWith(personalEducationCreateRoute, formattedParams);
    expect(result.type).toBe(createPersonalEducationOperation.rejected.type);
    expect(result.payload).toBe(error);
  });
});
