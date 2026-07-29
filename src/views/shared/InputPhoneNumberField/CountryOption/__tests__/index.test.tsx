import { render, screen } from "@testing-library/react";

import CountryOption from "../";

const getCountryCallingCodeMock = jest.fn();

jest.mock("react-phone-number-input", () => ({
  getCountryCallingCode: (country: string) => {
    getCountryCallingCodeMock(country);

    return "380";
  },
}));

jest.mock("react-phone-number-input/flags", () => ({
  __esModule: true,
  default: {
    UA: ({ title }: { title: string }) => (
      <svg data-testid="flag" aria-label={title} />
    ),
  },
}));

describe("CountryOption", () => {
  const renderComponent = (country: any = "UA") =>
    render(<CountryOption country={country} />);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders country flag", () => {
    renderComponent();

    expect(screen.getByTestId("flag")).toBeInTheDocument();
    expect(screen.getByLabelText("UA")).toBeInTheDocument();
  });

  it("renders calling code", () => {
    renderComponent();

    expect(screen.getByText("+380")).toBeInTheDocument();
    expect(getCountryCallingCodeMock).toHaveBeenCalledWith("UA");
  });

  it("does not render flag when it is missing", () => {
    renderComponent("US");

    expect(screen.queryByTestId("flag")).not.toBeInTheDocument();
    expect(screen.getByText("+380")).toBeInTheDocument();
  });
});
