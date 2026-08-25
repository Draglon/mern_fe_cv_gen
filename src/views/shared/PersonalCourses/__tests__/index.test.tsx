import { render, screen } from "@testing-library/react";

import { PersonalCoursesProps } from "@/lib/constants/props/resume/personalCourses";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import fetchPersonalCourses from "@/store/personalCourses/operations/fetchPersonalCourses";

import PersonalCourses from "../";

const mockDispatch = jest.fn();
jest.mock("@/store/hooks", () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

const mockedUseAppDispatch = jest.mocked(useAppDispatch);
const mockedUseAppSelector = jest.mocked(useAppSelector);

jest.mock("@/store/personalCourses/operations/fetchPersonalCourses", () => ({
  __esModule: true,
  default: jest.fn(() => "fetchPersonalCoursesThunk"),
}));

jest.mock("@/views/shared/antd/Loader", () => ({
  __esModule: true,
  default: () => <div data-testid="loader" />,
}));

jest.mock("@/views/shared/PersonalCourses/Form", () => ({
  __esModule: true,
  default: () => <div data-testid="personal-courses-form" />,
}));

describe("PersonalCourses", () => {
  const defaultProps: PersonalCoursesProps = {
    resumeLocale: "en",
    isEdit: false,
  };

  const renderComponent = (props = defaultProps) =>
    render(<PersonalCourses {...props} />);

  beforeEach(() => {
    jest.clearAllMocks();
    mockedUseAppDispatch.mockReturnValue(mockDispatch);
    mockedUseAppSelector.mockReturnValue(false);
  });

  describe("renders component", () => {
    it("with default props", () => {
      renderComponent();

      expect(screen.getByTestId("personal-courses-form")).toBeInTheDocument();
      expect(screen.queryByTestId("loader")).not.toBeInTheDocument();
    });

    it("when isLoading is true", () => {
      mockedUseAppSelector.mockReturnValueOnce(true);

      renderComponent();

      expect(screen.getByTestId("loader")).toBeInTheDocument();
      expect(
        screen.queryByTestId("personal-courses-form")
      ).not.toBeInTheDocument();
    });
  });

  describe("useEffect", () => {
    it("dispatches fetchPersonalCourses when resumeLocale exists", () => {
      renderComponent();

      expect(fetchPersonalCourses).toHaveBeenCalledTimes(1);
      expect(mockDispatch).toHaveBeenCalledWith("fetchPersonalCoursesThunk");
    });

    it("does not dispatch when resumeLocale is undefined", () => {
      const props: PersonalCoursesProps = {
        ...defaultProps,
        resumeLocale: "",
      };
      renderComponent(props);

      expect(fetchPersonalCourses).not.toHaveBeenCalled();
      expect(mockDispatch).not.toHaveBeenCalled();
    });
  });
});
