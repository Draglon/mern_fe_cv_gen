import axios from "@/lib/axios";
import { personalCoursesCreateRoute } from "@/lib/apiRoutes";
import { userIdSelector } from "@/store/auth/selectors";

import createPersonalCoursesOperation from "../createPersonalCourses";

jest.mock("@/lib/axios");
jest.mock("@/store/auth/selectors");

const mockedAxios = jest.mocked(axios);
const mockedUserIdSelector = jest.mocked(userIdSelector);

describe("createPersonalCoursesOperation", () => {
  const userId = "user-123";
  const locale = "en";
  const resumeLocale = "en";

  const params = {
    values: {
      sectionTitle: "",
      courses: [{
        course: "Course",
        description: "Description",
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
      en: "Title",
      ua: "",
      ru: "",
    },
    courses: {
      en: [{
        course: "Course",
        description: "Description",
        startDate: "2026-02-24",
        endDate: undefined,
        isCurrent: true,
      }],
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

  it("should create personal courses successfully", async () => {
    mockedAxios.post.mockResolvedValue({ data: responseData });

    const result = await createPersonalCoursesOperation(params)(
      dispatch,
      getState,
      undefined,
    );

    expect(mockedAxios.post).toHaveBeenCalledWith(personalCoursesCreateRoute, formattedParams);
    expect(result.type).toBe(createPersonalCoursesOperation.fulfilled.type);
    expect(result.payload).toEqual(responseData);
  });

  it("should reject with error", async () => {
    const error = new Error("Create personal courses failed");

    mockedAxios.post.mockRejectedValue(error);

    const result = await createPersonalCoursesOperation(params)(
      dispatch,
      getState,
      undefined,
    );

    expect(mockedAxios.post).toHaveBeenCalledWith(personalCoursesCreateRoute, formattedParams);
    expect(result.type).toBe(createPersonalCoursesOperation.rejected.type);
    expect(result.payload).toBe(error);
  });
});
