import { fireEvent, render, screen } from "@testing-library/react";
import {
  parsePhoneNumber,
  getCountryCallingCode,
} from "react-phone-number-input";

import InputPhoneNumberField, { InputPhoneNumberFieldProps } from "../";

const inputMock = jest.fn();
const selectMock = jest.fn();

const mockedParsePhoneNumber = parsePhoneNumber as jest.MockedFunction<
  typeof parsePhoneNumber
>;

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

jest.mock("react-phone-number-input", () => ({
  getCountries: () => ["UA", "US"],
  getCountryCallingCode: jest.fn(),
  parsePhoneNumber: jest.fn(),
}));

jest.mock("../CountryOption", () => ({
  __esModule: true,
  default: ({ country }: any) => <span>{country}</span>,
}));

jest.mock("@/views/shared/antd/Select", () => ({
  __esModule: true,
  default: (props: any) => {
    selectMock(props);

    return (
      <select
        data-testid="country-select"
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
      >
        {props.options.map((item: any) => (
          <option key={item.value} value={item.value}>
            {item.value}
          </option>
        ))}
      </select>
    );
  },
}));

jest.mock("@/views/shared/antd/Input", () => ({
  __esModule: true,
  default: (props: any) => {
    inputMock(props);

    return (
      <input
        data-testid="phone-input"
        value={props.value}
        placeholder={props.placeholder}
        onChange={props.onChange}
      />
    );
  },
}));

jest.mock("@/views/shared/antd/Typography", () => ({
  Text: ({ children }: any) => <span>{children}</span>,
}));

describe("InputPhoneNumberField", () => {
  const defaultProps: InputPhoneNumberFieldProps = {
    onChange: jest.fn(),
  };

  const renderComponent = (props: InputPhoneNumberFieldProps = defaultProps) =>
    render(<InputPhoneNumberField {...props} />);

  beforeEach(() => {
    jest.clearAllMocks();
    (parsePhoneNumber as jest.Mock).mockReturnValue(undefined);

    (getCountryCallingCode as jest.Mock).mockImplementation((country) =>
      country === "UA" ? "380" : "1"
    );
  });

  it("renders label", () => {
    renderComponent({
      ...defaultProps,
      label: "Phone",
    });

    expect(screen.getByText("Phone")).toBeInTheDocument();
  });

  it("renders placeholder", () => {
    renderComponent();

    expect(
      screen.getByPlaceholderText("form.inputPhoneNumber.placeholder")
    ).toBeInTheDocument();
  });

  it("renders error message", () => {
    renderComponent({
      ...defaultProps,
      errors: {
        type: "required",
        message: "Required",
      },
    });

    expect(screen.getByText("Required")).toBeInTheDocument();
  });

  it("calls onChange with undefined when input is cleared", () => {
    const onChange = jest.fn();

    renderComponent({
      ...defaultProps,
      onChange,
    });

    fireEvent.change(screen.getByTestId("phone-input"), {
      target: { value: "501112233" },
    });

    fireEvent.change(screen.getByTestId("phone-input"), {
      target: { value: "" },
    });

    expect(onChange).toHaveBeenLastCalledWith(undefined);
  });

  it("changes country", () => {
    const onChange = jest.fn();

    renderComponent({
      ...defaultProps,
      onChange,
    });

    fireEvent.change(screen.getByTestId("phone-input"), {
      target: { value: "501112233" },
    });

    fireEvent.change(screen.getByTestId("country-select"), {
      target: { value: "US" },
    });

    expect(onChange).toHaveBeenLastCalledWith("+1501112233");
  });

  it("initializes value from parsePhoneNumber", () => {
    mockedParsePhoneNumber.mockReturnValue({
      country: "US",
      nationalNumber: "999888777",
    } as any);

    renderComponent({
      ...defaultProps,
      value: "+1999888777",
    });

    expect(inputMock).toHaveBeenCalledWith(
      expect.objectContaining({
        value: "999888777",
      })
    );

    expect(selectMock).toHaveBeenCalledWith(
      expect.objectContaining({
        value: "US",
      })
    );
  });

  it("passes status to Input when there are no errors", () => {
    renderComponent({
      ...defaultProps,
      status: "warning",
    });

    expect(inputMock).toHaveBeenCalledWith(
      expect.objectContaining({
        status: "warning",
      })
    );
  });

  it("overrides status with error when errors exist", () => {
    renderComponent({
      ...defaultProps,
      status: "warning",
      errors: {
        type: "required",
        message: "Required",
      },
    });

    expect(inputMock).toHaveBeenCalledWith(
      expect.objectContaining({
        status: "error",
      })
    );
  });

  it("does not update country and national number when phone value cannot be parsed", () => {
    mockedParsePhoneNumber.mockReturnValue(undefined);

    renderComponent({
      ...defaultProps,
      value: "+380501112233",
      defaultCountry: "UA",
    });

    expect(selectMock).toHaveBeenCalledWith(
      expect.objectContaining({
        value: "UA",
      })
    );

    expect(inputMock).toHaveBeenCalledWith(
      expect.objectContaining({
        value: "",
      })
    );
  });

  it("keeps default values when phone value cannot be parsed", () => {
    mockedParsePhoneNumber.mockReturnValue(undefined);

    renderComponent({
      ...defaultProps,
      value: "+380501112233",
      defaultCountry: "UA",
    });

    expect(selectMock).toHaveBeenLastCalledWith(
      expect.objectContaining({
        value: "UA",
      })
    );

    expect(inputMock).toHaveBeenLastCalledWith(
      expect.objectContaining({
        value: "",
      })
    );
  });

  it("changes country without calling onChange when national number is empty", () => {
    const onChange = jest.fn();

    renderComponent({
      ...defaultProps,
      onChange,
    });

    fireEvent.change(screen.getByTestId("country-select"), {
      target: { value: "US" },
    });

    expect(onChange).not.toHaveBeenCalled();
  });

  it("uses defaultCountry when parsed phone number has no country", () => {
    mockedParsePhoneNumber.mockReturnValue({
      country: undefined,
      nationalNumber: "999888777",
    } as any);

    renderComponent({
      ...defaultProps,
      value: "+9998888777",
      defaultCountry: "UA",
    });

    expect(selectMock).toHaveBeenLastCalledWith(
      expect.objectContaining({
        value: "UA",
      })
    );
  });
});
