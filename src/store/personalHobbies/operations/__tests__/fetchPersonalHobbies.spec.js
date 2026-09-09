import axios from "@/lib/axios";
import { personalHobbiesRoute } from "@/lib/apiRoutes";
import { personalHobbiesIdSelector } from "@/store/auth/selectors";

import fetchPersonalHobbiesOperation from "../fetchPersonalHobbies";

jest.mock("@/lib/axios");
jest.mock("@/store/auth/selectors");

const mockedAxios = jest.mocked(axios);
const mockedPersonalHobbiesIdSelector = jest.mocked(personalHobbiesIdSelector);

describe("fetchPersonalHobbiesOperation", () => {
  const personalHobbiesId = "personalHobbiesId-123";

  const responseData = {
    sectionTitle: {
      en: "Title",
      ua: "",
      ru: "",
    },
    hobbies: {
      en: [{ hobby: "hobby 1" }, { hobby: "hobby 2" }],
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

  it("should fetch personal hobbies successfully", async () => {
    mockedAxios.get.mockResolvedValue({ data: responseData });

    const result = await fetchPersonalHobbiesOperation()(
      dispatch,
      getState,
      undefined,
    );

    expect(mockedPersonalHobbiesIdSelector).toHaveBeenCalledWith({});
    expect(mockedAxios.get).toHaveBeenCalledWith(personalHobbiesRoute(personalHobbiesId));
    expect(result.type).toBe(fetchPersonalHobbiesOperation.fulfilled.type);
    expect(result.payload).toEqual(responseData);
  });

  it("should reject with error", async () => {
    const error = new Error("Fetch personal hobbies failed");

    mockedAxios.get.mockRejectedValue(error);

    const result = await fetchPersonalHobbiesOperation()(
      dispatch,
      getState,
      undefined,
    );

    expect(mockedPersonalHobbiesIdSelector).toHaveBeenCalledWith({});
    expect(mockedAxios.get).toHaveBeenCalledWith(personalHobbiesRoute(personalHobbiesId));
    expect(result.type).toBe(fetchPersonalHobbiesOperation.rejected.type);
    expect(result.payload).toBe(error);
  });
});
