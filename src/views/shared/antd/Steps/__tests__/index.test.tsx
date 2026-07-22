import { render, screen } from "@testing-library/react";

import Steps from "../";

describe("Steps", () => {
  const defaultSteps = [
    {
      title: "Step 1",
      content: <div>Content 1</div>,
    },
    {
      title: "Step 2",
      content: <div>Content 2</div>,
    },
    {
      title: "Step 3",
      content: <div>Content 3</div>,
    },
  ];

  const renderComponent = (props = {}) =>
    render(<Steps steps={defaultSteps} {...props} />);

  describe("renders component", () => {
    it("renders all step titles", () => {
      renderComponent();

      expect(screen.getByText("Step 1")).toBeInTheDocument();
      expect(screen.getByText("Step 2")).toBeInTheDocument();
      expect(screen.getByText("Step 3")).toBeInTheDocument();
    });

    it("renders current step", () => {
      const { container } = renderComponent({ current: 1 });

      const currentStep = container.querySelector(".ant-steps-item-process");

      expect(currentStep).toBeInTheDocument();
      expect(currentStep).toHaveTextContent("Step 2");
    });

    it("renders horizontal orientation by default", () => {
      const { container } = renderComponent();

      expect(
        container.querySelector(".ant-steps-horizontal")
      ).toBeInTheDocument();
    });

    it("renders vertical orientation", () => {
      const { container } = renderComponent({
        orientation: "vertical",
      });

      expect(
        container.querySelector(".ant-steps-vertical")
      ).toBeInTheDocument();
    });

    it("renders correct number of steps", () => {
      const { container } = renderComponent();

      expect(container.querySelectorAll(".ant-steps-item")).toHaveLength(3);
    });
  });
});
