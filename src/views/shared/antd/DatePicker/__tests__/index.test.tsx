import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import dayjs from "dayjs";

import DatePicker from "../";

const mockAntdOnChange = jest.fn();

jest.mock("antd", () => ({
  DatePicker: ({ className, onChange }: any) => {
    mockAntdOnChange.mockImplementation(onChange);

    return (
      <div data-testid="antd-date-picker" className={className}>
        DatePicker
      </div>
    );
  },
}));

jest.mock("next-intl", () => ({
  useLocale: jest.fn(() => "en"),
}));

describe("DatePicker", () => {
  describe("renders component", () => {
    const defaultProps = {
      className: "data-picker--class",
      value: "2020-12-20",
      onChange: jest.fn(),
    };

    const renderComponent = (props = defaultProps) =>
      render(<DatePicker {...props} />);

    it("with default props", () => {
      renderComponent();

      const picker = screen.getByTestId("antd-date-picker");

      expect(picker).toHaveClass("date-picker", "data-picker--class");
    });

    it("calls onChange with formatted date", () => {
      const date = dayjs("2020-12-20");
      renderComponent();

      mockAntdOnChange(date, "2020-12-20");

      expect(defaultProps.onChange).toHaveBeenCalledWith("2020-12-20");
    });

    it("calls onChange with null when date is empty", () => {
      renderComponent();

      mockAntdOnChange(null, "");

      expect(defaultProps.onChange).toHaveBeenCalledWith(null);
    });
  });
});
