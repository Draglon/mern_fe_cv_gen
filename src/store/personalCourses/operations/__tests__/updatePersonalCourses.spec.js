import axios from "@/lib/axios";
import { personalCoursesRoute } from "@/lib/apiRoutes";
import { personalCoursesIdSelector } from "@/store/auth/selectors";

import updatePersonalCoursesOperation from "../updatePersonalCourses";

jest.mock("@/lib/axios");
jest.mock("@/store/auth/selectors");

const mockedAxios = jest.mocked(axios);
const mockedPersonalCoursesIdSelector = jest.mocked(personalCoursesIdSelector);

describe("updatePersonalCoursesOperation", () => {
  const personalCoursesId = "personalCoursesId-123";
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
    resumeLocale
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

    mockedPersonalCoursesIdSelector.mockReturnValue(personalCoursesId);
    getState.mockReturnValue({});
  });

  it("should update personal courses successfully", async () => {
    mockedAxios.put.mockResolvedValue({ data: responseData });

    const result = await updatePersonalCoursesOperation(params)(
      dispatch,
      getState,
      undefined,
    );

    expect(mockedPersonalCoursesIdSelector).toHaveBeenCalledWith({});
    expect(mockedAxios.put).toHaveBeenCalledWith(personalCoursesRoute(personalCoursesId), formattedParams);
    expect(result.type).toBe(updatePersonalCoursesOperation.fulfilled.type);
    expect(result.payload).toEqual(responseData);
  });

  it("should reject with error", async () => {
    const error = new Error("Update personal courses failed");

    mockedAxios.put.mockRejectedValue(error);

    const result = await updatePersonalCoursesOperation(params)(
      dispatch,
      getState,
      undefined,
    );

    expect(mockedPersonalCoursesIdSelector).toHaveBeenCalledWith({});
    expect(mockedAxios.put).toHaveBeenCalledWith(personalCoursesRoute(personalCoursesId), formattedParams);
    expect(result.type).toBe(updatePersonalCoursesOperation.rejected.type);
    expect(result.payload).toBe(error);
  });
});
