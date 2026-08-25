import { render, screen } from "@testing-library/react";

import { PersonalSkillsProps } from "@/lib/constants/props/resume/personalSkills";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import fetchPersonalSkills from "@/store/personalSkills/operations/fetchPersonalSkills";

import PersonalSkills from "../";

const mockDispatch = jest.fn();
jest.mock("@/store/hooks", () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

const mockedUseAppDispatch = jest.mocked(useAppDispatch);
const mockedUseAppSelector = jest.mocked(useAppSelector);

jest.mock("@/store/personalSkills/operations/fetchPersonalSkills", () => ({
  __esModule: true,
  default: jest.fn(() => "fetchPersonalSkillsThunk"),
}));

jest.mock("@/views/shared/antd/Loader", () => ({
  __esModule: true,
  default: () => <div data-testid="loader" />,
}));

jest.mock("@/views/shared/PersonalSkills/Form", () => ({
  __esModule: true,
  default: () => <div data-testid="personal-skills-form" />,
}));

beforeEach(() => {
  jest.clearAllMocks();
  mockedUseAppDispatch.mockReturnValue(mockDispatch);
  mockedUseAppSelector.mockReturnValue(false);
});

describe("PersonalSkills", () => {
  const defaultProps: PersonalSkillsProps = {
    resumeLocale: "en",
    isEdit: false,
  };

  const renderComponent = (props = defaultProps) =>
    render(<PersonalSkills {...props} />);

  describe("renders component", () => {
    it("with default props", () => {
      renderComponent();

      expect(screen.getByTestId("personal-skills-form")).toBeInTheDocument();
      expect(screen.queryByTestId("loader")).not.toBeInTheDocument();
    });

    it("when isLoading is true", () => {
      mockedUseAppSelector.mockReturnValueOnce(true);

      renderComponent();

      expect(screen.getByTestId("loader")).toBeInTheDocument();
      expect(
        screen.queryByTestId("personal-skills-form")
      ).not.toBeInTheDocument();
    });
  });

  describe("useEffect", () => {
    it("dispatches fetchPersonalSkills when resumeLocale exists", () => {
      renderComponent();

      expect(fetchPersonalSkills).toHaveBeenCalledTimes(1);
      expect(mockDispatch).toHaveBeenCalledWith("fetchPersonalSkillsThunk");
    });

    it("does not dispatch when resumeLocale is undefined", () => {
      const props: PersonalSkillsProps = {
        ...defaultProps,
        resumeLocale: "",
      };
      renderComponent(props);

      expect(fetchPersonalSkills).not.toHaveBeenCalled();
      expect(mockDispatch).not.toHaveBeenCalled();
    });
  });
});
