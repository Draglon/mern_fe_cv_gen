import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useForm } from "react-hook-form";

import { useRouter } from "@/i18n/navigation";
import { homeRoute } from "@/lib/routes";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { hideModal as hideModalAction } from "@/store/modal/actions";
import deleteAccount from "@/store/auth/operations/deleteAccount";
import clearAuthSession from "@/utils/clearAuthSession";
import {
  isErrorStatusForbidden,
  isErrorStatusNotFound,
} from "@/utils/getErrorStatus";

import DeleteAccountModal from "../";

jest.mock("next-intl", () => ({
  useTranslations: jest.fn((namespace: string) => {
    const translations = {
      Settings: {
        "deleteAccount.modal.title": "Delete account",
        "deleteAccount.modal.form.alert.error": "Unable to delete account",
        "deleteAccount.modal.form.userName.label": "Username",
        "deleteAccount.modal.form.submitButton": "Delete account",
      },
      shared: {
        "form.userName.placeholder": "Enter your username",
      },
    };

    return (key: string) =>
      translations[namespace as keyof typeof translations]?.[
        key as keyof (typeof translations)[keyof typeof translations]
      ] ?? key;
  }),
  useLocale: jest.fn(() => "en"),
}));

jest.mock("react-hook-form", () => {
  const actual = jest.requireActual("react-hook-form");

  return {
    ...actual,
    useForm: jest.fn(),
  };
});

jest.mock("@/i18n/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/store/hooks", () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

jest.mock("@/store/modal/actions", () => ({
  hideModal: jest.fn(() => ({
    type: "modal/hideModal",
  })),
}));

jest.mock("@/store/auth/operations/deleteAccount", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("@/utils/clearAuthSession", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("@/utils/getErrorStatus", () => ({
  isErrorStatusForbidden: jest.fn(),
  isErrorStatusNotFound: jest.fn(),
}));

jest.mock("@/utils/forms/validations/userNameValidation", () => ({
  getUserNameRules: jest.fn(() => []),
}));

jest.mock("@/utils/isSubmitDisabled", () => ({
  __esModule: true,
  default: jest.fn(() => false),
}));

jest.mock("@/utils/isSubmitLoading", () => ({
  __esModule: true,
  default: jest.fn(() => false),
}));

jest.mock("@/views/shared/antd/Modal", () => ({
  __esModule: true,
  default: ({ children, title, onCancel }: any) => (
    <div>
      <h1>{title}</h1>
      <button onClick={onCancel}>Close</button>
      {children}
    </div>
  ),
}));

jest.mock("@/views/shared/antd/Alert", () => ({
  __esModule: true,
  default: ({ title }: any) => <div role="alert">{title}</div>,
}));

jest.mock("@/views/shared/antd/Form", () => {
  const Form = ({ children, onFinish, layout, ...props }: any) => (
    <form
      {...props}
      onSubmit={(event) => {
        event.preventDefault();
        onFinish?.(event);
      }}
    >
      {children}
    </form>
  );

  return {
    __esModule: true,
    default: Form,
  };
});

jest.mock("@/views/shared/FormItem", () => ({
  __esModule: true,
  default: ({ name, label, placeholder }: any) => (
    <div>
      <label htmlFor={name}>{label}</label>
      <input id={name} name={name} placeholder={placeholder} />
    </div>
  ),
}));

jest.mock("@/views/shared/InputField", () => ({
  __esModule: true,
  default: () => <input />,
}));

jest.mock("@/views/shared/antd/Button", () => ({
  __esModule: true,
  default: ({ children, htmlType, ...props }: any) => {
    const { color, type, size, loading, disabled, ...htmlProps } = props;

    return (
      <button type={htmlType} disabled={disabled} {...htmlProps}>
        {children}
      </button>
    );
  },
}));

jest.mock("@/utils/settings", () => ({
  getChangeEmailDefaultValues: jest.fn(),
}));

describe("DeleteAccountModal", () => {
  const mockDispatch = jest.fn();
  const mockPush = jest.fn();

  const renderComponent = () => render(<DeleteAccountModal />);

  beforeEach(() => {
    jest.clearAllMocks();

    jest.mocked(useAppDispatch).mockReturnValue(mockDispatch);
    jest.mocked(useAppSelector).mockReturnValue(null);
    jest.mocked(useRouter).mockReturnValue({
      push: mockPush,
    } as any);

    jest.mocked(isErrorStatusNotFound).mockReturnValue(false);
    jest.mocked(isErrorStatusForbidden).mockReturnValue(false);

    jest.mocked(useForm).mockReturnValue({
      control: {} as any,
      handleSubmit: (callback: any) => () =>
        callback({
          userName: "testUser",
        }),
      formState: {},
    } as any);

    jest.mocked(clearAuthSession).mockResolvedValue(undefined);
    jest.mocked(deleteAccount).mockReturnValue({} as any);

    mockDispatch.mockReturnValue({
      unwrap: jest.fn().mockResolvedValue(undefined),
    });
  });

  it("renders modal title and form", () => {
    renderComponent();

    expect(
      screen.getByRole("heading", { name: "Delete account" })
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Username")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter your username")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Delete account" })
    ).toBeInTheDocument();
  });

  it("renders error alert when user error is not found", () => {
    jest.mocked(isErrorStatusNotFound).mockReturnValue(true);

    renderComponent();

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Unable to delete account"
    );
  });

  it("renders error alert when user error is forbidden", () => {
    jest.mocked(isErrorStatusForbidden).mockReturnValue(true);

    renderComponent();

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Unable to delete account"
    );
  });

  it("does not render error alert when there is no relevant user error", () => {
    renderComponent();

    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("deletes account, clears session, hides modal and redirects", async () => {
    renderComponent();

    fireEvent.submit(
      screen.getByRole("button", { name: "Delete account" }).closest("form")!
    );

    await waitFor(() => {
      expect(deleteAccount).toHaveBeenCalledWith({
        userName: "testUser",
        locale: "en",
      });

      expect(clearAuthSession).toHaveBeenCalledWith(mockDispatch);

      expect(hideModalAction).toHaveBeenCalled();

      expect(mockDispatch).toHaveBeenCalledWith({
        type: "modal/hideModal",
      });

      expect(mockPush).toHaveBeenCalledWith(homeRoute);
    });
  });

  it("hides modal when close button is clicked", () => {
    renderComponent();

    fireEvent.click(screen.getByRole("button", { name: "Close" }));

    expect(hideModalAction).toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "modal/hideModal",
    });
  });

  it("does not clear session, hide modal or redirect when delete account fails", async () => {
    const error = new Error("Delete account failed");

    mockDispatch.mockReturnValue({
      unwrap: jest.fn().mockRejectedValue(error),
    });

    renderComponent();

    fireEvent.submit(
      screen.getByRole("button", { name: "Delete account" }).closest("form")!
    );

    await waitFor(() => {
      expect(deleteAccount).toHaveBeenCalledWith({
        userName: "testUser",
        locale: "en",
      });
    });

    expect(clearAuthSession).not.toHaveBeenCalled();
    expect(hideModalAction).not.toHaveBeenCalled();
    expect(mockPush).not.toHaveBeenCalled();
  });
});
