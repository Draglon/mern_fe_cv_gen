import { render, screen } from "@testing-library/react";

import { TEMPLATES } from "@/lib/constants/templates";
import { TemplateProps } from "@/lib/constants/props/resume";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import fetchResume from "@/store/resume/operations/fetchResume";

import ResumeTemplate from "../";

const mockDispatch = jest.fn();
jest.mock("@/store/hooks", () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

jest.mock("@/store/resume/operations/fetchResume", () => ({
  __esModule: true,
  default: jest.fn((payload) => ({
    type: "resume/fetchResume",
    payload,
  })),
}));

jest.mock("@/store/auth/selectors", () => ({
  userIdSelector: jest.fn(),
}));

jest.mock("@/store/resume/selectors", () => ({
  resumeSelector: jest.fn(),
  isLoadingSelector: jest.fn(),
}));

jest.mock("@/views/Resume/Template/Navigation", () => ({
  __esModule: true,
  default: () => <div data-testid="template-navigation" />,
}));

jest.mock("@/views/Resume/Template/Sidebar", () => ({
  __esModule: true,
  default: () => <div data-testid="template-sidebar" />,
}));

jest.mock("@/views/Resume/Template/Content", () => ({
  __esModule: true,
  default: () => <div data-testid="template-content" />,
}));

jest.mock("@/views/Resume/Template/EmptyState", () => ({
  __esModule: true,
  default: () => <div data-testid="template-empty-state" />,
}));

jest.mock("@/views/shared/antd/Loader", () => ({
  __esModule: true,
  default: ({ ...props }: any) => <div data-testid="loader" {...props} />,
}));

const mockedUseAppDispatch = jest.mocked(useAppDispatch);
const mockedUseAppSelector = jest.mocked(useAppSelector);
const mockedFetchResume = jest.mocked(fetchResume);

describe("ResumeTemplate", () => {
  const defaultProps: TemplateProps = {
    template: TEMPLATES.edinburgh,
    templateLocale: "en",
  };

  const renderComponent = (prop = defaultProps) =>
    render(<ResumeTemplate {...prop} />);

  beforeEach(() => {
    jest.clearAllMocks();
    mockedUseAppDispatch.mockReturnValue(mockDispatch);
  });

  it("renders template empty state", () => {
    renderComponent();

    expect(screen.getByTestId("template-empty-state")).toBeInTheDocument();

    expect(screen.queryByTestId("template-navigation")).not.toBeInTheDocument();
    expect(screen.queryByTestId("template-sidebar")).not.toBeInTheDocument();
    expect(screen.queryByTestId("template-content")).not.toBeInTheDocument();
    expect(screen.queryByTestId("loader")).not.toBeInTheDocument();
  });

  it("renders loader when loading", () => {
    mockedUseAppSelector
      .mockReturnValueOnce("1")
      .mockReturnValueOnce({})
      .mockReturnValueOnce(true);

    renderComponent();

    expect(screen.getByTestId("loader")).toBeInTheDocument();

    expect(
      screen.queryByTestId("template-empty-state")
    ).not.toBeInTheDocument();
    expect(screen.queryByTestId("template-navigation")).not.toBeInTheDocument();
  });

  it("renders with navigation and template", () => {
    mockedUseAppSelector
      .mockReturnValueOnce("1")
      .mockReturnValueOnce({ id: "1" })
      .mockReturnValueOnce(false);

    renderComponent();

    expect(screen.queryByTestId("template-navigation")).toBeInTheDocument();
    expect(screen.queryByTestId("template-sidebar")).toBeInTheDocument();
    expect(screen.queryByTestId("template-content")).toBeInTheDocument();

    expect(screen.queryByTestId("loader")).not.toBeInTheDocument();
    expect(
      screen.queryByTestId("template-empty-state")
    ).not.toBeInTheDocument();
  });

  it("fetches resume when userId exists", () => {
    mockedUseAppSelector
      .mockReturnValueOnce("1")
      .mockReturnValueOnce({})
      .mockReturnValueOnce(false);

    renderComponent();

    expect(mockedFetchResume).toHaveBeenCalledWith({
      userId: "1",
    });

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "resume/fetchResume",
      payload: {
        userId: "1",
      },
    });
  });
});
