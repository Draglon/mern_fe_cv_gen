import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import { downloadPdf } from "../downloadPdf";

jest.mock("html2canvas");
jest.mock("jspdf");

describe("downloadPdf", () => {
  const mockedHtml2Canvas = jest.mocked(html2canvas);
  const mockedJsPDF = jest.mocked(jsPDF);

  const resumeElement = document.createElement("div");

  const createPdfMock = () => {
    const pdf = {
      internal: {
        pageSize: {
          getWidth: jest.fn().mockReturnValue(794),
          getHeight: jest.fn().mockReturnValue(1123),
        },
      },
      addImage: jest.fn(),
      addPage: jest.fn(),
      save: jest.fn(),
    };

    mockedJsPDF.mockImplementation(() => pdf as any);

    return pdf;
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns early when resume ref has no current element", async () => {
    const resumeRef = {
      current: null,
    };

    await downloadPdf(resumeRef);

    expect(mockedHtml2Canvas).not.toHaveBeenCalled();
    expect(mockedJsPDF).not.toHaveBeenCalled();
  });

  it("creates and saves a PDF", async () => {
    const canvas = {
      width: 794,
      height: 1123,
      toDataURL: jest.fn().mockReturnValue("data:image/png;base64,test"),
    };

    mockedHtml2Canvas.mockResolvedValue(canvas as any);

    const pdf = createPdfMock();

    const resumeRef = {
      current: resumeElement,
    };

    await downloadPdf(resumeRef);

    expect(mockedHtml2Canvas).toHaveBeenCalledWith(resumeElement, {
      scale: 2,
      useCORS: true,
    });

    expect(mockedJsPDF).toHaveBeenCalledWith("p", "px", "a4");

    expect(canvas.toDataURL).toHaveBeenCalledWith("image/png");

    expect(pdf.addImage).toHaveBeenCalledWith(
      "data:image/png;base64,test",
      "PNG",
      0,
      0,
      794,
      1123
    );

    expect(pdf.addPage).not.toHaveBeenCalled();

    expect(pdf.save).toHaveBeenCalledWith("resume.pdf");
  });

  it("adds new pages when canvas height exceeds page height", async () => {
    const canvas = {
      width: 794,
      height: 2246,
      toDataURL: jest.fn().mockReturnValue("data:image/png;base64,test"),
    };

    mockedHtml2Canvas.mockResolvedValue(canvas as any);

    const pdf = createPdfMock();

    const resumeRef = {
      current: resumeElement,
    };

    await downloadPdf(resumeRef);

    expect(pdf.addImage).toHaveBeenCalledTimes(2);
    expect(pdf.addPage).toHaveBeenCalledTimes(1);

    expect(pdf.addImage).toHaveBeenNthCalledWith(
      1,
      "data:image/png;base64,test",
      "PNG",
      0,
      0,
      794,
      2246
    );

    expect(pdf.addImage).toHaveBeenNthCalledWith(
      2,
      "data:image/png;base64,test",
      "PNG",
      0,
      -1123,
      794,
      2246
    );

    expect(pdf.save).toHaveBeenCalledWith("resume.pdf");
  });
});
