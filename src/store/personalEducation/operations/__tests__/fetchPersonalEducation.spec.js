import axios from "@/lib/axios";
import { personalEducationRoute } from "@/lib/apiRoutes";
import { personalEducationIdSelector } from "@/store/auth/selectors";

import fetchPersonalEducationOperation from "../fetchPersonalEducation";

jest.mock("@/lib/axios");
jest.mock("@/store/auth/selectors");

const mockedAxios = jest.mocked(axios);
const mockedPersonalEducationIdSelector = jest.mocked(personalEducationIdSelector);

describe("fetchPersonalEducationOperation", () => {
  const personalEducationId = "personalEducationId-123";

  const responseData = {
    sectionTitle: {
      en: "Title",
      ua: "",
      ru: "",
    },
    education: {
      en: [{
        institute: "Institute",
        degree: "Degree",
        faculty: "Faculty",
        specialization: "Specialization",
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

    mockedPersonalEducationIdSelector.mockReturnValue(personalEducationId);
    getState.mockReturnValue({});
  });

  it("should fetch personal education successfully", async () => {
    mockedAxios.get.mockResolvedValue({ data: responseData });

    const result = await fetchPersonalEducationOperation()(
      dispatch,
      getState,
      undefined,
    );

    expect(mockedPersonalEducationIdSelector).toHaveBeenCalledWith({});
    expect(mockedAxios.get).toHaveBeenCalledWith(personalEducationRoute(personalEducationId));
    expect(result.type).toBe(fetchPersonalEducationOperation.fulfilled.type);
    expect(result.payload).toEqual(responseData);
  });

  it("should reject with error", async () => {
    const error = new Error("Fetch personal education failed");

    mockedAxios.get.mockRejectedValue(error);

    const result = await fetchPersonalEducationOperation()(
      dispatch,
      getState,
      undefined,
    );

    expect(mockedPersonalEducationIdSelector).toHaveBeenCalledWith({});
    expect(mockedAxios.get).toHaveBeenCalledWith(personalEducationRoute(personalEducationId));
    expect(result.type).toBe(fetchPersonalEducationOperation.rejected.type);
    expect(result.payload).toBe(error);
  });
});
