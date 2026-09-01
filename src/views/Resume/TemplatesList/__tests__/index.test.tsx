import { render, screen, fireEvent } from "@testing-library/react";

import { TEMPLATES, TEMPLATES_LIST } from "@/lib/constants/templates";

import ResumeTemplatesList from "../";

jest.mock("@/views/shared/antd/Button", () => ({
  __esModule: true,
  default: ({ children, ...props }: any) => (
    <button {...props}>{children}</button>
  ),
}));

describe("ResumeTemplatesList", () => {
  const setTemplate = jest.fn();

  const defaultProps = {
    setTemplate,
    activeTemplate: TEMPLATES.edinburgh,
  };
  const renderComponent = (props = defaultProps) =>
    render(<ResumeTemplatesList {...props} />);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("renders component", () => {
    it("renders all templates", () => {
      renderComponent();

      expect(screen.getAllByRole("button")).toHaveLength(TEMPLATES_LIST.length);
    });

    it("renders template images", () => {
      renderComponent();

      expect(screen.getAllByRole("img")).toHaveLength(TEMPLATES_LIST.length);
    });

    it("marks active template", () => {
      renderComponent();

      const activeButton = screen
        .getByAltText(TEMPLATES.edinburgh)
        .closest("button");

      expect(activeButton).toHaveClass("templates-list__btn--active");
    });

    it("changes template when template button is clicked", () => {
      renderComponent();

      const template = TEMPLATES_LIST.find(
        ({ template }) => template !== TEMPLATES.edinburgh
      );

      expect(template).toBeDefined();

      fireEvent.click(screen.getByAltText(template!.template));

      expect(setTemplate).toHaveBeenCalledWith(template!.template);
    });
  });
});
