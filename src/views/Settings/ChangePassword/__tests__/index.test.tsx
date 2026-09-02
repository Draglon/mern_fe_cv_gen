import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useForm } from "react-hook-form";

import { useAppDispatch } from "@/store/hooks";
import updateUserPassword from "@/store/auth/operations/updateUserPassword";
import {
  isErrorCodeIncorrectCurrentPassword,
  isErrorCodeNewPasswordEqualsOld,
} from "@/utils/getErrorCode";

import ChangePassword from "../";

jest.mock("next-intl", () => ({
  useTranslations: jest.fn((namespace: string) => {
    const translations = {
      Settings: {
        "changePassword.title": "Change password",
        "changePassword.form.password.label.currentPassword":
          "Current password",
        "changePassword.form.password.label.newPassword": "New password",
        "changePassword.form.password.label.confirmPassword":
          "Confirm password",
        "changePassword.form.password.placeholder.newPassword":
          "Enter new password",
        "changePassword.form.password.placeholder.confirmPassword":
          "Confirm new password",
        "changePassword.form.password.errors.currentPassword":
          "Incorrect current password",
        "changePassword.form.password.errors.newPassword":
          "New password cannot be the same as old password",
      },
      shared: {
        "form.password.placeholder": "Enter password",
        "form.submitButton": "Submit",
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

jest.mock("@/store/hooks", () => ({
  useAppDispatch: jest.fn(),
}));

jest.mock("@/store/auth/operations/updateUserPassword", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("@/utils/getErrorCode", () => ({
  isErrorCodeIncorrectCurrentPassword: jest.fn(),
  isErrorCodeNewPasswordEqualsOld: jest.fn(),
}));

jest.mock("@/utils/forms/validations/passwordValidation", () => ({
  getPasswordRules: jest.fn(() => []),
  getConfirmPasswordRules: jest.fn(() => []),
}));

jest.mock("@/utils/isSubmitDisabled", () => ({
  __esModule: true,
  default: jest.fn(() => false),
}));

jest.mock("@/utils/isSubmitLoading", () => ({
  __esModule: true,
  default: jest.fn(() => false),
}));

jest.mock("@/views/shared/antd/Typography", () => ({
  Title: ({ children, ...props }: any) => {
    const { level, ...htmlProps } = props;

    return <h3 {...htmlProps}>{children}</h3>;
  },
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
    const { color, type, size, block, loading, disabled, ...htmlProps } = props;

    return (
      <button type={htmlType} disabled={disabled} {...htmlProps}>
        {children}
      </button>
    );
  },
}));

describe("ChangePassword", () => {
  const mockDispatch = jest.fn();
  const mockReset = jest.fn();
  const mockSetError = jest.fn();

  const renderComponent = () => render(<ChangePassword />);

  beforeEach(() => {
    jest.clearAllMocks();

    jest.mocked(useAppDispatch).mockReturnValue(mockDispatch);

    jest.mocked(useForm).mockReturnValue({
      control: {} as any,
      handleSubmit: (callback: any) => () =>
        callback({
          currentPassword: "oldPassword",
          newPassword: "newPassword",
          confirmPassword: "newPassword",
        }),
      formState: {},
      setError: mockSetError,
      reset: mockReset,
      getValues: jest.fn(),
      trigger: jest.fn(),
    } as any);

    jest.mocked(updateUserPassword).mockReturnValue({} as any);

    mockDispatch.mockReturnValue({
      unwrap: jest.fn().mockResolvedValue(undefined),
    });

    jest.mocked(isErrorCodeIncorrectCurrentPassword).mockReturnValue(false);

    jest.mocked(isErrorCodeNewPasswordEqualsOld).mockReturnValue(false);
  });

  it("renders title and form fields", () => {
    renderComponent();

    expect(
      screen.getByRole("heading", { name: "Change password" })
    ).toBeInTheDocument();

    expect(screen.getByLabelText("Current password")).toBeInTheDocument();
    expect(screen.getByLabelText("New password")).toBeInTheDocument();
    expect(screen.getByLabelText("Confirm password")).toBeInTheDocument();

    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
  });

  it("updates password and resets form on success", async () => {
    renderComponent();

    fireEvent.submit(
      screen.getByRole("button", { name: "Submit" }).closest("form")!
    );

    await waitFor(() => {
      expect(updateUserPassword).toHaveBeenCalledWith({
        currentPassword: "oldPassword",
        newPassword: "newPassword",
        confirmPassword: "newPassword",
        locale: "en",
      });

      expect(mockReset).toHaveBeenCalledWith(expect.anything());
    });
  });

  it("sets current password error when current password is incorrect", async () => {
    const error = new Error("Incorrect current password");

    mockDispatch.mockReturnValue({
      unwrap: jest.fn().mockRejectedValue(error),
    });

    jest.mocked(isErrorCodeIncorrectCurrentPassword).mockReturnValue(true);

    renderComponent();

    fireEvent.submit(
      screen.getByRole("button", { name: "Submit" }).closest("form")!
    );

    await waitFor(() => {
      expect(mockSetError).toHaveBeenCalledWith("currentPassword", {
        type: "manual",
        message: "Incorrect current password",
      });
    });

    expect(mockReset).not.toHaveBeenCalled();
  });

  it("sets new password error when new password equals old password", async () => {
    const error = new Error("New password equals old password");

    mockDispatch.mockReturnValue({
      unwrap: jest.fn().mockRejectedValue(error),
    });

    jest.mocked(isErrorCodeNewPasswordEqualsOld).mockReturnValue(true);

    renderComponent();

    fireEvent.submit(
      screen.getByRole("button", { name: "Submit" }).closest("form")!
    );

    await waitFor(() => {
      expect(mockSetError).toHaveBeenCalledWith("newPassword", {
        type: "manual",
        message: "New password cannot be the same as old password",
      });
    });

    expect(mockReset).not.toHaveBeenCalled();
  });

  it("does not reset form when update password fails with unknown error", async () => {
    const error = new Error("Unknown error");

    mockDispatch.mockReturnValue({
      unwrap: jest.fn().mockRejectedValue(error),
    });

    renderComponent();

    fireEvent.submit(
      screen.getByRole("button", { name: "Submit" }).closest("form")!
    );

    await waitFor(() => {
      expect(updateUserPassword).toHaveBeenCalled();
    });

    expect(mockReset).not.toHaveBeenCalled();
    expect(mockSetError).not.toHaveBeenCalled();
  });
});
