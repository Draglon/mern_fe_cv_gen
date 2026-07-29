import { render, screen } from "@testing-library/react";

import LocalTabs, { LocalTabsProp } from "../";

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

jest.mock("@/views/shared/antd/Tabs", () => ({
  __esModule: true,
  default: ({ className }: any) => (
    <div data-testid="tabs" className={className} />
  ),
}));

describe("LocalTabs", () => {
  describe("renders component", () => {
    const defaultProps: LocalTabsProp = {
      Component: <div>Tab content</div>,
      onChange: jest.fn(),
    };

    const renderComponent = (props = defaultProps) =>
      render(<LocalTabs {...props} />);

    it("with default props", () => {
      renderComponent();

      expect(screen.getByTestId("tabs")).toBeInTheDocument();
      expect(screen.getByTestId("tabs")).toHaveClass("locale-tabs");
    });
  });
});
