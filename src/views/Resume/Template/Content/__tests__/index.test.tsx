import { render, screen } from "@testing-library/react";

import useResumeTemplateContent from "@/hooks/useResumeTemplateContent";
import { ResumeProps, TemplateProps } from "@/lib/constants/props/resume";
import { TEMPLATES } from "@/lib/constants/templates";
import { resume } from "@/mocks/resume";

import ResumeTemplateContent from "../";

jest.mock("@/hooks/useResumeTemplateContent", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("@/views/shared/TemplateResume/Section", () => ({
  __esModule: true,
  default: ({ title, text, children, className }: any) => (
    <section data-testid="section" className={className}>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
      {children}
    </section>
  ),
}));

jest.mock("@/views/shared/TemplateResume/PersonalInfo", () => ({
  __esModule: true,
  default: () => <div data-testid="personal-info" />,
}));

jest.mock("@/views/shared/TemplateResume/PersonalExperience", () => ({
  __esModule: true,
  default: () => <div data-testid="personal-experience" />,
}));

jest.mock("@/views/shared/TemplateResume/PersonalEducation", () => ({
  __esModule: true,
  default: () => <div data-testid="personal-education" />,
}));

jest.mock("@/views/shared/TemplateResume/PersonalCourses", () => ({
  __esModule: true,
  default: () => <div data-testid="personal-courses" />,
}));

jest.mock("@/views/shared/TemplateResume/PersonalSkills", () => ({
  __esModule: true,
  default: () => <div data-testid="personal-skills" />,
}));

jest.mock("@/views/shared/TemplateResume/PersonalTools", () => ({
  __esModule: true,
  default: () => <div data-testid="personal-tools" />,
}));

const mockedUseResumeTemplateContent = jest.mocked(useResumeTemplateContent);

describe("ResumeTemplateContent", () => {
  const defaultContent = {
    personalInfoTitle: "Personal info",
    personalExperienceTitle: "Experience",
    personalExperienceText: "Experience description",
    formattedExperience: [],
    personalEducationTitle: "Education",
    personalCoursesTitle: "Courses",
    personalSkillsTitle: "Skills",
    personalToolsTitle: "Tools",

    isPersonalInfo: true,
    isPersonalExperience: true,
    isPersonalEducation: true,
    isPersonalCourses: true,
    isPersonalSkills: true,
    isPersonalTools: true,
  };

  const defaultProps: TemplateProps & { resume: ResumeProps } = {
    template: TEMPLATES.edinburgh,
    templateLocale: "en",
    resume,
  };

  const renderComponent = (props = defaultProps) =>
    render(<ResumeTemplateContent {...props} />);

  beforeEach(() => {
    jest.clearAllMocks();
    mockedUseResumeTemplateContent.mockReturnValue(defaultContent);
  });

  it("renders all personal sections", () => {
    renderComponent();

    expect(screen.getByTestId("personal-info")).toBeInTheDocument();
    expect(screen.getByTestId("personal-experience")).toBeInTheDocument();
    expect(screen.getByTestId("personal-education")).toBeInTheDocument();
    expect(screen.getByTestId("personal-courses")).toBeInTheDocument();
    expect(screen.getByTestId("personal-skills")).toBeInTheDocument();
    expect(screen.getByTestId("personal-tools")).toBeInTheDocument();
  });

  it("does not render sections when corresponding flags are false", () => {
    mockedUseResumeTemplateContent.mockReturnValue({
      ...defaultContent,
      isPersonalInfo: false,
      isPersonalExperience: false,
      isPersonalEducation: false,
      isPersonalCourses: false,
      isPersonalSkills: false,
      isPersonalTools: false,
    });

    renderComponent();

    expect(screen.queryByTestId("personal-info")).not.toBeInTheDocument();

    expect(screen.queryByTestId("personal-experience")).not.toBeInTheDocument();

    expect(screen.queryByTestId("personal-education")).not.toBeInTheDocument();

    expect(screen.queryByTestId("personal-courses")).not.toBeInTheDocument();

    expect(screen.queryByTestId("personal-skills")).not.toBeInTheDocument();

    expect(screen.queryByTestId("personal-tools")).not.toBeInTheDocument();
  });

  it("calls useResumeTemplateContent with component props", () => {
    renderComponent();

    expect(mockedUseResumeTemplateContent).toHaveBeenCalledWith({
      template: TEMPLATES.edinburgh,
      templateLocale: "en",
      resume,
    });
  });
});
