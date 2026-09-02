import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useForm } from "react-hook-form";

import {
  isErrorStatusIncorrectData,
  isErrorStatusUnauthorized,
} from "@/utils/getErrorStatus";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import updateUserEmail from "@/store/auth/operations/updateUserEmail";

import ChangeEmail from "../";

jest.mock("next-intl", () => ({
  useTranslations: jest.fn((namespace: string) => {
    const translations = {
      Settings: {
        "changeEmail.title": "Change email title",
        "changeEmail.form.email.label": "Email",
        "changeEmail.form.email.placeholder": "Enter your email",
        "changeEmail.form.password.label": "Current password",
        "changeEmail.form.password.errors.currentPassword":
          "Current password is incorrect",
        "changeEmail.form.email.errors.alreadyExists":
          "This email address is already in use!",
      },
      shared: {
        "form.submitButton": "Save changes",
        "form.password.placeholder": "Enter your password",
      },
    };

    return (key: string) =>
      translations[namespace as keyof typeof translations]?.[
        key as keyof (typeof translations)[keyof typeof translations]
      ] ?? key;
  }),
  useLocale: () => "en",
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
  useAppSelector: jest.fn(),
}));

jest.mock("@/store/auth/operations/updateUserEmail", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    unwrap: jest.fn().mockResolvedValue(undefined),
  })),
}));

jest.mock("@/store/auth/selectors", () => ({
  userEmailSelector: jest.fn(),
}));

jest.mock("@/utils/settings", () => ({
  getChangeEmailDefaultValues: jest.fn((email) => ({
    newEmail: email,
    password: "",
  })),
}));

jest.mock("@/utils/forms/validations/passwordValidation", () => ({
  getPasswordRules: jest.fn(() => []),
}));

jest.mock("@/utils/forms/validations/emailValidation", () => ({
  getEmailRules: jest.fn(() => []),
}));

jest.mock("@/utils/isSubmitDisabled", () => ({
  __esModule: true,
  default: jest.fn(() => false),
}));

jest.mock("@/utils/isSubmitLoading", () => ({
  __esModule: true,
  default: jest.fn(() => false),
}));

jest.mock("@/utils/getErrorStatus", () => ({
  isErrorStatusIncorrectData: jest.fn(),
  isErrorStatusUnauthorized: jest.fn(),
}));

jest.mock("@/views/shared/antd/Typography", () => ({
  __esModule: true,
  Title: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
}));

jest.mock("@/views/shared/antd/Form", () => {
  const Form = ({ children, onFinish, ...props }: any) => (
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
  default: ({ name, label, placeholder, type }: any) => (
    <div>
      <label htmlFor={name}>{label}</label>
      <input id={name} name={name} placeholder={placeholder} type={type} />
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
    const { type, size, block, loading, ...htmlProps } = props;

    return (
      <button type={htmlType} {...htmlProps}>
        {children}
      </button>
    );
  },
}));

describe("ChangeEmail", () => {
  const mockDispatch = jest.fn();
  const mockSetError = jest.fn();

  const renderComponent = () => render(<ChangeEmail />);

  beforeEach(() => {
    jest.clearAllMocks();
    jest.mocked(useAppDispatch).mockReturnValue(mockDispatch);
    jest.mocked(useAppSelector).mockReturnValue("old@example.com");

    jest.mocked(useForm).mockReturnValue({
      control: {} as any,
      handleSubmit: (callback: any) => () =>
        callback({
          newEmail: "new@example.com",
          password: "password123",
        }),
      formState: {},
      setError: mockSetError,
      reset: jest.fn(),
    } as any);

    mockDispatch.mockReturnValue({
      unwrap: jest.fn().mockResolvedValue(undefined),
    });
  });

  it("renders title and form fields", () => {
    renderComponent();

    expect(
      screen.getByRole("heading", { name: "Change email title" })
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter your email")).toBeInTheDocument();
    expect(screen.getByLabelText("Current password")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter your password")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Save changes" })
    ).toBeInTheDocument();
  });

  it("dispatches updateUserEmail with form values and locale", async () => {
    renderComponent();

    fireEvent.submit(
      screen.getByRole("button", { name: "Save changes" }).closest("form")!
    );

    await waitFor(() => {
      expect(updateUserEmail).toHaveBeenCalledWith({
        newEmail: "new@example.com",
        password: "password123",
        locale: "en",
      });
    });
  });

  it("sets password error when current password is incorrect", async () => {
    const error = new Error("Incorrect password");

    mockDispatch.mockReturnValue({
      unwrap: jest.fn().mockRejectedValue(error),
    });

    jest.mocked(isErrorStatusIncorrectData).mockReturnValue(true);
    jest.mocked(isErrorStatusUnauthorized).mockReturnValue(false);

    renderComponent();

    fireEvent.submit(
      screen.getByRole("button", { name: "Save changes" }).closest("form")!
    );

    await waitFor(() => {
      expect(mockSetError).toHaveBeenCalledWith("password", {
        type: "manual",
        message: "Current password is incorrect",
      });
    });
  });

  it("sets new email error when email already exists", async () => {
    const error = new Error("Email already exists");

    mockDispatch.mockReturnValue({
      unwrap: jest.fn().mockRejectedValue(error),
    });

    jest.mocked(isErrorStatusIncorrectData).mockReturnValue(false);
    jest.mocked(isErrorStatusUnauthorized).mockReturnValue(true);

    renderComponent();

    fireEvent.submit(
      screen.getByRole("button", { name: "Save changes" }).closest("form")!
    );

    await waitFor(() => {
      expect(mockSetError).toHaveBeenCalledWith("newEmail", {
        type: "manual",
        message: "This email address is already in use!",
      });
    });
  });

  it("resets form when email changes", () => {
    const reset = jest.fn();

    jest.mocked(useForm).mockReturnValue({
      control: {} as any,
      handleSubmit: (callback: any) => callback,
      formState: {},
      setError: mockSetError,
      reset,
    } as any);

    renderComponent();

    expect(reset).toHaveBeenCalledWith({
      newEmail: "old@example.com",
      password: "",
    });
  });
});
