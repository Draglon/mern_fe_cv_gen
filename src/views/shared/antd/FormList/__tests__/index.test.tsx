import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import FormList from "../";

const addMock = jest.fn();

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

jest.mock("antd", () => {
  const actual = jest.requireActual("antd");

  return {
    ...actual,
    Form: {
      ...actual.Form,
      List: ({ children }: any) =>
        children([], {
          add: addMock,
          remove: jest.fn(),
          move: jest.fn(),
        }),
    },
  };
});

jest.mock("@/views/shared/antd/Button", () => ({
  __esModule: true,
  default: ({ children, onClick }: any) => (
    <button onClick={onClick}>{children}</button>
  ),
}));

describe("FormList", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders children", () => {
    render(
      <FormList name="skills">
        <div data-testid="content">Content</div>
      </FormList>
    );

    expect(screen.getByTestId("content")).toBeInTheDocument();
  });

  it("renders prepend button", () => {
    render(
      <FormList name="skills" prepend={jest.fn()} fieldValues={{ id: 1 }}>
        <div>Content</div>
      </FormList>
    );

    expect(
      screen.getByRole("button", { name: "addField" })
    ).toBeInTheDocument();
  });

  it("renders append button", () => {
    render(
      <FormList name="skills" append={jest.fn()}>
        <div>Content</div>
      </FormList>
    );

    expect(
      screen.getByRole("button", { name: "addField" })
    ).toBeInTheDocument();
  });

  it("calls prepend", async () => {
    const user = userEvent.setup();

    const prepend = jest.fn();

    render(
      <FormList name="skills" prepend={prepend} fieldValues={{ id: 1 }}>
        <div>Content</div>
      </FormList>
    );

    await user.click(screen.getByRole("button"));

    expect(addMock).toHaveBeenCalledWith({ id: 1 });
    expect(prepend).toHaveBeenCalled();
  });

  it("calls append", async () => {
    const user = userEvent.setup();

    const append = jest.fn();

    render(
      <FormList name="skills" append={append}>
        <div>Content</div>
      </FormList>
    );

    await user.click(screen.getByRole("button"));

    expect(append).toHaveBeenCalledTimes(1);
  });
});
