import axios from "@/lib/axios";
import { personalLanguagesRoute } from "@/lib/apiRoutes";
import { personalLanguagesIdSelector } from "@/store/auth/selectors";

import updatePersonalLanguagesOperation from "../updatePersonalLanguages";

jest.mock("@/lib/axios");
jest.mock("@/store/auth/selectors");

const mockedAxios = jest.mocked(axios);
const mockedPersonalLanguagesIdSelector = jest.mocked(personalLanguagesIdSelector);

describe("updatePersonalLanguagesOperation", () => {
  const personalLanguagesId = "personalLanguagesId-123";
  const locale = "en";
  const resumeLocale = "en";

  const params = {
    values: {
      sectionTitle: "Title",
      languages: [{
        language: "English",
        level: "native",
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
    languages: {
      en: params.values.languages,
      ua: [],
      ru: [],
    }
  };

  const dispatch = jest.fn();
  const getState = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    mockedPersonalLanguagesIdSelector.mockReturnValue(personalLanguagesId);
    getState.mockReturnValue({});
  });

  it("should update personal languages successfully", async () => {
    mockedAxios.put.mockResolvedValue({ data: responseData });

    const result = await updatePersonalLanguagesOperation(params)(
      dispatch,
      getState,
      undefined,
    );

    expect(mockedPersonalLanguagesIdSelector).toHaveBeenCalledWith({});
    expect(mockedAxios.put).toHaveBeenCalledWith(personalLanguagesRoute(personalLanguagesId), formattedParams);
    expect(result.type).toBe(updatePersonalLanguagesOperation.fulfilled.type);
    expect(result.payload).toEqual(responseData);
  });

  it("should reject with error", async () => {
    const error = new Error("Update personal languages failed");

    mockedAxios.put.mockRejectedValue(error);

    const result = await updatePersonalLanguagesOperation(params)(
      dispatch,
      getState,
      undefined,
    );

    expect(mockedPersonalLanguagesIdSelector).toHaveBeenCalledWith({});
    expect(mockedAxios.put).toHaveBeenCalledWith(personalLanguagesRoute(personalLanguagesId), formattedParams);
    expect(result.type).toBe(updatePersonalLanguagesOperation.rejected.type);
    expect(result.payload).toBe(error);
  });
});
