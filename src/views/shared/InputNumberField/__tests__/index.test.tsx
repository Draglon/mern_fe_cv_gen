import { render, screen } from "@testing-library/react";

import InputNumberField from "../";

const inputNumberMock = jest.fn();
jest.mock("@/views/shared/antd/InputNumber", () => ({
  __esModule: true,
  default: (props: any) => {
    inputNumberMock(props);

    return <div data-testid="input-number" />;
  },
}));

describe("InputNumberField", () => {
  describe("renders component", () => {
    const defaultProps = {};

    const renderComponent = (props = defaultProps) =>
      render(<InputNumberField {...props} />);

    it("with default props", () => {
      renderComponent();

      expect(screen.getByTestId("input-field")).toBeInTheDocument();
      expect(screen.getByTestId("input-number")).toBeInTheDocument();

      expect(screen.queryByTestId("input-field-label")).not.toBeInTheDocument();
      expect(screen.queryByTestId("input-field-error")).not.toBeInTheDocument();
    });
  });
});
