import axios from "@/lib/axios";
import { personalLanguagesRoute } from "@/lib/apiRoutes";
import { personalLanguagesIdSelector } from "@/store/auth/selectors";

import fetchPersonalLanguagesOperation from "../fetchPersonalLanguages";

jest.mock("@/lib/axios");
jest.mock("@/store/auth/selectors");

const mockedAxios = jest.mocked(axios);
const mockedPersonalLanguagesIdSelector = jest.mocked(personalLanguagesIdSelector);

describe("fetchPersonalLanguagesOperation", () => {
  const personalLanguagesId = "personalLanguagesId-123";

  const responseData = {
    sectionTitle: {
      en: "Title",
      ua: "",
      ru: "",
    },
    languages: {
      en: [{
        language: "English",
        level: "native",
      }],
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

  it("should fetch personal languages successfully", async () => {
    mockedAxios.get.mockResolvedValue({ data: responseData });

    const result = await fetchPersonalLanguagesOperation()(
      dispatch,
      getState,
      undefined,
    );

    expect(mockedPersonalLanguagesIdSelector).toHaveBeenCalledWith({});
    expect(mockedAxios.get).toHaveBeenCalledWith(personalLanguagesRoute(personalLanguagesId));
    expect(result.type).toBe(fetchPersonalLanguagesOperation.fulfilled.type);
    expect(result.payload).toEqual(responseData);
  });

  it("should reject with error", async () => {
    const error = new Error("Fetch personal languages failed");

    mockedAxios.get.mockRejectedValue(error);

    const result = await fetchPersonalLanguagesOperation()(
      dispatch,
      getState,
      undefined,
    );

    expect(mockedPersonalLanguagesIdSelector).toHaveBeenCalledWith({});
    expect(mockedAxios.get).toHaveBeenCalledWith(personalLanguagesRoute(personalLanguagesId));
    expect(result.type).toBe(fetchPersonalLanguagesOperation.rejected.type);
    expect(result.payload).toBe(error);
  });
});
