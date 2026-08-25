import { render, screen } from "@testing-library/react";

import { PersonalExperiencesProps } from "@/lib/constants/props/resume/personalExperiences";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import fetchPersonalExperience from "@/store/personalExperience/operations/fetchPersonalExperience";

import PersonalExperience from "../";

const mockDispatch = jest.fn();
jest.mock("@/store/hooks", () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

const mockedUseAppDispatch = jest.mocked(useAppDispatch);
const mockedUseAppSelector = jest.mocked(useAppSelector);

jest.mock(
  "@/store/personalExperience/operations/fetchPersonalExperience",
  () => ({
    __esModule: true,
    default: jest.fn(() => "fetchPersonalExperienceThunk"),
  })
);

jest.mock("@/views/shared/antd/Loader", () => ({
  __esModule: true,
  default: () => <div data-testid="loader" />,
}));

jest.mock("@/views/shared/PersonalExperience/Form", () => ({
  __esModule: true,
  default: () => <div data-testid="personal-experience-form" />,
}));

describe("PersonalExperience", () => {
  const defaultProps: PersonalExperiencesProps = {
    resumeLocale: "en",
    isEdit: false,
  };

  const renderComponent = (props = defaultProps) =>
    render(<PersonalExperience {...props} />);

  beforeEach(() => {
    jest.clearAllMocks();
    mockedUseAppDispatch.mockReturnValue(mockDispatch);
    mockedUseAppSelector.mockReturnValue(false);
  });

  describe("renders component", () => {
    it("with default props", () => {
      renderComponent();

      expect(
        screen.getByTestId("personal-experience-form")
      ).toBeInTheDocument();
      expect(screen.queryByTestId("loader")).not.toBeInTheDocument();
    });

    it("when isLoading is true", () => {
      mockedUseAppSelector.mockReturnValueOnce(true);

      renderComponent();

      expect(screen.getByTestId("loader")).toBeInTheDocument();
      expect(
        screen.queryByTestId("personal-experience-form")
      ).not.toBeInTheDocument();
    });
  });

  describe("useEffect", () => {
    it("dispatches fetchPersonalExperience when resumeLocale exists", () => {
      renderComponent();

      expect(fetchPersonalExperience).toHaveBeenCalledTimes(1);
      expect(mockDispatch).toHaveBeenCalledWith("fetchPersonalExperienceThunk");
    });

    it("does not dispatch when resumeLocale is undefined", () => {
      const props: PersonalExperiencesProps = {
        ...defaultProps,
        resumeLocale: "",
      };
      renderComponent(props);

      expect(fetchPersonalExperience).not.toHaveBeenCalled();
      expect(mockDispatch).not.toHaveBeenCalled();
    });
  });
});
