import { render, screen, fireEvent } from "@testing-library/react";

import LocaleSwitcherSelect from "../";

const replaceMock = jest.fn();
const selectMock = jest.fn();

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

jest.mock("next-intl", () => ({
  useTranslations: () => (_: string, values?: any) => values?.locale,
  useLocale: () => "en",
}));

jest.mock("next/navigation", () => ({
  useParams: () => ({ id: "1" }),
}));

jest.mock("@/i18n/navigation", () => ({
  useRouter: () => ({
    replace: replaceMock,
  }),
  usePathname: () => "/resume",
}));

jest.mock("@/i18n/routing", () => ({
  routing: {
    locales: ["en", "ru", "ua"],
  },
}));

jest.mock("@/views/shared/antd/Typography", () => ({
  Text: ({ children }: any) => <span>{children}</span>,
}));

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useTransition: () => [false, (callback: () => void) => callback()],
}));

jest.mock("antd", () => {
  const React = require("react");

  const Option = ({ value }: any) => <option value={value}>{value}</option>;

  const Select = ({ children, onChange, ...props }: any) => {
    selectMock(props);

    return (
      <select
        data-testid="locale-select"
        defaultValue={props.defaultValue}
        disabled={props.disabled}
        onChange={(e) => onChange(e.target.value)}
      >
        {children}
      </select>
    );
  };

  Select.Option = Option;

  return { Select };
});

describe("LocaleSwitcherSelect", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders select", () => {
    render(<LocaleSwitcherSelect />);

    expect(screen.getByTestId("locale-select")).toBeInTheDocument();
  });

  it("uses current locale as default value", () => {
    render(<LocaleSwitcherSelect />);

    expect(selectMock).toHaveBeenCalledWith(
      expect.objectContaining({
        defaultValue: "en",
      })
    );
  });

  it("renders all locales", () => {
    render(<LocaleSwitcherSelect />);

    expect(screen.getByRole("option", { name: "en" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "ru" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "ua" })).toBeInTheDocument();
  });

  it("changes locale", () => {
    render(<LocaleSwitcherSelect />);

    fireEvent.change(screen.getByTestId("locale-select"), {
      target: {
        value: "ru",
      },
    });

    expect(replaceMock).toHaveBeenCalledWith(
      {
        pathname: "/resume",
        params: { id: "1" },
      },
      {
        locale: "ru",
      }
    );
  });
});
