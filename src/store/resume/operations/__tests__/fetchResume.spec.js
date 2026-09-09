import axios from "@/lib/axios";
import { resumeRoute } from "@/lib/apiRoutes";
import { resume } from "@/mocks/resume";

import fetchResumeOperation from "../fetchResume";

jest.mock("@/lib/axios");
jest.mock("@/store/auth/selectors");

const mockedAxios = jest.mocked(axios);

describe("fetchResumeOperation", () => {
  const params = {
    userId: "user-123",
  }

  const dispatch = jest.fn();
  const getState = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    getState.mockReturnValue({});
  });

  it("should fetch resume successfully", async () => {
    mockedAxios.get.mockResolvedValue({ data: resume });

    const result = await fetchResumeOperation(params)(
      dispatch,
      getState,
      undefined,
    );

    expect(mockedAxios.get).toHaveBeenCalledWith(resumeRoute(params.userId));
    expect(result.type).toBe(fetchResumeOperation.fulfilled.type);
    expect(result.payload).toEqual(resume);
  });

  it("should reject with error", async () => {
    const error = new Error("Fetch resume failed");

    mockedAxios.get.mockRejectedValue(error);

    const result = await fetchResumeOperation(params)(
      dispatch,
      getState,
      undefined,
    );

    expect(mockedAxios.get).toHaveBeenCalledWith(resumeRoute(params.userId));
    expect(result.type).toBe(fetchResumeOperation.rejected.type);
    expect(result.payload).toBe(error);
  });
});
