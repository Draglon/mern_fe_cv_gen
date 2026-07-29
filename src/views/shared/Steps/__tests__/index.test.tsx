import { render, screen } from "@testing-library/react";

import StepsComponent, { StepsProps } from "../";

jest.mock("next-intl", () => ({
  useTranslations: jest.fn((namespace: string) => {
    const translations = {
      shared: {
        previous: "Previous",
        next: "Next",
      },
    };

    return (key: string) =>
      translations[namespace as keyof typeof translations]?.[
        key as keyof (typeof translations)[keyof typeof translations]
      ] ?? key;
  }),
}));

jest.mock("@/views/shared/antd/Steps", () => ({
  __esModule: true,
  default: (props: any) => <div data-testid="steps" {...props} />,
}));

describe("StepsComponent", () => {
  describe("renders component", () => {
    const defaultProps: StepsProps = {
      steps: [{ title: "Title", content: <div>Step content 1</div> }],
    };

    const renderComponent = (props = defaultProps) =>
      render(<StepsComponent {...props} />);

    it("with default props", () => {
      renderComponent();

      expect(screen.getByTestId("steps")).toBeInTheDocument();
      expect(screen.getByTestId("steps-content")).toBeInTheDocument();
      expect(screen.getByText("Step content 1")).toBeInTheDocument();
      expect(screen.queryByTestId("btn-previous")).not.toBeInTheDocument();
      expect(screen.queryByTestId("btn-next")).not.toBeInTheDocument();
    });

    it("when current step is middle", () => {
      const props = {
        steps: [
          { title: "Title", content: <div>Step content 1</div> },
          { title: "Title", content: <div>Step content 2</div> },
          { title: "Title", content: <div>Step content 3</div> },
        ],
        withButtons: true,
        current: 1,
        onPrev: jest.fn(),
        onNext: jest.fn(),
      };
      renderComponent(props);

      expect(screen.getByTestId("steps")).toBeInTheDocument();
      expect(screen.getByText("Step content 2")).toBeInTheDocument();
      expect(screen.getByTestId("btn-previous")).toHaveTextContent("Previous");
      expect(screen.getByTestId("btn-next")).toHaveTextContent("Next");
    });

    it("when current step is last step", () => {
      const props = {
        steps: [
          { title: "Title", content: <div>Step content 1</div> },
          { title: "Title", content: <div>Step content 2</div> },
          { title: "Title", content: <div>Step content 3</div> },
        ],
        withButtons: true,
        current: 2,
        onPrev: jest.fn(),
        onNext: jest.fn(),
      };
      renderComponent(props);

      expect(screen.getByTestId("steps")).toBeInTheDocument();
      expect(screen.getByText("Step content 3")).toBeInTheDocument();
      expect(screen.getByTestId("btn-previous")).toHaveTextContent("Previous");
      expect(screen.queryByTestId("btn-next")).not.toBeInTheDocument();
    });
  });
});
