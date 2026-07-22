import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Dropdown from "../";

describe("Dropdown", () => {
  const menu = {
    items: [
      {
        key: "1",
        label: "Profile",
      },
      {
        key: "2",
        label: "Logout",
      },
    ],
  };

  const renderComponent = (props = {}) =>
    render(
      <Dropdown menu={menu} {...props}>
        <button>Open</button>
      </Dropdown>
    );

  it("renders children", () => {
    renderComponent();

    expect(screen.getByRole("button", { name: "Open" })).toBeInTheDocument();
  });

  it("opens menu on click", async () => {
    const user = userEvent.setup();

    renderComponent();

    await user.click(screen.getByRole("button", { name: "Open" }));

    expect(await screen.findByText("Profile")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });
});
