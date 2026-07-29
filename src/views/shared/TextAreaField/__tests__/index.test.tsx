import { render, screen } from "@testing-library/react";

import TextAreaField from "../";

const textAreaMock = jest.fn();
jest.mock("@/views/shared/antd/TextArea", () => ({
  __esModule: true,
  default: (props: any) => {
    textAreaMock(props);

    return <div data-testid="text-area" />;
  },
}));

describe("TextAreaField", () => {
  describe("renders component", () => {
    const defaultProps = {};

    const renderComponent = (props = defaultProps) =>
      render(<TextAreaField {...props} />);

    it("with default props", () => {
      renderComponent();

      expect(screen.getByTestId("input-field")).toBeInTheDocument();
      expect(screen.getByTestId("text-area")).toBeInTheDocument();

      expect(screen.queryByTestId("input-field-label")).not.toBeInTheDocument();
      expect(screen.queryByTestId("input-field-error")).not.toBeInTheDocument();
    });
  });
});
