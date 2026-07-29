import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ThemeSwitcher from "../";
import { THEME } from "@/lib/constants/theme";

const setThemeMock = jest.fn();
const switchMock = jest.fn();

let resolvedTheme: "light" | "dark" = THEME.light;

jest.mock("next-themes", () => ({
  useTheme: () => ({
    setTheme: setThemeMock,
    resolvedTheme,
  }),
}));

jest.mock("@/views/shared/antd/Switch", () => ({
  __esModule: true,
  default: (props: any) => {
    switchMock(props);

    return (
      <button
        data-testid="switch"
        onClick={() => props.onChange(!props.defaultChecked)}
      >
        Switch
      </button>
    );
  },
}));

describe("ThemeSwitcher", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    resolvedTheme = THEME.light;
  });

  it("renders switch after mount", async () => {
    render(<ThemeSwitcher />);

    expect(await screen.findByTestId("switch")).toBeInTheDocument();
  });

  it("passes defaultChecked=true for dark theme", async () => {
    resolvedTheme = THEME.dark;

    render(<ThemeSwitcher />);

    await screen.findByTestId("switch");

    expect(switchMock).toHaveBeenCalledWith(
      expect.objectContaining({
        defaultChecked: true,
      })
    );
  });

  it("passes defaultChecked=false for light theme", async () => {
    render(<ThemeSwitcher />);

    await screen.findByTestId("switch");

    expect(switchMock).toHaveBeenCalledWith(
      expect.objectContaining({
        defaultChecked: false,
      })
    );
  });

  it("changes theme to dark", async () => {
    const user = userEvent.setup();

    render(<ThemeSwitcher />);

    await user.click(await screen.findByTestId("switch"));

    expect(setThemeMock).toHaveBeenCalledWith(THEME.dark);
  });

  it("changes theme to light", async () => {
    const user = userEvent.setup();

    resolvedTheme = THEME.dark;

    render(<ThemeSwitcher />);

    await user.click(await screen.findByTestId("switch"));

    expect(setThemeMock).toHaveBeenCalledWith(THEME.light);
  });
});
