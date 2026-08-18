import { render, screen, fireEvent } from "@testing-library/react";
import { useWatch } from "react-hook-form";

import PersonalEducationFormItem from "../index";

import useResumeEditRules from "@/hooks/useResumeEditRules";
import { getInputEndDateRules } from "@/utils/forms/validations/resume/inputDatePickerValidation";

jest.mock("next-intl", () => ({
  useTranslations: (namespace: string) => {
    if (namespace === "PersonalEducation") {
      return (key: string, values?: { index?: number }) =>
        values?.index
          ? `PersonalEducation.${key}.${values.index}`
          : `PersonalEducation.${key}`;
    }

    return (key: string) => `shared.${key}`;
  },
}));

jest.mock("react-hook-form", () => ({
  ...jest.requireActual("react-hook-form"),
  useWatch: jest.fn(),
}));

jest.mock("@/hooks/useResumeEditRules", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("@/utils/forms/validations/resume/inputDatePickerValidation", () => ({
  getInputEndDateRules: jest.fn(),
}));

jest.mock("@/views/shared/FormItem", () => ({
  __esModule: true,
  default: ({
    label,
    placeholder,
    disabled,
    controlName,
  }: {
    label?: string;
    placeholder?: string;
    disabled?: boolean;
    controlName?: string;
  }) => (
    <div data-testid={`form-item-${controlName}`} data-disabled={disabled}>
      {label}
      {placeholder}
    </div>
  ),
}));

jest.mock("@/views/shared/antd/Button", () => ({
  __esModule: true,
  default: ({
    children,
    onClick,
  }: {
    children: React.ReactNode;
    onClick?: () => void;
  }) => (
    <button type="button" onClick={onClick}>
      {children}
    </button>
  ),
}));

jest.mock("@/views/shared/antd/Typography", () => ({
  Title: ({ children }: { children: React.ReactNode }) => <h3>{children}</h3>,
}));

jest.mock("@/views/shared/InputField", () => ({
  __esModule: true,
  default: () => <input />,
}));

jest.mock("@/views/shared/DatePickerField", () => ({
  __esModule: true,
  default: () => <input />,
}));

jest.mock("@/views/shared/CheckboxField", () => ({
  __esModule: true,
  default: () => <input type="checkbox" />,
}));

jest.mock("@ant-design/icons", () => ({
  DeleteOutlined: () => <span data-testid="delete-icon" />,
}));

jest.mock("antd", () => ({
  Space: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

const mockedUseWatch = useWatch as jest.Mock;
const mockedUseResumeEditRules = jest.mocked(useResumeEditRules);
const mockedGetInputEndDateRules = jest.mocked(getInputEndDateRules);

describe("PersonalEducationFormItem", () => {
  const control = {} as never;
  const getValues = jest.fn();
  const remove = jest.fn();

  const rules = {
    inputTextRules: [],
    datePickerRules: [],
  };

  beforeEach(() => {
    jest.clearAllMocks();

    mockedUseResumeEditRules.mockReturnValue(rules as never);

    mockedGetInputEndDateRules.mockReturnValue({
      required: {
        value: false,
        message: "",
      },
      validate: {
        validDate: () => true,
        endDateAfterStart: () => true,
      },
    });
  });

  it("renders education fields", () => {
    mockedUseWatch.mockReturnValue(false);

    render(
      <PersonalEducationFormItem
        index={0}
        control={control}
        remove={remove}
        getValues={getValues}
        resumeLocale="en"
      />
    );

    expect(
      screen.getByTestId("form-item-education.0.institute")
    ).toBeInTheDocument();

    expect(
      screen.getByTestId("form-item-education.0.degree")
    ).toBeInTheDocument();

    expect(
      screen.getByTestId("form-item-education.0.faculty")
    ).toBeInTheDocument();

    expect(
      screen.getByTestId("form-item-education.0.specialization")
    ).toBeInTheDocument();

    expect(
      screen.getByTestId("form-item-education.0.startDate")
    ).toBeInTheDocument();

    expect(
      screen.getByTestId("form-item-education.0.endDate")
    ).toBeInTheDocument();
  });

  it("calls useWatch with the current education path", () => {
    mockedUseWatch.mockReturnValue(false);

    render(
      <PersonalEducationFormItem
        index={2}
        control={control}
        remove={remove}
        getValues={getValues}
        resumeLocale="en"
      />
    );

    expect(mockedUseWatch).toHaveBeenCalledWith({
      control,
      name: "education.2.isCurrent",
    });
  });

  it("disables end date when education is current", () => {
    mockedUseWatch.mockReturnValue(true);

    render(
      <PersonalEducationFormItem
        index={0}
        control={control}
        remove={remove}
        getValues={getValues}
        resumeLocale="en"
      />
    );

    expect(screen.getByTestId("form-item-education.0.endDate")).toHaveAttribute(
      "data-disabled",
      "true"
    );
  });

  it("does not disable end date when education is not current", () => {
    mockedUseWatch.mockReturnValue(false);

    render(
      <PersonalEducationFormItem
        index={0}
        control={control}
        remove={remove}
        getValues={getValues}
        resumeLocale="en"
      />
    );

    expect(screen.getByTestId("form-item-education.0.endDate")).toHaveAttribute(
      "data-disabled",
      "false"
    );
  });

  it("calls remove with the education index", () => {
    mockedUseWatch.mockReturnValue(false);

    render(
      <PersonalEducationFormItem
        index={3}
        control={control}
        remove={remove}
        getValues={getValues}
        resumeLocale="en"
      />
    );

    fireEvent.click(screen.getByRole("button"));

    expect(remove).toHaveBeenCalledWith(3);
  });

  it("calls getInputEndDateRules with correct paths", () => {
    mockedUseWatch.mockReturnValue(false);

    render(
      <PersonalEducationFormItem
        index={2}
        control={control}
        remove={remove}
        getValues={getValues}
        resumeLocale="en"
      />
    );

    expect(mockedGetInputEndDateRules).toHaveBeenCalledWith({
      tShared: expect.any(Function),
      getValues,
      startDatePath: "education.2.startDate",
      isCurrentPath: "education.2.isCurrent",
    });
  });

  it("uses resume locale for date fields", () => {
    mockedUseWatch.mockReturnValue(false);

    render(
      <PersonalEducationFormItem
        index={0}
        control={control}
        remove={remove}
        getValues={getValues}
        resumeLocale="ua"
      />
    );

    expect(
      screen.getByTestId("form-item-education.0.startDate")
    ).toBeInTheDocument();

    expect(
      screen.getByTestId("form-item-education.0.endDate")
    ).toBeInTheDocument();
  });
});
