import { render, screen } from "@testing-library/react";

import { PersonalCoursesProps } from "@/lib/constants/props/resume/personalCourses";
import { useAppSelector } from "@/store/hooks";
import fetchPersonalCourses from "@/store/personalCourses/operations/fetchPersonalCourses";

import PersonalCourses from "../";

const mockDispatch = jest.fn();
jest.mock("@/store/hooks", () => ({
  ...jest.requireActual("@/store/hooks"),
  useAppDispatch: () => mockDispatch,
  useAppSelector: jest.fn(),
}));

const mockedUseAppSelector = jest.mocked(useAppSelector);

jest.mock("@/store/personalCourses/operations/fetchPersonalCourses", () => ({
  __esModule: true,
  default: jest.fn(() => "fetchPersonalCoursesThunk"),
}));

jest.mock("@/views/shared/antd/Loader", () => ({
  __esModule: true,
  default: (props: any) => <div data-testid="loader" {...props} />,
}));

jest.mock("@/views/shared/PersonalCourses/Form", () => ({
  __esModule: true,
  default: (props: any) => (
    <div data-testid="personal-courses-form" {...props} />
  ),
}));

describe("PersonalCourses", () => {
  const defaultProps: PersonalCoursesProps = {
    resumeLocale: "en",
    isEdit: false,
  };

  const renderComponent = (props = defaultProps) =>
    render(<PersonalCourses {...props} />);

  describe("renders component", () => {
    beforeEach(() => {
      jest.clearAllMocks();
      mockedUseAppSelector.mockReturnValue(false);
    });

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
    beforeEach(() => {
      jest.clearAllMocks();
    });

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
