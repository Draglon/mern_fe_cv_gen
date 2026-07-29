import { render, screen } from "@testing-library/react";

import CheckboxField from "../";

const CheckboxMock = jest.fn();
jest.mock("@/views/shared/antd/Checkbox", () => ({
  __esModule: true,
  default: (props: any) => {
    CheckboxMock(props);

    return <div data-testid="checkbox">{props.children}</div>;
  },
}));

describe("CheckboxField", () => {
  describe("renders component", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    const defaultProps = {
      label: "Label",
    };

    const renderComponent = (props = defaultProps) =>
      render(<CheckboxField {...props} />);

    it("with default props", () => {
      renderComponent();

      expect(screen.getByText("Label")).toBeInTheDocument();
    });

    it("renders wrapper", () => {
      const { container } = renderComponent();

      expect(container.firstChild).toHaveClass("checkbox-field");
    });

    it("passes props to Checkbox", () => {
      const props = {
        ...defaultProps,
        disabled: true,
      };
      renderComponent(props);

      expect(CheckboxMock).toHaveBeenCalledWith(
        expect.objectContaining({
          disabled: true,
          children: "Label",
        })
      );
    });
  });
});
