import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useForm } from "react-hook-form";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import createPersonalInfo from "@/store/personalInfo/operations/createPersonalInfo";
import updatePersonalInfo from "@/store/personalInfo/operations/updatePersonalInfo";
import { personalInfoByLocaleSelector } from "@/store/personalInfo/selectors";

import PersonalInfoForm from "..";

jest.mock("next-intl", () => ({
  useLocale: () => "en",
  useTranslations: () => (key: string, values?: Record<string, unknown>) =>
    typeof values?.index === "number" ? `${key}-${values.index}` : key,
}));

const mockedReset = jest.fn();
jest.mock("react-hook-form");

jest.mock("@/store/hooks");
jest.mock("@/store/personalInfo/operations/createPersonalInfo");
jest.mock("@/store/personalInfo/operations/updatePersonalInfo");
const mockCreatePersonalInfo = jest.mocked(createPersonalInfo);
const mockUpdatePersonalInfo = jest.mocked(updatePersonalInfo);
jest.mock("@/store/personalInfo/selectors");
const mockPersonalInfoByLocaleSelector = jest.mocked(
  personalInfoByLocaleSelector
);

jest.mock("antd", () => ({
  Form: ({ children, onFinish, ...props }: any) => (
    <form
      {...props}
      onSubmit={(event) => {
        event.preventDefault();
        onFinish?.(event);
      }}
    >
      {children}
    </form>
  ),
  Divider: () => <div />,
}));

jest.mock("@/views/shared/FormItem", () => {
  function MockFormItem({ controlName }: any) {
    return <div data-testid={controlName} />;
  }

  return MockFormItem;
});

jest.mock("@/views/shared/antd/Button", () => {
  function MockButton({ htmlType, ...props }: any) {
    return <button type={htmlType} {...props} />;
  }

  return MockButton;
});

jest.mock("@/views/shared/InputField", () => {
  function MockInputField() {
    return <input />;
  }

  return MockInputField;
});

jest.mock("@/views/shared/TextAreaField", () => {
  function MockInputField() {
    return <textarea />;
  }

  return MockInputField;
});

jest.mock("@/views/shared/UploadFileField", () => {
  function MockInputUploadFileField() {
    return <input type="file" />;
  }

  return MockInputUploadFileField;
});

jest.mock("@/views/shared/InputPhoneNumberField", () => {
  function MockInputPhoneNumberField() {
    return <input />;
  }

  return MockInputPhoneNumberField;
});

jest.mock("@/views/shared/DatePickerField", () => {
  function MockInputPhoneNumberField() {
    return <input type="date" />;
  }

  return MockInputPhoneNumberField;
});

