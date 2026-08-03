import { render, screen } from "@testing-library/react";

import { PersonalExperiencesProps } from "@/lib/constants/props/resume/personalExperiences";
import { useAppSelector } from "@/store/hooks";
import fetchPersonalExperience from "@/store/personalExperience/operations/fetchPersonalExperience";

import PersonalExperience from "../";

const mockDispatch = jest.fn();
jest.mock("@/store/hooks", () => ({
  ...jest.requireActual("@/store/hooks"),
  useAppDispatch: () => mockDispatch,
  useAppSelector: jest.fn(),
}));

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
  default: (props: any) => <div data-testid="loader" {...props} />,
}));

jest.mock("@/views/shared/PersonalExperience/Form", () => ({
  __esModule: true,
  default: (props: any) => (
    <div data-testid="personal-experience-form" {...props} />
  ),
}));

describe("PersonalExperience", () => {
  const defaultProps: PersonalExperiencesProps = {
    resumeLocale: "en",
    isEdit: false,
  };

  const renderComponent = (props = defaultProps) =>
    render(<PersonalExperience {...props} />);

  describe("renders component", () => {
    beforeEach(() => {
      jest.clearAllMocks();
      mockedUseAppSelector.mockReturnValue(false);
    });

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
    beforeEach(() => {
      jest.clearAllMocks();
    });

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
