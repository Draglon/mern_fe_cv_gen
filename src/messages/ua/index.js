import home from "./home";
import login from "./login";
import signup from "./signup";
import profile from "./profile";
import settings from "./settings";
import resume from "./resume";
import resumeCreate from "./resumeCreate";
import resumeEdit from "./resumeEdit";
import personalInfo from "./personalInfo";
import personalHobbies from "./personalHobbies";
import personalLanguages from "./personalLanguages";
import personalExperience from "./personalExperience";
import personalEducation from "./personalEducation";
import personalCourses from "./personalCourses";
import personalSkills from "./personalSkills";
import personalTools from "./personalTools";
import navigation from "./navigation";
import localeSwitcher from "./localeSwitcher";
import localeTabs from "./localeTabs";
import shared from "./shared";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  ...home,
  ...login,
  ...signup,
  ...profile,
  ...settings,
  ...resume,
  ...resumeCreate,
  ...resumeEdit,
  ...personalInfo,
  ...personalHobbies,
  ...personalLanguages,
  ...personalExperience,
  ...personalEducation,
  ...personalCourses,
  ...personalSkills,
  ...personalTools,
  ...navigation,
  ...localeSwitcher,
  ...localeTabs,
  ...shared,
};
