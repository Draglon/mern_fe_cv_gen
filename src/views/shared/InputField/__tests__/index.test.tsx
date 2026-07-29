import { render, screen } from "@testing-library/react";

import InputField from "../";

const inputMock = jest.fn();
jest.mock("@/views/shared/antd/Input", () => ({
  __esModule: true,
  default: (props: any) => {
    inputMock(props);

    return <div data-testid="input" />;
  },
}));

describe("InputField", () => {
  describe("renders component", () => {
    const defaultProps = {};

    const renderComponent = (props = defaultProps) =>
      render(<InputField {...props} />);

    it("with default props", () => {
      renderComponent();

      expect(screen.getByTestId("input-field")).toBeInTheDocument();
      expect(screen.getByTestId("input")).toBeInTheDocument();

      expect(screen.queryByTestId("input-field-label")).not.toBeInTheDocument();
      expect(screen.queryByTestId("input-field-error")).not.toBeInTheDocument();
    });
  });
});
