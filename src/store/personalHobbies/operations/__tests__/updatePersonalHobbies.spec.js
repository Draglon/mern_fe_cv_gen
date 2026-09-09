import axios from "@/lib/axios";
import { personalHobbiesRoute } from "@/lib/apiRoutes";
import { personalHobbiesIdSelector } from "@/store/auth/selectors";

import updatePersonalHobbiesOperation from "../updatePersonalHobbies";

jest.mock("@/lib/axios");
jest.mock("@/store/auth/selectors");

const mockedAxios = jest.mocked(axios);
const mockedPersonalHobbiesIdSelector = jest.mocked(personalHobbiesIdSelector);

describe("updatePersonalHobbiesOperation", () => {
  const personalHobbiesId = "personalHobbiesId-123";
  const locale = "en";
  const resumeLocale = "en";

  const params = {
    values: {
      sectionTitle: "Title",
      hobbies: [{ hobby: "hobby 1" }, { hobby: "hobby 2" }],
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
    hobbies: {
      en: params.values.hobbies,
      ua: [],
      ru: [],
    }
  };

  const dispatch = jest.fn();
  const getState = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    mockedPersonalHobbiesIdSelector.mockReturnValue(personalHobbiesId);
    getState.mockReturnValue({});
  });

  it("should update personal hobbies successfully", async () => {
    mockedAxios.put.mockResolvedValue({ data: responseData });

    const result = await updatePersonalHobbiesOperation(params)(
      dispatch,
      getState,
      undefined,
    );

    expect(mockedPersonalHobbiesIdSelector).toHaveBeenCalledWith({});
    expect(mockedAxios.put).toHaveBeenCalledWith(personalHobbiesRoute(personalHobbiesId), formattedParams);
    expect(result.type).toBe(updatePersonalHobbiesOperation.fulfilled.type);
    expect(result.payload).toEqual(responseData);
  });

  it("should reject with error", async () => {
    const error = new Error("Update personal hobbies failed");

    mockedAxios.put.mockRejectedValue(error);

    const result = await updatePersonalHobbiesOperation(params)(
      dispatch,
      getState,
      undefined,
    );

    expect(mockedPersonalHobbiesIdSelector).toHaveBeenCalledWith({});
    expect(mockedAxios.put).toHaveBeenCalledWith(personalHobbiesRoute(personalHobbiesId), formattedParams);
    expect(result.type).toBe(updatePersonalHobbiesOperation.rejected.type);
    expect(result.payload).toBe(error);
  });
});
