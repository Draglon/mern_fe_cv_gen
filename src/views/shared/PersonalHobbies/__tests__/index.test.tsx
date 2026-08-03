import { render, screen } from "@testing-library/react";

import { PersonalHobbiesProps } from "@/lib/constants/props/resume/personalHobbies";
import { useAppSelector } from "@/store/hooks";
import fetchPersonalHobbies from "@/store/personalHobbies/operations/fetchPersonalHobbies";

import PersonalHobbies from "../";

const mockDispatch = jest.fn();
jest.mock("@/store/hooks", () => ({
  ...jest.requireActual("@/store/hooks"),
  useAppDispatch: () => mockDispatch,
  useAppSelector: jest.fn(),
}));

const mockedUseAppSelector = jest.mocked(useAppSelector);

jest.mock("@/store/personalHobbies/operations/fetchPersonalHobbies", () => ({
  __esModule: true,
  default: jest.fn(() => "fetchPersonalHobbiesThunk"),
}));

jest.mock("@/views/shared/antd/Loader", () => ({
  __esModule: true,
  default: (props: any) => <div data-testid="loader" {...props} />,
}));

jest.mock("@/views/shared/PersonalHobbies/Form", () => ({
  __esModule: true,
  default: (props: any) => (
    <div data-testid="personal-hobbies-form" {...props} />
  ),
}));

describe("PersonalHobbies", () => {
  const defaultProps: PersonalHobbiesProps = {
    resumeLocale: "en",
    isEdit: false,
  };

  const renderComponent = (props = defaultProps) =>
    render(<PersonalHobbies {...props} />);

  describe("renders component", () => {
    beforeEach(() => {
      jest.clearAllMocks();
      mockedUseAppSelector.mockReturnValue(false);
    });

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
    beforeEach(() => {
      jest.clearAllMocks();
    });

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
