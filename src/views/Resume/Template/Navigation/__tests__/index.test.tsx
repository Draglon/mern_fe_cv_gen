import { render, screen, fireEvent } from "@testing-library/react";
import { useTranslations } from "next-intl";

import { downloadPdf } from "@/utils/downloadPdf";

import ResumeTemplateNavigation from "../";

jest.mock("next-intl", () => ({ useTranslations: jest.fn() }));

jest.mock("@/utils/downloadPdf", () => ({ downloadPdf: jest.fn() }));

jest.mock("@/views/shared/antd/Button", () => ({
  __esModule: true,
  default: ({ children, icon, dataTestId, dataCy, ...props }: any) => (
    <button type="button" data-testid={dataTestId} data-cy={dataCy} {...props}>
      {icon} {children}
    </button>
  ),
}));

describe("ResumeTemplateNavigation", () => {
  const tShared = jest.fn((key: string) => key);

  const defaultProps = {
    resumeRef: "resumeRef",
  };

  const renderComponent = (prop = defaultProps) =>
    render(<ResumeTemplateNavigation {...prop} />);

  beforeEach(() => {
    jest.clearAllMocks();
    (useTranslations as jest.Mock).mockReturnValue(tShared);
  });

  it("renders download button", () => {
    renderComponent();

    expect(screen.getByTestId("download-pdf-button")).toBeInTheDocument();
  });

  it("renders translated button label", () => {
    renderComponent();

    expect(screen.getByText("downloadPDF")).toBeInTheDocument();
  });

  it("calls downloadPdf with resumeRef when button is clicked", () => {
    renderComponent();

    fireEvent.click(screen.getByTestId("download-pdf-button"));

    expect(downloadPdf).toHaveBeenCalledWith("resumeRef");
  });
});
