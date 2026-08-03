import { render, screen } from "@testing-library/react";

import { PersonalToolsProps } from "@/lib/constants/props/resume/personalTools";
import { useAppSelector } from "@/store/hooks";
import fetchPersonalTools from "@/store/personalTools/operations/fetchPersonalTools";

import PersonalTools from "../";

const mockDispatch = jest.fn();
jest.mock("@/store/hooks", () => ({
  ...jest.requireActual("@/store/hooks"),
  useAppDispatch: () => mockDispatch,
  useAppSelector: jest.fn(),
}));

const mockedUseAppSelector = jest.mocked(useAppSelector);

jest.mock("@/store/personalTools/operations/fetchPersonalTools", () => ({
  __esModule: true,
  default: jest.fn(() => "fetchPersonalToolsThunk"),
}));

jest.mock("@/views/shared/antd/Loader", () => ({
  __esModule: true,
  default: (props: any) => <div data-testid="loader" {...props} />,
}));

jest.mock("@/views/shared/PersonalTools/Form", () => ({
  __esModule: true,
  default: (props: any) => <div data-testid="personal-tools-form" {...props} />,
}));

describe("PersonalTools", () => {
  const defaultProps: PersonalToolsProps = {
    resumeLocale: "en",
    isEdit: false,
  };

  const renderComponent = (props = defaultProps) =>
    render(<PersonalTools {...props} />);

  describe("renders component", () => {
    beforeEach(() => {
      jest.clearAllMocks();
      mockedUseAppSelector.mockReturnValue(false);
    });

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
    beforeEach(() => {
      jest.clearAllMocks();
    });

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
