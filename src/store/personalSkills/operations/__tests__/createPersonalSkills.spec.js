import axios from "@/lib/axios";
import { personalSkillsCreateRoute } from "@/lib/apiRoutes";
import { userIdSelector } from "@/store/auth/selectors";

import createPersonalSkillsOperation from "../createPersonalSkills";

jest.mock("@/lib/axios");
jest.mock("@/store/auth/selectors");

const mockedAxios = jest.mocked(axios);
const mockedUserIdSelector = jest.mocked(userIdSelector);

describe("createPersonalSkillsOperation", () => {
  const userId = "user-123";
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
    resumeLocale,
    userId
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

    mockedUserIdSelector.mockReturnValue(userId);
    getState.mockReturnValue({});
  });

  it("should create personal skills successfully", async () => {
    mockedAxios.post.mockResolvedValue({ data: responseData });

    const result = await createPersonalSkillsOperation(params)(
      dispatch,
      getState,
      undefined,
    );

    expect(mockedAxios.post).toHaveBeenCalledWith(personalSkillsCreateRoute, formattedParams);
    expect(result.type).toBe(createPersonalSkillsOperation.fulfilled.type);
    expect(result.payload).toEqual(responseData);
  });

  it("should reject with error", async () => {
    const error = new Error("Create personal skills failed");

    mockedAxios.post.mockRejectedValue(error);

    const result = await createPersonalSkillsOperation(params)(
      dispatch,
      getState,
      undefined,
    );

    expect(mockedAxios.post).toHaveBeenCalledWith(personalSkillsCreateRoute, formattedParams);
    expect(result.type).toBe(createPersonalSkillsOperation.rejected.type);
    expect(result.payload).toBe(error);
  });
});