describe("PersonalInfoForm", () => {
  const dispatch = jest.fn();
  const defaultValues = {
    sectionTitle: "",
    userUrl: [],
    firstName: "",
    lastName: "",
    email: "",
    aboutMe: "",
    address: "",
    phoneNumber: "",
    birthday: "",
    linkedIn: "",
    telegram: "",
    portfolio: "",
  };

  const formValues = {
    sectionTitle: "Personal Info",
    userUrl: [],
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    aboutMe: "Frontend developer",
    address: "Kyiv",
    phoneNumber: "+380501234567",
    birthday: "1995-01-01",
    linkedIn: "https://linkedin.com/in/johndoe",
    telegram: "@johndoe",
    portfolio: "https://johndoe.dev",
  };

  const mockUseAppDispatch = jest.mocked(useAppDispatch);
  const mockUseAppSelector = jest.mocked(useAppSelector);
  const mockUseForm = jest.mocked(useForm);
  const handleSubmit = jest.fn((callback) => () => callback(formValues));

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAppDispatch.mockReturnValue(dispatch);

    mockPersonalInfoByLocaleSelector.mockReturnValue(defaultValues);

    mockUseAppSelector
      .mockImplementationOnce((selector) => selector({} as any))
      .mockReturnValueOnce("personal-info-id");

    mockUseForm.mockReturnValue({
      control: {} as any,
      handleSubmit,
      formState: {} as any,
      reset: mockedReset,
      getValues: jest.fn(),
      watch: jest.fn().mockReturnValue(false),
    } as any);

    dispatch.mockResolvedValue({});
  });

  it("calls reset with default values", () => {
    render(<PersonalInfoForm resumeLocale="en" isEdit={false} />);

    expect(mockPersonalInfoByLocaleSelector).toHaveBeenCalledWith({}, "en");

    expect(mockedReset).toHaveBeenCalledWith(defaultValues);
  });

  it("dispatches updatePersonalInfo in edit mode", async () => {
    render(<PersonalInfoForm resumeLocale="en" isEdit />);

    const form = screen.getByRole("form");

    fireEvent.submit(form);

    await waitFor(() => {
      expect(mockUpdatePersonalInfo).toHaveBeenCalledWith({
        values: formValues,
        locale: "en",
        resumeLocale: "en",
      });
    });

    expect(mockCreatePersonalInfo).not.toHaveBeenCalled();
  });

  it("dispatches createPersonalInfo in create mode", async () => {
    render(<PersonalInfoForm resumeLocale="en" isEdit={false} />);

    const form = screen.getByRole("form");

    fireEvent.submit(form);

    await waitFor(() => {
      expect(mockCreatePersonalInfo).toHaveBeenCalledWith({
        values: formValues,
        locale: "en",
        resumeLocale: "en",
      });
    });

    expect(mockUpdatePersonalInfo).not.toHaveBeenCalled();
  });

  it("dispatches createPersonalInfo when edit mode has no personalInfoId", async () => {
    mockUseAppSelector
      .mockReset()
      .mockImplementationOnce((selector) => selector({} as any))
      .mockReturnValueOnce(undefined);

    render(<PersonalInfoForm resumeLocale="en" isEdit />);

    const form = screen.getByRole("form");

    fireEvent.submit(form);

    await waitFor(() => {
      expect(mockCreatePersonalInfo).toHaveBeenCalledWith({
        values: formValues,
        locale: "en",
        resumeLocale: "en",
      });
    });

    expect(mockUpdatePersonalInfo).not.toHaveBeenCalled();
  });

  it("calls handleSubmit when form is submitted", () => {
    render(<PersonalInfoForm resumeLocale="en" isEdit={false} />);

    const form = screen.getByRole("form");

    fireEvent.submit(form);

    expect(handleSubmit).toHaveBeenCalled();
  });

  it("renders all form fields", () => {
    render(<PersonalInfoForm resumeLocale="en" isEdit={false} />);

    expect(screen.getByTestId("sectionTitle")).toBeInTheDocument();
    expect(screen.getByTestId("userUrl")).toBeInTheDocument();
    expect(screen.getByTestId("firstName")).toBeInTheDocument();
    expect(screen.getByTestId("lastName")).toBeInTheDocument();
    expect(screen.getByTestId("aboutMe")).toBeInTheDocument();
    expect(screen.getByTestId("email")).toBeInTheDocument();
    expect(screen.getByTestId("address")).toBeInTheDocument();
    expect(screen.getByTestId("phoneNumber")).toBeInTheDocument();
    expect(screen.getByTestId("telegram")).toBeInTheDocument();
    expect(screen.getByTestId("birthday")).toBeInTheDocument();
    expect(screen.getByTestId("linkedIn")).toBeInTheDocument();
    expect(screen.getByTestId("portfolio")).toBeInTheDocument();
  });

  it("renders save button", () => {
    render(<PersonalInfoForm resumeLocale="en" isEdit={false} />);

    expect(screen.getByRole("button", { name: "save" })).toBeInTheDocument();
  });

  it("renders form with correct name", () => {
    render(<PersonalInfoForm resumeLocale="en" isEdit={false} />);

    expect(screen.getByRole("form")).toHaveAttribute(
      "name",
      "create-personal-info-en"
    );
  });

  it("passes resumeLocale to personalInfoByLocaleSelector", () => {
    render(<PersonalInfoForm resumeLocale="ua" isEdit={false} />);

    expect(mockPersonalInfoByLocaleSelector).toHaveBeenCalledWith({}, "ua");
  });

  it("resets form when default values change", () => {
    const { rerender } = render(
      <PersonalInfoForm resumeLocale="en" isEdit={false} />
    );

    mockedReset.mockClear();

    const updatedValues = {
      ...defaultValues,
      firstName: "John",
      lastName: "Doe",
    };

    mockPersonalInfoByLocaleSelector.mockReturnValue(updatedValues);

    mockUseAppSelector
      .mockImplementationOnce((selector) => selector({} as any))
      .mockReturnValueOnce("personal-info-id");

    rerender(<PersonalInfoForm resumeLocale="en" isEdit={false} />);

    expect(mockedReset).toHaveBeenCalledWith(updatedValues);
  });

  it("does not dispatch updatePersonalInfo when personalInfoId is missing", async () => {
    mockUseAppSelector
      .mockReset()
      .mockImplementationOnce((selector) => selector({} as any))
      .mockReturnValueOnce(undefined);

    render(<PersonalInfoForm resumeLocale="en" isEdit />);

    fireEvent.submit(screen.getByRole("form"));

    await waitFor(() => {
      expect(mockCreatePersonalInfo).toHaveBeenCalled();
    });

    expect(mockUpdatePersonalInfo).not.toHaveBeenCalled();
  });
});
