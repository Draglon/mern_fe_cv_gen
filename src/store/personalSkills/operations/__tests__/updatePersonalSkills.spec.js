import axios from "@/lib/axios";
import { personalSkillsRoute } from "@/lib/apiRoutes";
import { personalSkillsIdSelector } from "@/store/auth/selectors";

import updatePersonalSkillsOperation from "../updatePersonalSkills";

jest.mock("@/lib/axios");
jest.mock("@/store/auth/selectors");

const mockedAxios = jest.mocked(axios);
const mockedPersonalSkillsIdSelector = jest.mocked(personalSkillsIdSelector);

describe("updatePersonalSkillsOperation", () => {
  const personalSkillsId = "personalSkillsId-123";
  const locale = "en";
  const resumeLocale = "en";

  const params = {
    values: {
      sectionTitle: "Title",
      skills: [{
        skill: "skill 1",
        level: 100,
        visible: true,
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
    skills: {
      en: params.values.skills,
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

  it("should update personal skills successfully", async () => {
    mockedAxios.put.mockResolvedValue({ data: responseData });

    const result = await updatePersonalSkillsOperation(params)(
      dispatch,
      getState,
      undefined,
    );

    expect(mockedPersonalSkillsIdSelector).toHaveBeenCalledWith({});
    expect(mockedAxios.put).toHaveBeenCalledWith(personalSkillsRoute(personalSkillsId), formattedParams);
    expect(result.type).toBe(updatePersonalSkillsOperation.fulfilled.type);
    expect(result.payload).toEqual(responseData);
  });

  it("should reject with error", async () => {
    const error = new Error("Update personal skills failed");

    mockedAxios.put.mockRejectedValue(error);

    const result = await updatePersonalSkillsOperation(params)(
      dispatch,
      getState,
      undefined,
    );

    expect(mockedPersonalSkillsIdSelector).toHaveBeenCalledWith({});
    expect(mockedAxios.put).toHaveBeenCalledWith(personalSkillsRoute(personalSkillsId), formattedParams);
    expect(result.type).toBe(updatePersonalSkillsOperation.rejected.type);
    expect(result.payload).toBe(error);
  });
});
