import { render, screen } from "@testing-library/react";
import dayjs from "dayjs";

import DatePicker, { DatePickerProps } from "../";
import antdLocale from "@/lib/antdLocale";
import { DEFAULT_LOCALE } from "@/lib/constants/locales";

const mockAntdOnChange = jest.fn();
const mockDatePicker = jest.fn();

jest.mock("antd", () => ({
  DatePicker: (props: any) => {
    mockDatePicker(props);
    mockAntdOnChange.mockImplementation(props.onChange);

    return (
      <div data-testid="antd-date-picker" className={props.className}>
        DatePicker
      </div>
    );
  },
}));

jest.mock("@/lib/antdLocale", () =>
  jest.fn(() => ({
    DatePicker: {},
  }))
);

describe("DatePicker", () => {
  const defaultProps: DatePickerProps = {
    className: "data-picker--class",
    value: "2020-12-20",
    onChange: jest.fn(),
  };

  const renderComponent = (props: Partial<DatePickerProps> = defaultProps) =>
    render(<DatePicker {...props} />);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders with default props", () => {
    renderComponent();

    expect(screen.getByTestId("antd-date-picker")).toHaveClass(
      "date-picker",
      "data-picker--class"
    );
  });

  it("passes parsed dayjs value", () => {
    renderComponent();

    expect(mockDatePicker).toHaveBeenCalledWith(
      expect.objectContaining({
        value: expect.any(Object),
      })
    );
  });

  it("passes null when value is invalid", () => {
    renderComponent({
      ...defaultProps,
      value: "invalid-date",
    });

    expect(mockDatePicker).toHaveBeenCalledWith(
      expect.objectContaining({
        value: null,
      })
    );
  });

  it("passes null when value is undefined", () => {
    renderComponent({
      ...defaultProps,
      value: undefined,
    });

    expect(mockDatePicker).toHaveBeenCalledWith(
      expect.objectContaining({
        value: null,
      })
    );
  });

  it("uses default locale", () => {
    renderComponent();

    expect(antdLocale).toHaveBeenCalledWith(DEFAULT_LOCALE);
  });

  it("calls onChange with formatted date", () => {
    renderComponent();

    mockAntdOnChange(dayjs("2020-12-20"), "2020-12-20");

    expect(defaultProps.onChange).toHaveBeenCalledWith("2020-12-20");
  });

  it("calls onChange with null when date is null", () => {
    renderComponent();

    mockAntdOnChange(null, "");

    expect(defaultProps.onChange).toHaveBeenCalledWith(null);
  });

  it("calls onChange with null when date is array", () => {
    renderComponent();

    mockAntdOnChange([], "");

    expect(defaultProps.onChange).toHaveBeenCalledWith(null);
  });
});
