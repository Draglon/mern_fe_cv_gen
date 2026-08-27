import { render, screen, fireEvent } from "@testing-library/react";
import { useLocale, useTranslations } from "next-intl";

import { redirect } from "@/i18n/navigation";
import { resumeRoute } from "@/lib/routes";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import updateUserResume from "@/store/auth/operations/updateUserResume";
import { userResumeSelector } from "@/store/auth/selectors";

import ResumeCreate from "..";

jest.mock("next-intl", () => ({
  useLocale: jest.fn(),
  useTranslations: jest.fn(),
}));

jest.mock("@/i18n/navigation", () => ({
  redirect: jest.fn(),
}));

jest.mock("@/store/hooks", () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

jest.mock("@/store/auth/operations/updateUserResume", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("@/lib/constants/resume", () => ({
  RESUME_ITEMS: [
    {
      key: "personal",
      Component: ({ resumeLocale }: { resumeLocale: string }) => (
        <div data-testid="personal-component">Personal: {resumeLocale}</div>
      ),
    },
    {
      key: "experience",
      Component: ({ resumeLocale }: { resumeLocale: string }) => (
        <div data-testid="experience-component">Experience: {resumeLocale}</div>
      ),
    },
  ],
}));

jest.mock("@/views/shared/antd/Typography", () => ({
  Title: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
}));

jest.mock("@/views/shared/Steps", () => ({
  __esModule: true,
  default: ({ steps, current, orientation }: any) => (
    <div data-testid="steps">
      <span data-testid="current-step">{current}</span>
      <span data-testid="orientation">{orientation}</span>

      {steps.map((step: any, index: number) => (
        <div key={index} data-testid={`step-${index}`}>
          <span>{step.title}</span>
          {step.content}
        </div>
      ))}
    </div>
  ),
}));

jest.mock("@/views/shared/LocalTabs", () => ({
  __esModule: true,
  default: ({ onChange, Component }: any) => (
    <div data-testid="local-tabs">
      <button onClick={() => onChange("ru")}>Change locale</button>
      {Component}
    </div>
  ),
}));

jest.mock("@/views/shared/antd/Button", () => ({
  __esModule: true,
  default: ({ children, ...props }: any) => (
    <button {...props}>{children}</button>
  ),
}));

const mockDispatch = jest.fn();
const mockedUseLocale = jest.mocked(useLocale);
const mockedUseTranslations = jest.mocked(useTranslations);
const mockedUseAppDispatch = jest.mocked(useAppDispatch);
const mockedUseAppSelector = jest.mocked(useAppSelector);
const mockedUpdateUserResume = jest.mocked(updateUserResume);
const mockedRedirect = jest.mocked(redirect);

describe("ResumeCreate", () => {
  const translations: Record<string, string> = {
    title: "Create resume",
    "steps.personal": "Personal",
    "steps.experience": "Experience",
  };

  const sharedTranslations: Record<string, string> = {
    previous: "Previous",
    next: "Next",
    finish: "Finish",
  };

  beforeEach(() => {
    jest.clearAllMocks();

    mockedUseLocale.mockReturnValue("en");

    mockedUseTranslations.mockImplementation(
      (namespace?: string) =>
        ((key: string) =>
          namespace === "ResumeCreate"
            ? translations[key]
            : sharedTranslations[key]) as any
    );

    mockedUseAppDispatch.mockReturnValue(mockDispatch);
    mockedUseAppSelector.mockReturnValue(null);

    mockedUseAppSelector.mockReturnValue({ currentStep: 0 } as ReturnType<
      typeof userResumeSelector
    >);

    mockedUpdateUserResume.mockReturnValue({
      type: "auth/updateUserResume",
    } as any);
  });

  const renderComponent = () => render(<ResumeCreate />);

  it("renders ResumeCreate component", () => {
    renderComponent();

    expect(
      screen.getByRole("heading", { name: "Create resume" })
    ).toBeInTheDocument();
    expect(screen.getByTestId("steps")).toBeInTheDocument();
    expect(screen.getByTestId("current-step")).toHaveTextContent("0");
    expect(screen.getByTestId("orientation")).toHaveTextContent("vertical");
    expect(screen.getByText("Personal")).toBeInTheDocument();
    expect(screen.getByText("Experience")).toBeInTheDocument();
  });

  it("renders next button on first step", () => {
    renderComponent();

    expect(screen.getByRole("button", { name: "Next" })).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Previous" })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Finish" })
    ).not.toBeInTheDocument();
  });

  it("changes to next step", () => {
    renderComponent();

    fireEvent.click(screen.getByRole("button", { name: "Next" }));

    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({ type: "auth/updateUserResume" })
    );
  });

  it("changes resume locale", () => {
    renderComponent();

    expect(screen.getByTestId("personal-component")).toHaveTextContent(
      "Personal: en"
    );

    fireEvent.click(
      screen.getAllByRole("button", { name: "Change locale" })[0]
    );

    expect(screen.getByTestId("personal-component")).toHaveTextContent(
      "Personal: ru"
    );
  });

  it("renders previous button when current step is greater than zero", () => {
    mockedUseAppSelector.mockReturnValue({
      currentStep: 1,
    } as any);

    renderComponent();

    expect(
      screen.getByRole("button", { name: "Previous" })
    ).toBeInTheDocument();
  });

  it("renders finish button on last step", () => {
    mockedUseAppSelector.mockReturnValue({ currentStep: 1 } as any);

    renderComponent();

    expect(screen.getByRole("button", { name: "Finish" })).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Next" })
    ).not.toBeInTheDocument();
  });

  it("redirects after finishing resume creation", () => {
    mockedUseAppSelector.mockReturnValue({ currentStep: 1 } as any);

    renderComponent();

    fireEvent.click(screen.getByRole("button", { name: "Finish" }));

    expect(mockDispatch).toHaveBeenCalled();
    expect(mockedRedirect).toHaveBeenCalledWith({
      href: resumeRoute,
      locale: "en",
    });
  });
});
