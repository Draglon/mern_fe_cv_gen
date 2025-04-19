import PersonalInfoForm from "@/views/shared/PersonalInfoForm";
import PersonalHobbiesForm from "@/views/shared/PersonalHobbiesForm";
import PersonalLanguagesForm from "@/views/shared/PersonalLanguagesForm";
import PersonalExperienceForm from "@/views/shared/PersonalExperienceForm";
import PersonalEducationForm from "@/views/shared/PersonalEducationForm";
import PersonalCoursesForm from "@/views/shared/PersonalCoursesForm";
import PersonalSkillsForm from "@/views/shared/PersonalSkillsForm";
import PersonalToolsForm from "@/views/shared/PersonalToolsForm";

export const RESUME_ITEMS = [
  {
    key: "general",
    Component: PersonalInfoForm,
  },
  {
    key: "hobbies",
    Component: PersonalHobbiesForm,
  },
  {
    key: "languages",
    Component: PersonalLanguagesForm,
  },
  {
    key: "experience",
    Component: PersonalExperienceForm,
  },
  {
    key: "education",
    Component: PersonalEducationForm,
  },
  {
    key: "courses",
    Component: PersonalCoursesForm,
  },
  {
    key: "skills",
    Component: PersonalSkillsForm,
  },
  {
    key: "tools",
    Component: PersonalToolsForm,
  },
];

export const DEFAULT_RESUME_ITEM = "general";
