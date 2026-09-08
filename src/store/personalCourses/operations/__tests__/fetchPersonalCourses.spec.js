import axios from "@/lib/axios";
import { personalCoursesRoute } from "@/lib/apiRoutes";
import { personalCoursesIdSelector } from "@/store/auth/selectors";

import fetchPersonalCoursesOperation from "../fetchPersonalCourses";

jest.mock("@/lib/axios");
jest.mock("@/store/auth/selectors");

const mockedAxios = jest.mocked(axios);
const mockedPersonalCoursesIdSelector = jest.mocked(personalCoursesIdSelector);

describe("fetchPersonalCoursesOperation", () => {
  const personalCoursesId = "personalCoursesId-123";

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

  it("should fetch personal courses successfully", async () => {
    mockedAxios.get.mockResolvedValue({ data: responseData });

    const result = await fetchPersonalCoursesOperation()(
      dispatch,
      getState,
      undefined,
    );

    expect(mockedPersonalCoursesIdSelector).toHaveBeenCalledWith({});
    expect(mockedAxios.get).toHaveBeenCalledWith(personalCoursesRoute(personalCoursesId));
    expect(result.type).toBe(fetchPersonalCoursesOperation.fulfilled.type);
    expect(result.payload).toEqual(responseData);
  });

  it("should reject with error", async () => {
    const error = new Error("Fetch personal courses failed");

    mockedAxios.get.mockRejectedValue(error);

    const result = await fetchPersonalCoursesOperation()(
      dispatch,
      getState,
      undefined,
    );

    expect(mockedPersonalCoursesIdSelector).toHaveBeenCalledWith({});
    expect(mockedAxios.get).toHaveBeenCalledWith(personalCoursesRoute(personalCoursesId));
    expect(result.type).toBe(fetchPersonalCoursesOperation.rejected.type);
    expect(result.payload).toBe(error);
  });
});
