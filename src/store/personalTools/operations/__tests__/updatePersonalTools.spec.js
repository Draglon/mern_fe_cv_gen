import axios from "@/lib/axios";
import { personalToolsRoute } from "@/lib/apiRoutes";
import { personalToolsIdSelector } from "@/store/auth/selectors";

import updatePersonalToolsOperation from "../updatePersonalTools";

jest.mock("@/lib/axios");
jest.mock("@/store/auth/selectors");

const mockedAxios = jest.mocked(axios);
const mockedPersonalToolsIdSelector = jest.mocked(personalToolsIdSelector);

describe("updatePersonalToolsOperation", () => {
  const personalToolsId = "personalToolsId-123";
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
    resumeLocale
  };

  const responseData = {
    sectionTitle: {
      en: params.values.sectionTitle,
      ua: "",
      ru: "",
    },
    tools: {
      en: params.values.tools,
      ua: [],
      ru: [],
    }
  };

  const dispatch = jest.fn();
  const getState = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    mockedPersonalToolsIdSelector.mockReturnValue(personalToolsId);
    getState.mockReturnValue({});
  });

  it("should update personal tools successfully", async () => {
    mockedAxios.put.mockResolvedValue({ data: responseData });

    const result = await updatePersonalToolsOperation(params)(
      dispatch,
      getState,
      undefined,
    );

    expect(mockedPersonalToolsIdSelector).toHaveBeenCalledWith({});
    expect(mockedAxios.put).toHaveBeenCalledWith(personalToolsRoute(personalToolsId), formattedParams);
    expect(result.type).toBe(updatePersonalToolsOperation.fulfilled.type);
    expect(result.payload).toEqual(responseData);
  });

  it("should reject with error", async () => {
    const error = new Error("Update personal tools failed");

    mockedAxios.put.mockRejectedValue(error);

    const result = await updatePersonalToolsOperation(params)(
      dispatch,
      getState,
      undefined,
    );

    expect(mockedPersonalToolsIdSelector).toHaveBeenCalledWith({});
    expect(mockedAxios.put).toHaveBeenCalledWith(personalToolsRoute(personalToolsId), formattedParams);
    expect(result.type).toBe(updatePersonalToolsOperation.rejected.type);
    expect(result.payload).toBe(error);
  });
});
