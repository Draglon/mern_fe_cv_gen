import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useLocale, useTranslations } from "next-intl";

import { loginRoute } from "@/lib/routes";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import fetchRegister from "@/store/auth/operations/fetchRegister";
import { isErrorStatusUnauthorized } from "@/utils/getErrorStatus";
import isSubmitDisabled from "@/utils/isSubmitDisabled";
import isSubmitLoading from "@/utils/isSubmitLoading";

import Registration from "../index";

const mockPush = jest.fn();
const mockDispatch = jest.fn();

jest.mock("next-intl", () => ({
  useLocale: jest.fn(),
  useTranslations: jest.fn(),
}));

const mockHandleSubmit = jest.fn();
const mockSetError = jest.fn();

jest.mock("react-hook-form", () => ({
  useForm: () => ({
    control: {},
    formState: {
      isValid: true,
      isSubmitting: false,
    },
    setError: mockSetError,
    handleSubmit: (callback: any) => {
      mockHandleSubmit.mockImplementation(() =>
        callback({
          userName: "John",
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

jest.mock("@/store/auth/operations/fetchRegister", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("@/utils/getErrorStatus", () => ({
  isErrorStatusUnauthorized: jest.fn(),
}));

jest.mock("@/utils/isSubmitDisabled", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("@/utils/isSubmitLoading", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("@/utils/forms/validations/userNameValidation", () => ({
  getUserNameRules: jest.fn(() => []),
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
const mockedIsSubmitDisabled = jest.mocked(isSubmitDisabled);
const mockedIsSubmitLoading = jest.mocked(isSubmitLoading);
const mockedFetchRegister = jest.mocked(fetchRegister);

describe("Registration", () => {
  const translations: Record<string, string> = {
    title: "Registration",
    description: "Sign up to your account",
  };

  const sharedTranslations: Record<string, string> = {
    "form.userName.label": "User name",
    "form.userName.placeholder": "Enter user name",
    "form.email.label": "Email",
    "form.email.placeholder": "Enter email",
    "form.email.errors.alreadyExists": "Email already exists!",
    "form.password.label": "Password",
    "form.password.placeholder": "Enter password",
    signUp: "Sign up",
  };

  const renderComponent = () => render(<Registration />);

  beforeEach(() => {
    jest.clearAllMocks();

    mockedUseLocale.mockReturnValue("en");

    mockedUseTranslations.mockImplementation(
      (namespace?: string) =>
        ((key: string) =>
          namespace === "Registration"
            ? translations[key]
            : sharedTranslations[key]) as any
    );

    mockedUseAppDispatch.mockReturnValue(mockDispatch);
    mockedUseAppSelector.mockReturnValue(null);

    mockedIsSubmitDisabled.mockReturnValue(false);
    mockedIsSubmitLoading.mockReturnValue(false);

    mockedIsErrorStatusUnauthorized.mockReturnValue(false);
  });

  it("renders registration title, description, form", () => {
    renderComponent();

    expect(
      screen.getByRole("heading", { name: "Registration" })
    ).toBeInTheDocument();
    expect(screen.getByText("Sign up to your account")).toBeInTheDocument();

    expect(screen.getByLabelText("User name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();

    expect(screen.getByPlaceholderText("Enter user name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter password")).toBeInTheDocument();

    expect(screen.getByRole("button", { name: "Sign up" })).toBeInTheDocument();
  });

  it("disables submit button when form is invalid", () => {
    mockedIsSubmitDisabled.mockReturnValue(true);

    renderComponent();

    expect(screen.getByRole("button", { name: "Sign up" })).toBeDisabled();
  });

  it("shows loading state when submitting", () => {
    mockedIsSubmitLoading.mockReturnValue(true);

    renderComponent();

    expect(screen.getByRole("button", { name: "Sign up" })).toBeDisabled();
  });

  it("dispatches fetchRegister with form values and locale", async () => {
    const unwrap = jest.fn().mockResolvedValue({});
    const dispatch = jest.fn().mockReturnValue({ unwrap });

    mockedUseAppDispatch.mockReturnValue(jest.fn().mockReturnValue({ unwrap }));
    mockedUseAppDispatch.mockReturnValue(dispatch);
    mockedFetchRegister.mockReturnValue({
      type: "auth/register",
    } as any);

    renderComponent();

    fireEvent.change(screen.getByLabelText("User name"), {
      target: { value: "John" },
    });

    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "john@example.com" },
    });

    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Sign up" }));

    await waitFor(() => {
      expect(mockedFetchRegister).toHaveBeenCalledWith({
        userName: "John",
        email: "john@example.com",
        password: "password123",
        locale: "en",
      });
    });

    expect(dispatch).toHaveBeenCalled();
    expect(unwrap).toHaveBeenCalled();
  });

  it("sets email error when registration returns unauthorized error", async () => {
    const error = { status: 401 };

    const unwrap = jest.fn().mockRejectedValue(error);
    const dispatch = jest.fn().mockReturnValue({ unwrap });

    mockedUseAppDispatch.mockReturnValue(dispatch);
    mockedFetchRegister.mockReturnValue({
      type: "auth/register",
    } as any);

    mockedIsErrorStatusUnauthorized.mockReturnValue(true);

    renderComponent();

    fireEvent.click(screen.getByRole("button", { name: "Sign up" }));

    await waitFor(() => {
      expect(mockedIsErrorStatusUnauthorized).toHaveBeenCalledWith(error);

      expect(mockSetError).toHaveBeenCalledWith("email", {
        type: "manual",
        message: "Email already exists!",
      });
    });
  });

  it("redirects to login page after successful registration", async () => {
    const unwrap = jest.fn().mockResolvedValue({
      token: "test-token",
    });

    const dispatch = jest.fn().mockReturnValue({ unwrap });

    mockedUseAppDispatch.mockReturnValue(dispatch);

    mockedFetchRegister.mockReturnValue({
      type: "auth/register",
    } as any);

    renderComponent();

    fireEvent.click(screen.getByRole("button", { name: "Sign up" }));

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith(loginRoute);
    });
  });

  it("does not redirect when registration response has no token", async () => {
    const unwrap = jest.fn().mockResolvedValue({});

    const dispatch = jest.fn().mockReturnValue({ unwrap });

    mockedUseAppDispatch.mockReturnValue(dispatch);

    mockedFetchRegister.mockReturnValue({
      type: "auth/register",
    } as any);

    renderComponent();

    fireEvent.click(screen.getByRole("button", { name: "Sign up" }));

    await waitFor(() => {
      expect(unwrap).toHaveBeenCalled();
    });

    expect(mockPush).not.toHaveBeenCalled();
  });
});
