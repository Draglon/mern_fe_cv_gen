import { render, screen } from "@testing-library/react";

import { PersonalHobbiesProps } from "@/lib/constants/props/resume/personalHobbies";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import fetchPersonalHobbies from "@/store/personalHobbies/operations/fetchPersonalHobbies";

import PersonalHobbies from "../";

const mockDispatch = jest.fn();
jest.mock("@/store/hooks", () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

const mockedUseAppDispatch = jest.mocked(useAppDispatch);
const mockedUseAppSelector = jest.mocked(useAppSelector);

jest.mock("@/store/personalHobbies/operations/fetchPersonalHobbies", () => ({
  __esModule: true,
  default: jest.fn(() => "fetchPersonalHobbiesThunk"),
}));

jest.mock("@/views/shared/antd/Loader", () => ({
  __esModule: true,
  default: () => <div data-testid="loader" />,
}));

jest.mock("@/views/shared/PersonalHobbies/Form", () => ({
  __esModule: true,
  default: () => <div data-testid="personal-hobbies-form" />,
}));

describe("PersonalHobbies", () => {
  const defaultProps: PersonalHobbiesProps = {
    resumeLocale: "en",
    isEdit: false,
  };

  const renderComponent = (props = defaultProps) =>
    render(<PersonalHobbies {...props} />);

  beforeEach(() => {
    jest.clearAllMocks();
    mockedUseAppDispatch.mockReturnValue(mockDispatch);
    mockedUseAppSelector.mockReturnValue(false);
  });

  describe("renders component", () => {
    it("with default props", () => {
      renderComponent();

      expect(screen.getByTestId("personal-hobbies-form")).toBeInTheDocument();
      expect(screen.queryByTestId("loader")).not.toBeInTheDocument();
    });

    it("when isLoading is true", () => {
      mockedUseAppSelector.mockReturnValueOnce(true);

      renderComponent();

      expect(screen.getByTestId("loader")).toBeInTheDocument();
      expect(
        screen.queryByTestId("personal-hobbies-form")
      ).not.toBeInTheDocument();
    });
  });

  describe("useEffect", () => {
    it("dispatches fetchPersonalHobbies when resumeLocale exists", () => {
      renderComponent();

      expect(fetchPersonalHobbies).toHaveBeenCalledTimes(1);
      expect(mockDispatch).toHaveBeenCalledWith("fetchPersonalHobbiesThunk");
    });

    it("does not dispatch when resumeLocale is undefined", () => {
      const props: PersonalHobbiesProps = {
        ...defaultProps,
        resumeLocale: "",
      };
      renderComponent(props);

      expect(fetchPersonalHobbies).not.toHaveBeenCalled();
      expect(mockDispatch).not.toHaveBeenCalled();
    });
  });
});
