import { render, screen } from "@testing-library/react";

import DatePickerField from "../";

const datePickerMock = jest.fn();
jest.mock("@/views/shared/antd/DatePicker", () => ({
  __esModule: true,
  default: (props: any) => {
    datePickerMock(props);

    return <div data-testid="date-picker" />;
  },
}));

describe("DatePickerField", () => {
  describe("renders component", () => {
    const defaultProps = {};

    const renderComponent = (props = defaultProps) =>
      render(<DatePickerField {...props} />);

    it("with default props", () => {
      renderComponent();

      expect(screen.getByTestId("input-field")).toBeInTheDocument();
      expect(screen.getByTestId("date-picker")).toBeInTheDocument();

      expect(screen.queryByTestId("input-field-label")).not.toBeInTheDocument();
      expect(screen.queryByTestId("input-field-error")).not.toBeInTheDocument();
    });
  });
});
