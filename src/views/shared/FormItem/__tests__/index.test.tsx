import { render, screen } from "@testing-library/react";

import FormItem from "../";

const controllerMock = jest.fn();

jest.mock("react-hook-form", () => ({
  Controller: (props: any) => {
    controllerMock(props);

    return props.render({
      field: {
        name: "firstName",
        value: "John",
        onChange: jest.fn(),
        onBlur: jest.fn(),
        ref: jest.fn(),
      },
      fieldState: {
        error: { message: "Required" },
      },
    });
  },
}));

describe("FormItem", () => {
  const FieldMock = jest.fn((props) => (
    <div data-testid="field">{props.value}</div>
  ));

  const defaultProps = {
    controlName: "firstName",
    control: {} as any,
    Field: FieldMock,
    className: "form-item--class",
    label: "First name",
    rules: { required: true },
  };

  const renderComponent = (props = defaultProps) =>
    render(<FormItem {...props} />);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders field", () => {
    renderComponent();

    expect(screen.getByTestId("field")).toBeInTheDocument();
    expect(screen.getByText("John")).toBeInTheDocument();
  });

  it("renders wrapper class", () => {
    renderComponent();

    expect(screen.getByTestId("field").parentElement).toHaveClass(
      "form__item",
      "form-item--class"
    );
  });

  it("passes props to Controller", () => {
    renderComponent();

    expect(controllerMock).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "firstName",
        control: defaultProps.control,
        rules: defaultProps.rules,
      })
    );
  });

  it("passes field props to Field", () => {
    renderComponent();

    expect(FieldMock).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "firstName",
        value: "John",
        label: "First name",
        errors: { message: "Required" },
      }),
      undefined
    );
  });
});
