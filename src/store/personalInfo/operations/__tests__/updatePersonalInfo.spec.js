import axios from "@/lib/axios";
import { personalInfoRoute } from "@/lib/apiRoutes";
import { normalizeUrl } from "@/utils/normalizeUrl";
import { personalInfoIdSelector } from "@/store/auth/selectors";

import updatePersonalInfoOperation from "../updatePersonalInfo";

jest.mock("@/lib/axios");
jest.mock("@/store/auth/selectors");
jest.mock("@/utils/normalizeUrl");

const mockedAxios = jest.mocked(axios);
const mockedPersonalInfoIdSelector = jest.mocked(personalInfoIdSelector);
const mockedNormalizeUrl = jest.mocked(normalizeUrl);

describe("updatePersonalInfoOperation", () => {
  const personalInfoId = "personalInfoId-123";
  const locale = "en";
  const resumeLocale = "en";
  const normalizedUrl = "photoUrl";

  const params = {
    values: {
      sectionTitle: "Title",
      userUrl: ["photoUrl"],
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      aboutMe: "Developer",
      address: "New York",
      phoneNumber: "+123456789",
      birthday: "01.01.1990",
      linkedIn: "",
      telegram: "",
      portfolio: "",
    },
    locale,
    resumeLocale,
  };

  const formattedParams = {
    ...params.values,
    userUrl: normalizedUrl,
    locale,
    resumeLocale
  };

  const responseData = {
    sectionTitle: {
      en: params.values.sectionTitle,
      ua: "",
      ru: "",
    },
    userUrl: {
      en: params.values.userUrl,
      ua: "",
      ru: "",
    },
    firstName: {
      en: params.values.firstName,
      ua: "",
      ru: "",
    },
    lastName: {
      en: params.values.lastName,
      ua: "",
      ru: "",
    },
    email: {
      en: params.values.email,
      ua: "",
      ru: "",
    },
    aboutMe: {
      en: params.values.aboutMe,
      ua: "",
      ru: "",
    },
    address: {
      en: params.values.address,
      ua: "",
      ru: "",
    },
    phoneNumber: {
      en: params.values.phoneNumber,
      ua: "",
      ru: "",
    },
    birthday: {
      en: params.values.birthday,
      ua: "",
      ru: "",
    },
    linkedIn: {
      en: params.values.linkedIn,
      ua: "",
      ru: "",
    },
    telegram: {
      en: params.values.telegram,
      ua: "",
      ru: "",
    },
    portfolio: {
      en: params.values.portfolio,
      ua: "",
      ru: "",
    }
  };

  const dispatch = jest.fn();
  const getState = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    mockedPersonalInfoIdSelector.mockReturnValue(personalInfoId);
    mockedNormalizeUrl.mockResolvedValue(normalizedUrl);
    getState.mockReturnValue({});
  });

  it("should update personal info successfully", async () => {
    mockedAxios.put.mockResolvedValue({ data: responseData });

    const result = await updatePersonalInfoOperation(params)(
      dispatch,
      getState,
      undefined,
    );

    expect(mockedNormalizeUrl).toHaveBeenCalledWith(params.values.userUrl);
    expect(mockedPersonalInfoIdSelector).toHaveBeenCalledWith({});
    expect(mockedAxios.put).toHaveBeenCalledWith(personalInfoRoute(personalInfoId), formattedParams);
    expect(result.type).toBe(updatePersonalInfoOperation.fulfilled.type);
    expect(result.payload).toEqual(responseData);
  });

  it("should reject with error", async () => {
    const error = new Error("Update personal info failed");

    mockedAxios.put.mockRejectedValue(error);

    const result = await updatePersonalInfoOperation(params)(
      dispatch,
      getState,
      undefined,
    );

    expect(mockedNormalizeUrl).toHaveBeenCalledWith(params.values.userUrl);
    expect(mockedPersonalInfoIdSelector).toHaveBeenCalledWith({});
    expect(mockedAxios.put).toHaveBeenCalledWith(personalInfoRoute(personalInfoId), formattedParams);
    expect(result.type).toBe(updatePersonalInfoOperation.rejected.type);
    expect(result.payload).toBe(error);
  });
});
