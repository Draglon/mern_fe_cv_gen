import { render, screen } from "@testing-library/react";

import { PersonalInfoProps } from "@/lib/constants/props/resume/personalInfo";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import fetchPersonalInfo from "@/store/personalInfo/operations/fetchPersonalInfo";

import PersonalInfo from "../";

const mockDispatch = jest.fn();
jest.mock("@/store/hooks", () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

const mockedUseAppDispatch = jest.mocked(useAppDispatch);
const mockedUseAppSelector = jest.mocked(useAppSelector);

jest.mock("@/store/personalInfo/operations/fetchPersonalInfo", () => ({
  __esModule: true,
  default: jest.fn(() => "fetchPersonalInfoThunk"),
}));

jest.mock("@/views/shared/antd/Loader", () => ({
  __esModule: true,
  default: () => <div data-testid="loader" />,
}));

jest.mock("@/views/shared/PersonalInfo/Form", () => ({
  __esModule: true,
  default: () => <div data-testid="personal-info-form" />,
}));

describe("PersonalInfo", () => {
  const defaultProps: PersonalInfoProps = {
    resumeLocale: "en",
    isEdit: false,
  };

  const renderComponent = (props = defaultProps) =>
    render(<PersonalInfo {...props} />);

  beforeEach(() => {
    jest.clearAllMocks();
    mockedUseAppDispatch.mockReturnValue(mockDispatch);
    mockedUseAppSelector.mockReturnValue(false);
  });

  describe("renders component", () => {
    it("with default props", () => {
      renderComponent();

      expect(screen.getByTestId("personal-info-form")).toBeInTheDocument();
      expect(screen.queryByTestId("loader")).not.toBeInTheDocument();
    });

    it("when isLoading is true", () => {
      mockedUseAppSelector.mockReturnValueOnce(true);

      renderComponent();

      expect(screen.getByTestId("loader")).toBeInTheDocument();
      expect(
        screen.queryByTestId("personal-info-form")
      ).not.toBeInTheDocument();
    });
  });

  describe("useEffect", () => {
    it("dispatches fetchPersonalInfo when resumeLocale exists", () => {
      renderComponent();

      expect(fetchPersonalInfo).toHaveBeenCalledTimes(1);
      expect(mockDispatch).toHaveBeenCalledWith("fetchPersonalInfoThunk");
    });

    it("does not dispatch when resumeLocale is undefined", () => {
      const props: PersonalInfoProps = {
        ...defaultProps,
        resumeLocale: "",
      };
      renderComponent(props);

      expect(fetchPersonalInfo).not.toHaveBeenCalled();
      expect(mockDispatch).not.toHaveBeenCalled();
    });
  });
});
