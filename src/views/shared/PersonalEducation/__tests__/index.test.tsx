import { render, screen } from "@testing-library/react";

import { PersonalEducationProps } from "@/lib/constants/props/resume/personalEducation";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import fetchPersonalEducation from "@/store/personalEducation/operations/fetchPersonalEducation";

import PersonalEducation from "../";

const mockDispatch = jest.fn();
jest.mock("@/store/hooks", () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

const mockedUseAppDispatch = jest.mocked(useAppDispatch);
const mockedUseAppSelector = jest.mocked(useAppSelector);

jest.mock(
  "@/store/personalEducation/operations/fetchPersonalEducation",
  () => ({
    __esModule: true,
    default: jest.fn(() => "fetchPersonalEducationThunk"),
  })
);

jest.mock("@/views/shared/antd/Loader", () => ({
  __esModule: true,
  default: () => <div data-testid="loader" />,
}));

jest.mock("@/views/shared/PersonalEducation/Form", () => ({
  __esModule: true,
  default: () => <div data-testid="personal-education-form" />,
}));

describe("PersonalEducation", () => {
  const defaultProps: PersonalEducationProps = {
    resumeLocale: "en",
    isEdit: false,
  };

  const renderComponent = (props = defaultProps) =>
    render(<PersonalEducation {...props} />);

  beforeEach(() => {
    jest.clearAllMocks();
    mockedUseAppDispatch.mockReturnValue(mockDispatch);
    mockedUseAppSelector.mockReturnValue(false);
  });

  describe("renders component", () => {
    it("with default props", () => {
      renderComponent();

      expect(screen.getByTestId("personal-education-form")).toBeInTheDocument();
      expect(screen.queryByTestId("loader")).not.toBeInTheDocument();
    });

    it("when isLoading is true", () => {
      mockedUseAppSelector.mockReturnValueOnce(true);

      renderComponent();

      expect(screen.getByTestId("loader")).toBeInTheDocument();
      expect(
        screen.queryByTestId("personal-education-form")
      ).not.toBeInTheDocument();
    });
  });

  describe("useEffect", () => {
    it("dispatches fetchPersonalEducation when resumeLocale exists", () => {
      renderComponent();

      expect(fetchPersonalEducation).toHaveBeenCalledTimes(1);
      expect(mockDispatch).toHaveBeenCalledWith("fetchPersonalEducationThunk");
    });

    it("does not dispatch when resumeLocale is undefined", () => {
      const props: PersonalEducationProps = {
        ...defaultProps,
        resumeLocale: "",
      };
      renderComponent(props);

      expect(fetchPersonalEducation).not.toHaveBeenCalled();
      expect(mockDispatch).not.toHaveBeenCalled();
    });
  });
});
