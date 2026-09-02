import { render, screen, fireEvent } from "@testing-library/react";

import { useAppDispatch } from "@/store/hooks";
import { showModal as showModalAction } from "@/store/modal/actions";

import DeleteAccount from "../";

jest.mock("next-intl", () => ({
  useTranslations: jest.fn(() => (key: string) => {
    const translations: Record<string, string> = {
      "deleteAccount.title": "Delete account",
      "deleteAccount.button": "Delete account",
    };

    return translations[key] ?? key;
  }),
}));

jest.mock("@/store/hooks", () => ({
  useAppDispatch: jest.fn(),
}));

jest.mock("@/store/modal/actions", () => ({
  showModal: jest.fn((payload) => payload),
}));

jest.mock("@/views/shared/antd/Typography", () => ({
  __esModule: true,
  Title: ({ children, level, ...props }: any) => <h1 {...props}>{children}</h1>,
}));

jest.mock("@/views/shared/antd/Button", () => ({
  __esModule: true,
  default: ({ children, ...props }: any) => {
    const { size, color, type, dataTestId, dataCy, ...htmlProps } = props;

    return (
      <button {...htmlProps} data-testid={dataTestId} data-cy={dataCy}>
        {children}
      </button>
    );
  },
}));

describe("DeleteAccount", () => {
  const mockDispatch = jest.fn();

  const renderComponent = () => render(<DeleteAccount />);

  beforeEach(() => {
    jest.clearAllMocks();

    jest.mocked(useAppDispatch).mockReturnValue(mockDispatch);
  });

  it("renders title and delete button", () => {
    renderComponent();

    expect(
      screen.getByRole("heading", { name: "Delete account" })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: "Delete account" })
    ).toBeInTheDocument();
  });

  it("opens delete account modal when button is clicked", () => {
    renderComponent();

    fireEvent.click(screen.getByRole("button", { name: "Delete account" }));

    expect(showModalAction).toHaveBeenCalledWith({
      modalType: "DELETE_ACCOUNT_MODAL",
    });

    expect(mockDispatch).toHaveBeenCalledWith({
      modalType: "DELETE_ACCOUNT_MODAL",
    });
  });
});
