import { render, screen } from "@testing-library/react";

import useResumeTemplateSidebar from "@/hooks/useResumeTemplateSidebar";
import { ResumeProps, TemplateProps } from "@/lib/constants/props/resume";
import { TEMPLATES } from "@/lib/constants/templates";
import { resume } from "@/mocks/resume";

import ResumeTemplateSidebar from "../";

jest.mock("@/hooks/useResumeTemplateSidebar", () => ({
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

jest.mock("@/views/shared/TemplateResume/PersonalFullName", () => ({
  __esModule: true,
  default: () => <div data-testid="personal-full-name" />,
}));

jest.mock("@/views/shared/TemplateResume/PersonalPhoto", () => ({
  __esModule: true,
  default: () => <div data-testid="personal-photo" />,
}));

jest.mock("@/views/shared/TemplateResume/PersonalData", () => ({
  __esModule: true,
  default: () => <div data-testid="personal-data" />,
}));

jest.mock("@/views/shared/TemplateResume/PersonalHobbies", () => ({
  __esModule: true,
  default: () => <div data-testid="personal-hobbies" />,
}));

jest.mock("@/views/shared/TemplateResume/PersonalLanguages", () => ({
  __esModule: true,
  default: () => <div data-testid="personal-languages" />,
}));

jest.mock("@/views/shared/TemplateResume/PersonalSkills", () => ({
  __esModule: true,
  default: () => <div data-testid="personal-skills" />,
}));

jest.mock("@/views/shared/TemplateResume/PersonalTools", () => ({
  __esModule: true,
  default: () => <div data-testid="personal-tools" />,
}));

const mockedUseResumeTemplateSidebar = jest.mocked(useResumeTemplateSidebar);

describe("ResumeTemplateSidebar", () => {
  const defaultContent = {
    personalPhoto: "Personal photo",
    personalPhotoAlt: "Personal photo alt",
    personalInfoTitle: "Personal info title",
    personalHobbiesTitle: "Personal hobbies title",
    personalLanguagesTitle: "Personal languages title",
    personalSkillsTitle: "Personal skills title",
    personalToolsTitle: "Personal tools title",

    isPersonalPhoto: true,
    isPersonalFullName: true,
    isPersonalInfo: true,
    isPersonalHobbies: true,
    isPersonalLanguages: true,
    isPersonalSkills: true,
    isPersonalTools: true,
  };

  const defaultProps: TemplateProps & { resume: ResumeProps } = {
    template: TEMPLATES.edinburgh,
    templateLocale: "en",
    resume,
  };

  const renderComponent = (props = defaultProps) =>
    render(<ResumeTemplateSidebar {...props} />);

  beforeEach(() => {
    jest.clearAllMocks();
    mockedUseResumeTemplateSidebar.mockReturnValue(defaultContent);
  });

  it("renders all personal sections", () => {
    renderComponent();

    expect(screen.getByTestId("personal-full-name")).toBeInTheDocument();
    expect(screen.getByTestId("personal-photo")).toBeInTheDocument();
    expect(screen.getByTestId("personal-data")).toBeInTheDocument();
    expect(screen.getByTestId("personal-hobbies")).toBeInTheDocument();
    expect(screen.getByTestId("personal-languages")).toBeInTheDocument();
    expect(screen.getByTestId("personal-skills")).toBeInTheDocument();
    expect(screen.getByTestId("personal-tools")).toBeInTheDocument();
  });

  it("does not render sections when corresponding flags are false", () => {
    mockedUseResumeTemplateSidebar.mockReturnValue({
      ...defaultContent,
      isPersonalPhoto: false,
      isPersonalFullName: false,
      isPersonalInfo: false,
      isPersonalHobbies: false,
      isPersonalLanguages: false,
      isPersonalSkills: false,
      isPersonalTools: false,
    });

    renderComponent();

    expect(screen.queryByTestId("personal-full-name")).not.toBeInTheDocument();
    expect(screen.queryByTestId("personal-photo")).not.toBeInTheDocument();
    expect(screen.queryByTestId("personal-data")).not.toBeInTheDocument();
    expect(screen.queryByTestId("personal-hobbies")).not.toBeInTheDocument();
    expect(screen.queryByTestId("personal-languages")).not.toBeInTheDocument();
    expect(screen.queryByTestId("personal-skills")).not.toBeInTheDocument();
    expect(screen.queryByTestId("personal-tools")).not.toBeInTheDocument();
  });

  it("calls useResumeTemplateSidebar with component props", () => {
    renderComponent();

    expect(mockedUseResumeTemplateSidebar).toHaveBeenCalledWith({
      template: TEMPLATES.edinburgh,
      templateLocale: "en",
      resume,
    });
  });
});
