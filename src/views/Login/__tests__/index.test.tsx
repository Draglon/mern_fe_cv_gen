import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useLocale, useTranslations } from "next-intl";

import Login from "../index";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import fetchAuth from "@/store/auth/operations/fetchAuth";
import {
  isErrorStatusUnauthorized,
  isErrorStatusNotFound,
} from "@/utils/getErrorStatus";
import isSubmitDisabled from "@/utils/isSubmitDisabled";
import isSubmitLoading from "@/utils/isSubmitLoading";

const mockPush = jest.fn();
const mockDispatch = jest.fn();

jest.mock("next-intl", () => ({
  useLocale: jest.fn(),
  useTranslations: jest.fn(),
}));

const mockHandleSubmit = jest.fn();

jest.mock("react-hook-form", () => ({
  useForm: () => ({
    control: {},
    formState: {
      isValid: true,
      isSubmitting: false,
    },
    handleSubmit: (callback: any) => {
      mockHandleSubmit.mockImplementation(() =>
        callback({
          email: "john@example.com",
          password: "password123",
        })
      );

      return mockHandleSubmit;
    },
  }),
}));

jest.mock("@/i18n/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

jest.mock("@/store/hooks", () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

jest.mock("@/store/auth/operations/fetchAuth", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("@/utils/getErrorStatus", () => ({
  isErrorStatusUnauthorized: jest.fn(),
  isErrorStatusNotFound: jest.fn(),
}));

jest.mock("@/utils/isSubmitDisabled", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("@/utils/isSubmitLoading", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("@/utils/forms/validations/emailValidation", () => ({
  getEmailRules: jest.fn(() => []),
}));

jest.mock("@/utils/forms/validations/passwordValidation", () => ({
  getPasswordRules: jest.fn(() => []),
}));

jest.mock("@/views/shared/antd/Typography", () => ({
  Title: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
  Paragraph: ({ children, ...props }: any) => <p {...props}>{children}</p>,
}));

jest.mock("@/views/shared/antd/Alert", () => ({
  __esModule: true,
  default: ({ title }: { title: string }) => <div role="alert">{title}</div>,
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

jest.mock("@/views/shared/antd/Button", () => ({
  __esModule: true,
  default: ({
    children,
    htmlType,
    disabled,
    loading,
    block,
    ...props
  }: any) => (
    <button {...props} type={htmlType} disabled={disabled || loading}>
      {children}
    </button>
  ),
}));

const mockedUseLocale = jest.mocked(useLocale);
const mockedUseTranslations = jest.mocked(useTranslations);
const mockedUseAppDispatch = jest.mocked(useAppDispatch);
const mockedUseAppSelector = jest.mocked(useAppSelector);
const mockedIsErrorStatusUnauthorized = jest.mocked(isErrorStatusUnauthorized);
const mockedIsErrorStatusNotFound = jest.mocked(isErrorStatusNotFound);
const mockedIsSubmitDisabled = jest.mocked(isSubmitDisabled);
const mockedIsSubmitLoading = jest.mocked(isSubmitLoading);

describe("Login", () => {
  const translations: Record<string, string> = {
    title: "Login",
    description: "Sign in to your account",
    submitButton: "Sign in",
    "alert.errors.invalidEmailOrPassword": "Invalid email or password",
  };

  const sharedTranslations: Record<string, string> = {
    "form.email.label": "Email",
    "form.email.placeholder": "Enter email",
    "form.password.label": "Password",
    "form.password.placeholder": "Enter password",
  };

  beforeEach(() => {
    jest.clearAllMocks();

    mockedUseLocale.mockReturnValue("en");

    mockedUseTranslations.mockImplementation(
      (namespace?: string) =>
        ((key: string) =>
          namespace === "Login"
            ? translations[key]
            : sharedTranslations[key]) as any
    );

    mockedUseAppDispatch.mockReturnValue(mockDispatch);
    mockedUseAppSelector.mockReturnValue(null);

    mockedIsSubmitDisabled.mockReturnValue(false);
    mockedIsSubmitLoading.mockReturnValue(false);

    mockedIsErrorStatusUnauthorized.mockReturnValue(false);
    mockedIsErrorStatusNotFound.mockReturnValue(false);
  });

  const renderComponent = () => render(<Login />);

  it("renders login title and description", () => {
    renderComponent();

    expect(screen.getByRole("heading", { name: "Login" })).toBeInTheDocument();

    expect(screen.getByText("Sign in to your account")).toBeInTheDocument();
  });

  it("renders email and password fields", () => {
    renderComponent();

    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();

    expect(screen.getByPlaceholderText("Enter email")).toBeInTheDocument();

    expect(screen.getByPlaceholderText("Enter password")).toBeInTheDocument();
  });

  it("renders submit button", () => {
    renderComponent();

    expect(screen.getByRole("button", { name: "Sign in" })).toBeInTheDocument();
  });

  it("disables submit button when form is invalid", () => {
    mockedIsSubmitDisabled.mockReturnValue(true);

    renderComponent();

    expect(screen.getByRole("button", { name: "Sign in" })).toBeDisabled();
  });

  it("shows loading state when submitting", () => {
    mockedIsSubmitLoading.mockReturnValue(true);

    renderComponent();

    expect(screen.getByRole("button", { name: "Sign in" })).toBeDisabled();
  });

  it("dispatches fetchAuth with form values and locale", async () => {
    const unwrap = jest.fn().mockResolvedValue({});

    mockedUseAppDispatch.mockReturnValue(jest.fn().mockReturnValue({ unwrap }));

    renderComponent();

    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "john@example.com" },
    });

    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "password123" },
    });

    fireEvent.submit(screen.getByRole("button", { name: "Sign in" }));

    await waitFor(() => {
      expect(unwrap).toHaveBeenCalled();
    });

    expect(fetchAuth).toHaveBeenCalledWith({
      email: "john@example.com",
      password: "password123",
      locale: "en",
    });
  });

  it("saves token and redirects after successful login", async () => {
    const unwrap = jest.fn().mockResolvedValue({
      token: "test-token",
    });

    mockedUseAppDispatch.mockReturnValue(jest.fn().mockReturnValue({ unwrap }));

    const setItemSpy = jest.spyOn(Storage.prototype, "setItem");

    renderComponent();

    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "john@example.com" },
    });

    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "password123" },
    });

    fireEvent.submit(screen.getByRole("button", { name: "Sign in" }));

    await waitFor(() => {
      expect(setItemSpy).toHaveBeenCalledWith("token", "test-token");
    });

    expect(mockPush).toHaveBeenCalledWith(expect.any(String));

    setItemSpy.mockRestore();
  });

  it("shows invalid credentials alert for unauthorized error", () => {
    mockedUseAppSelector.mockReturnValue({
      status: 401,
    });

    mockedIsErrorStatusUnauthorized.mockReturnValue(true);

    renderComponent();

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Invalid email or password"
    );
  });

  it("shows invalid credentials alert for not found error", () => {
    mockedUseAppSelector.mockReturnValue({
      status: 404,
    });

    mockedIsErrorStatusNotFound.mockReturnValue(true);

    renderComponent();

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Invalid email or password"
    );
  });

  it("does not show invalid credentials alert when there is no matching error", () => {
    renderComponent();

    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });
});
