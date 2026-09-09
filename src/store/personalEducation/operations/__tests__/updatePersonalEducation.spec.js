import axios from "@/lib/axios";
import { personalEducationRoute } from "@/lib/apiRoutes";
import { personalEducationIdSelector } from "@/store/auth/selectors";

import updatePersonalEducationOperation from "../updatePersonalEducation";

jest.mock("@/lib/axios");
jest.mock("@/store/auth/selectors");

const mockedAxios = jest.mocked(axios);
const mockedPersonalEducationIdSelector = jest.mocked(personalEducationIdSelector);

describe("updatePersonalEducationOperation", () => {
  const personalEducationId = "personalEducationId-123";
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
    resumeLocale
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

    mockedPersonalEducationIdSelector.mockReturnValue(personalEducationId);
    getState.mockReturnValue({});
  });

  it("should update personal education successfully", async () => {
    mockedAxios.put.mockResolvedValue({ data: responseData });

    const result = await updatePersonalEducationOperation(params)(
      dispatch,
      getState,
      undefined,
    );

    expect(mockedPersonalEducationIdSelector).toHaveBeenCalledWith({});
    expect(mockedAxios.put).toHaveBeenCalledWith(personalEducationRoute(personalEducationId), formattedParams);
    expect(result.type).toBe(updatePersonalEducationOperation.fulfilled.type);
    expect(result.payload).toEqual(responseData);
  });

  it("should reject with error", async () => {
    const error = new Error("Update personal education failed");

    mockedAxios.put.mockRejectedValue(error);

    const result = await updatePersonalEducationOperation(params)(
      dispatch,
      getState,
      undefined,
    );

    expect(mockedPersonalEducationIdSelector).toHaveBeenCalledWith({});
    expect(mockedAxios.put).toHaveBeenCalledWith(personalEducationRoute(personalEducationId), formattedParams);
    expect(result.type).toBe(updatePersonalEducationOperation.rejected.type);
    expect(result.payload).toBe(error);
  });
});
