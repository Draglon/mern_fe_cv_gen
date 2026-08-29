import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useLocale, useTranslations } from "next-intl";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import updateUserProfile from "@/store/auth/operations/updateUserProfile";
import isSubmitDisabled from "@/utils/isSubmitDisabled";
import isSubmitLoading from "@/utils/isSubmitLoading";

import Profile from "..";

const mockDispatch = jest.fn();
jest.mock("next-intl", () => ({
  useLocale: jest.fn(),
  useTranslations: jest.fn(),
}));

const mockReset = jest.fn();
const mockHandleSubmit = jest.fn();
jest.mock("react-hook-form", () => ({
  useForm: () => ({
    control: {},
    formState: {
      isValid: true,
      isSubmitting: false,
    },
    reset: mockReset,
    handleSubmit: (callback: any) => {
      mockHandleSubmit.mockImplementation(() =>
        callback({
          avatarUrl: null,
          userName: "NikName",
          firstName: "John",
          lastName: "Doe",
        })
      );

      return mockHandleSubmit;
    },
  }),
}));

jest.mock("@/store/hooks", () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

jest.mock("@/store/auth/operations/updateUserProfile", () => ({
  __esModule: true,
  default: jest.fn(),
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

jest.mock("@/utils/forms/validations/nameValidation", () => ({
  getNameRules: jest.fn(() => []),
}));

jest.mock("@/views/shared/antd/Typography", () => ({
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
  default: ({ name, label, placeholder, Field }: any) => (
    <div>
      <label htmlFor={name}>{label}</label>

      <Field id={name} name={name} placeholder={placeholder} />
    </div>
  ),
}));

jest.mock("@/views/shared/UploadFileField", () => ({
  __esModule: true,
  default: ({ name, ...props }: any) => (
    <input {...props} data-testid="upload-file-field" name={name} type="file" />
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
const mockedIsSubmitDisabled = jest.mocked(isSubmitDisabled);
const mockedIsSubmitLoading = jest.mocked(isSubmitLoading);
const mockedUpdateUserProfile = jest.mocked(updateUserProfile);

describe("Profile", () => {
  const translations: Record<string, string> = {
    title: "Profile",
  };

  const sharedTranslations: Record<string, string> = {
    "form.avatarUrl.label": "Avatar",
    "form.userName.label": "User name",
    "form.userName.placeholder": "Enter user name",
    "form.firstName.label": "First name",
    "form.firstName.placeholder": "Enter first name",
    "form.lastName.label": "Last name",
    "form.lastName.placeholder": "Enter last name",
    "form.submitButton": "Save changes",
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockDispatch.mockReset();

    mockedUseLocale.mockReturnValue("en");
    mockedUseTranslations.mockImplementation(
      (namespace?: string) =>
        ((key: string) =>
          namespace === "Profile"
            ? translations[key]
            : sharedTranslations[key]) as any
    );

    mockedUseAppDispatch.mockReturnValue(mockDispatch);
    mockedUseAppSelector.mockReturnValue(null);

    mockedIsSubmitDisabled.mockReturnValue(false);
    mockedIsSubmitLoading.mockReturnValue(false);
  });

  const renderComponent = () => render(<Profile />);

  it("renders profile title", () => {
    renderComponent();

    expect(
      screen.getByRole("heading", { name: "Profile" })
    ).toBeInTheDocument();
  });

  it("renders form fields", () => {
    renderComponent();

    expect(screen.getByLabelText("Avatar")).toBeInTheDocument();
    expect(screen.getByLabelText("User name")).toBeInTheDocument();
    expect(screen.getByLabelText("First name")).toBeInTheDocument();
    expect(screen.getByLabelText("Last name")).toBeInTheDocument();

    expect(screen.getByPlaceholderText("Enter user name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter first name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter last name")).toBeInTheDocument();
  });

  it("renders submit button", () => {
    renderComponent();

    expect(
      screen.getByRole("button", { name: "Save changes" })
    ).toBeInTheDocument();
  });

  it("disables submit button when form is invalid", () => {
    mockedIsSubmitDisabled.mockReturnValue(true);

    renderComponent();

    expect(screen.getByRole("button", { name: "Save changes" })).toBeDisabled();
  });

  it("shows loading state when submitting", () => {
    mockedIsSubmitLoading.mockReturnValue(true);

    renderComponent();

    expect(screen.getByRole("button", { name: "Save changes" })).toBeDisabled();
  });

  it("dispatches updateUserProfile with form values and locale", async () => {
    const unwrap = jest.fn().mockResolvedValue({});

    mockDispatch.mockReturnValue({ unwrap });
    mockedUseAppDispatch.mockReturnValue(mockDispatch);

    renderComponent();

    fireEvent.submit(screen.getByRole("button", { name: "Save changes" }));

    expect(mockedUpdateUserProfile).toHaveBeenCalledWith({
      avatarUrl: null,
      userName: "NikName",
      firstName: "John",
      lastName: "Doe",
      locale: "en",
    });

    await waitFor(() => expect(unwrap).toHaveBeenCalled());
  });

  it("calls reset when default values exist", () => {
    const defaultValues = {
      avatarUrl: "avatar.png",
      userName: "Nick",
      firstName: "John",
      lastName: "Doe",
    };

    mockedUseAppSelector.mockReturnValue(defaultValues);

    renderComponent();

    expect(mockReset).toHaveBeenCalledWith(defaultValues);
  });
});
