import { render, screen } from "@testing-library/react";

import { PersonalLanguagesProps } from "@/lib/constants/props/resume/personalLanguages";
import { useAppSelector } from "@/store/hooks";
import fetchPersonalLanguages from "@/store/personalLanguages/operations/fetchPersonalLanguages";

import PersonalLanguages from "../";

const mockDispatch = jest.fn();
jest.mock("@/store/hooks", () => ({
  ...jest.requireActual("@/store/hooks"),
  useAppDispatch: () => mockDispatch,
  useAppSelector: jest.fn(),
}));

const mockedUseAppSelector = jest.mocked(useAppSelector);

jest.mock(
  "@/store/personalLanguages/operations/fetchPersonalLanguages",
  () => ({
    __esModule: true,
    default: jest.fn(() => "fetchPersonalLanguagesThunk"),
  })
);

jest.mock("@/views/shared/antd/Loader", () => ({
  __esModule: true,
  default: (props: any) => <div data-testid="loader" {...props} />,
}));

jest.mock("@/views/shared/PersonalLanguages/Form", () => ({
  __esModule: true,
  default: (props: any) => (
    <div data-testid="personal-languages-form" {...props} />
  ),
}));

describe("PersonalLanguages", () => {
  const defaultProps: PersonalLanguagesProps = {
    resumeLocale: "en",
    isEdit: false,
  };

  const renderComponent = (props = defaultProps) =>
    render(<PersonalLanguages {...props} />);

  describe("renders component", () => {
    beforeEach(() => {
      jest.clearAllMocks();
      mockedUseAppSelector.mockReturnValue(false);
    });

    it("with default props", () => {
      renderComponent();

      expect(screen.getByTestId("personal-languages-form")).toBeInTheDocument();
      expect(screen.queryByTestId("loader")).not.toBeInTheDocument();
    });

    it("when isLoading is true", () => {
      mockedUseAppSelector.mockReturnValueOnce(true);

      renderComponent();

      expect(screen.getByTestId("loader")).toBeInTheDocument();
      expect(
        screen.queryByTestId("personal-languages-form")
      ).not.toBeInTheDocument();
    });
  });

  describe("useEffect", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("dispatches fetchPersonalLanguages when resumeLocale exists", () => {
      renderComponent();

      expect(fetchPersonalLanguages).toHaveBeenCalledTimes(1);
      expect(mockDispatch).toHaveBeenCalledWith("fetchPersonalLanguagesThunk");
    });

    it("does not dispatch when resumeLocale is undefined", () => {
      const props: PersonalLanguagesProps = {
        ...defaultProps,
        resumeLocale: "",
      };
      renderComponent(props);

      expect(fetchPersonalLanguages).not.toHaveBeenCalled();
      expect(mockDispatch).not.toHaveBeenCalled();
    });
  });
});
