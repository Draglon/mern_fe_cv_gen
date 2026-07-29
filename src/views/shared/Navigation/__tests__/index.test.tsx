import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import { useAppSelector } from "@/store/hooks";

import Navigation from "..";

jest.mock("@/store/hooks", () => ({
  ...jest.requireActual("@/store/hooks"),
  useAppSelector: jest.fn(),
}));

const mockedUseAppSelector = jest.mocked(useAppSelector);

jest.mock("next-intl", () => ({
  useTranslations: jest.fn((namespace: string) => {
    const translations = {
      Navigation: {
        navResume: "Resume",
        navResumeCreate: "Create resume",
        navResumeEdit: "Edit resume",
      },
    };

    return (key: string) =>
      translations[namespace as keyof typeof translations]?.[
        key as keyof (typeof translations)[keyof typeof translations]
      ] ?? key;
  }),
}));

jest.mock("@/views/shared/NavigationLink", () => ({
  __esModule: true,
  default: ({ children, ...props }: any) => <a {...props}>{children}</a>,
}));

describe("Navigation", () => {
  describe("renders component", () => {
    const renderComponent = () => render(<Navigation />);

    beforeEach(() => {
      jest.clearAllMocks();

      mockedUseAppSelector.mockReturnValue({
        isCreated: false,
      });
    });

    it("renders create resume link when resume is not created", () => {
      renderComponent();

      expect(screen.getByRole("navigation")).toBeInTheDocument();
      expect(screen.getAllByRole("link")).toHaveLength(2);
      expect(screen.getByRole("link", { name: "Resume" })).toHaveAttribute(
        "href",
        "/resume"
      );
      expect(
        screen.getByRole("link", { name: "Create resume" })
      ).toHaveAttribute("href", "/resume_create");
    });

    it("renders edit resume link when resume is created", () => {
      mockedUseAppSelector.mockReturnValueOnce({ isCreated: true });
      renderComponent();

      expect(screen.getByRole("navigation")).toBeInTheDocument();
      expect(screen.getAllByRole("link")).toHaveLength(2);
      expect(screen.getByRole("link", { name: "Resume" })).toHaveAttribute(
        "href",
        "/resume"
      );
      expect(screen.getByRole("link", { name: "Edit resume" })).toHaveAttribute(
        "href",
        "/resume_edit"
      );
    });
  });
});
