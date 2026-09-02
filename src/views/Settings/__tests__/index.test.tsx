import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import updateUserEmail from "@/store/auth/operations/updateUserEmail";

import Settings from "../";

jest.mock("next-intl", () => ({
  useTranslations: jest.fn((namespace: string) => {
    const translations = {
      Settings: {
        title: "Settings title",
        subTitle: "Settings sub title",
      },
    };

    return (key: string) =>
      translations[namespace as keyof typeof translations]?.[
        key as keyof (typeof translations)[keyof typeof translations]
      ] ?? key;
  }),
}));

jest.mock("@/views/shared/antd/Typography", () => ({
  __esModule: true,
  Title: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
}));

jest.mock("../ChangeEmail", () => ({
  __esModule: true,
  default: () => <div data-testid="change-email" />,
}));

jest.mock("../ChangePassword", () => ({
  __esModule: true,
  default: () => <div data-testid="change-password" />,
}));

jest.mock("../DeleteAccount", () => ({
  __esModule: true,
  default: () => <div data-testid="delete-account" />,
}));

describe("Settings", () => {
  const renderComponent = () => render(<Settings />);

  it("renders component", () => {
    renderComponent();

    expect(screen.getByText("Settings title")).toBeInTheDocument();
    expect(screen.getByText("Settings sub title")).toBeInTheDocument();

    expect(screen.getByTestId("change-email")).toBeInTheDocument();
    expect(screen.getByTestId("change-password")).toBeInTheDocument();
    expect(screen.getByTestId("delete-account")).toBeInTheDocument();
  });
});
