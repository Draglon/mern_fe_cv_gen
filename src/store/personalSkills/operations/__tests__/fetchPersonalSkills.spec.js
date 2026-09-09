import axios from "@/lib/axios";
import { personalSkillsRoute } from "@/lib/apiRoutes";
import { personalSkillsIdSelector } from "@/store/auth/selectors";

import fetchPersonalSkillsOperation from "../fetchPersonalSkills";

jest.mock("@/lib/axios");
jest.mock("@/store/auth/selectors");

const mockedAxios = jest.mocked(axios);
const mockedPersonalSkillsIdSelector = jest.mocked(personalSkillsIdSelector);

describe("fetchPersonalSkillsOperation", () => {
  const personalSkillsId = "personalSkillsId-123";

  const responseData = {
    sectionTitle: {
      en: "Title",
      ua: "",
      ru: "",
    },
    skills: {
      en: [{
        skill: "skill 1",
        level: 100,
        visible: true,
      }],
      ua: [],
      ru: [],
    }
  };

  const dispatch = jest.fn();
  const getState = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    mockedPersonalSkillsIdSelector.mockReturnValue(personalSkillsId);
    getState.mockReturnValue({});
  });

  it("should fetch personal skills successfully", async () => {
    mockedAxios.get.mockResolvedValue({ data: responseData });

    const result = await fetchPersonalSkillsOperation()(
      dispatch,
      getState,
      undefined,
    );

    expect(mockedPersonalSkillsIdSelector).toHaveBeenCalledWith({});
    expect(mockedAxios.get).toHaveBeenCalledWith(personalSkillsRoute(personalSkillsId));
    expect(result.type).toBe(fetchPersonalSkillsOperation.fulfilled.type);
    expect(result.payload).toEqual(responseData);
  });

  it("should reject with error", async () => {
    const error = new Error("Fetch personal skills failed");

    mockedAxios.get.mockRejectedValue(error);

    const result = await fetchPersonalSkillsOperation()(
      dispatch,
      getState,
      undefined,
    );

    expect(mockedPersonalSkillsIdSelector).toHaveBeenCalledWith({});
    expect(mockedAxios.get).toHaveBeenCalledWith(personalSkillsRoute(personalSkillsId));
    expect(result.type).toBe(fetchPersonalSkillsOperation.rejected.type);
    expect(result.payload).toBe(error);
  });
});
