import axios from "@/lib/axios";
import { personalInfoRoute } from "@/lib/apiRoutes";
import { resume } from "@/mocks/resume";
import { personalInfoIdSelector } from "@/store/auth/selectors";

import fetchPersonalInfoOperation from "../fetchPersonalInfo";

jest.mock("@/lib/axios");
jest.mock("@/store/auth/selectors");

const mockedAxios = jest.mocked(axios);
const mockedPersonalInfoIdSelector = jest.mocked(personalInfoIdSelector);

describe("fetchPersonalInfoOperation", () => {
  const personalInfoId = "personalInfoId-123";
  const responseData = resume.personalInfo;

  const dispatch = jest.fn();
  const getState = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    mockedPersonalInfoIdSelector.mockReturnValue(personalInfoId);
    getState.mockReturnValue({});
  });

  it("should fetch personal info successfully", async () => {
    mockedAxios.get.mockResolvedValue({ data: responseData });

    const result = await fetchPersonalInfoOperation()(
      dispatch,
      getState,
      undefined,
    );

    expect(mockedPersonalInfoIdSelector).toHaveBeenCalledWith({});
    expect(mockedAxios.get).toHaveBeenCalledWith(personalInfoRoute(personalInfoId));
    expect(result.type).toBe(fetchPersonalInfoOperation.fulfilled.type);
    expect(result.payload).toEqual(responseData);
  });

  it("should reject with error", async () => {
    const error = new Error("Fetch personal info failed");

    mockedAxios.get.mockRejectedValue(error);

    const result = await fetchPersonalInfoOperation()(
      dispatch,
      getState,
      undefined,
    );

    expect(mockedPersonalInfoIdSelector).toHaveBeenCalledWith({});
    expect(mockedAxios.get).toHaveBeenCalledWith(personalInfoRoute(personalInfoId));
    expect(result.type).toBe(fetchPersonalInfoOperation.rejected.type);
    expect(result.payload).toBe(error);
  });
});
