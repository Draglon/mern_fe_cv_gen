import axios from "@/lib/axios";
import { personalToolsRoute } from "@/lib/apiRoutes";
import { personalToolsIdSelector } from "@/store/auth/selectors";

import fetchPersonalToolsOperation from "../fetchPersonalTools";

jest.mock("@/lib/axios");
jest.mock("@/store/auth/selectors");

const mockedAxios = jest.mocked(axios);
const mockedPersonalToolsIdSelector = jest.mocked(personalToolsIdSelector);

describe("fetchPersonalToolsOperation", () => {
  const personalToolsId = "personalToolsId-123";

  const responseData = {
    sectionTitle: {
      en: "Title",
      ua: "",
      ru: "",
    },
    tools: {
      en: [{
        tool: "tool 1",
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

    mockedPersonalToolsIdSelector.mockReturnValue(personalToolsId);
    getState.mockReturnValue({});
  });

  it("should fetch personal tools successfully", async () => {
    mockedAxios.get.mockResolvedValue({ data: responseData });

    const result = await fetchPersonalToolsOperation()(
      dispatch,
      getState,
      undefined,
    );

    expect(mockedPersonalToolsIdSelector).toHaveBeenCalledWith({});
    expect(mockedAxios.get).toHaveBeenCalledWith(personalToolsRoute(personalToolsId));
    expect(result.type).toBe(fetchPersonalToolsOperation.fulfilled.type);
    expect(result.payload).toEqual(responseData);
  });

  it("should reject with error", async () => {
    const error = new Error("Fetch personal tools failed");

    mockedAxios.get.mockRejectedValue(error);

    const result = await fetchPersonalToolsOperation()(
      dispatch,
      getState,
      undefined,
    );

    expect(mockedPersonalToolsIdSelector).toHaveBeenCalledWith({});
    expect(mockedAxios.get).toHaveBeenCalledWith(personalToolsRoute(personalToolsId));
    expect(result.type).toBe(fetchPersonalToolsOperation.rejected.type);
    expect(result.payload).toBe(error);
  });
});
