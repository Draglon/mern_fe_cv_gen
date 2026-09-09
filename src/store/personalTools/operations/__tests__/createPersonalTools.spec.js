import axios from "@/lib/axios";
import { personalToolsCreateRoute } from "@/lib/apiRoutes";
import { userIdSelector } from "@/store/auth/selectors";

import createPersonalToolsOperation from "../createPersonalTools";

jest.mock("@/lib/axios");
jest.mock("@/store/auth/selectors");

const mockedAxios = jest.mocked(axios);
const mockedUserIdSelector = jest.mocked(userIdSelector);

describe("createPersonalToolsOperation", () => {
  const userId = "user-123";
  const locale = "en";
  const resumeLocale = "en";

  const params = {
    values: {
      sectionTitle: "Title",
      tools: [{
        tool: "tool 1",
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
    Tools: {
      en: params.values.tools,
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

  it("should create personal tools successfully", async () => {
    mockedAxios.post.mockResolvedValue({ data: responseData });

    const result = await createPersonalToolsOperation(params)(
      dispatch,
      getState,
      undefined,
    );

    expect(mockedAxios.post).toHaveBeenCalledWith(personalToolsCreateRoute, formattedParams);
    expect(result.type).toBe(createPersonalToolsOperation.fulfilled.type);
    expect(result.payload).toEqual(responseData);
  });

  it("should reject with error", async () => {
    const error = new Error("Create personal tools failed");

    mockedAxios.post.mockRejectedValue(error);

    const result = await createPersonalToolsOperation(params)(
      dispatch,
      getState,
      undefined,
    );

    expect(mockedAxios.post).toHaveBeenCalledWith(personalToolsCreateRoute, formattedParams);
    expect(result.type).toBe(createPersonalToolsOperation.rejected.type);
    expect(result.payload).toBe(error);
  });
});
