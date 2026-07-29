import { render, screen } from "@testing-library/react";

import SelectField from "../";

const selectMock = jest.fn();
jest.mock("@/views/shared/antd/DatePicker", () => ({
  __esModule: true,
  default: (props: any) => {
    selectMock(props);

    return <div data-testid="select" />;
  },
}));

describe("SelectField", () => {
  describe("renders component", () => {
    const defaultProps = {};

    const renderComponent = (props = defaultProps) =>
      render(<SelectField {...props} />);

    it("with default props", () => {
      renderComponent();

      expect(screen.getByTestId("input-field")).toBeInTheDocument();
      expect(screen.getByTestId("select")).toBeInTheDocument();

      expect(screen.queryByTestId("input-field-label")).not.toBeInTheDocument();
      expect(screen.queryByTestId("input-field-error")).not.toBeInTheDocument();
    });
  });
});
