import { render, screen } from "@testing-library/react";

import { PersonalToolsProps } from "@/lib/constants/props/resume/personalTools";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import fetchPersonalTools from "@/store/personalTools/operations/fetchPersonalTools";

import PersonalTools from "../";

const mockDispatch = jest.fn();
jest.mock("@/store/hooks", () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

const mockedUseAppDispatch = jest.mocked(useAppDispatch);
const mockedUseAppSelector = jest.mocked(useAppSelector);

jest.mock("@/store/personalTools/operations/fetchPersonalTools", () => ({
  __esModule: true,
  default: jest.fn(() => "fetchPersonalToolsThunk"),
}));

jest.mock("@/views/shared/antd/Loader", () => ({
  __esModule: true,
  default: () => <div data-testid="loader" />,
}));

jest.mock("@/views/shared/PersonalTools/Form", () => ({
  __esModule: true,
  default: () => <div data-testid="personal-tools-form" />,
}));

describe("PersonalTools", () => {
  const defaultProps: PersonalToolsProps = {
    resumeLocale: "en",
    isEdit: false,
  };

  const renderComponent = (props = defaultProps) =>
    render(<PersonalTools {...props} />);

  beforeEach(() => {
    jest.clearAllMocks();
    mockedUseAppDispatch.mockReturnValue(mockDispatch);
    mockedUseAppSelector.mockReturnValue(false);
  });

  describe("renders component", () => {
    it("with default props", () => {
      renderComponent();

      expect(screen.getByTestId("personal-tools-form")).toBeInTheDocument();
      expect(screen.queryByTestId("loader")).not.toBeInTheDocument();
    });

    it("when isLoading is true", () => {
      mockedUseAppSelector.mockReturnValueOnce(true);

      renderComponent();

      expect(screen.getByTestId("loader")).toBeInTheDocument();
      expect(
        screen.queryByTestId("personal-tools-form")
      ).not.toBeInTheDocument();
    });
  });

  describe("useEffect", () => {
    it("dispatches fetchPersonalTools when resumeLocale exists", () => {
      renderComponent();

      expect(fetchPersonalTools).toHaveBeenCalledTimes(1);
      expect(mockDispatch).toHaveBeenCalledWith("fetchPersonalToolsThunk");
    });

    it("does not dispatch when resumeLocale is undefined", () => {
      const props: PersonalToolsProps = {
        ...defaultProps,
        resumeLocale: "",
      };
      renderComponent(props);

      expect(fetchPersonalTools).not.toHaveBeenCalled();
      expect(mockDispatch).not.toHaveBeenCalled();
    });
  });
});
