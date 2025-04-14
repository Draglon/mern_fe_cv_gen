import home from "./home";
import login from "./login";
import signup from "./signup";
import profile from "./profile";
import settings from "./settings";
import navigation from "./navigation";
import localeSwitcher from "./localeSwitcher";
import resume from "./resume";
import resumeCreate from "./resumeCreate";
import resumeEdit from "./resumeEdit";
import shared from "./shared";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  ...home,
  ...login,
  ...signup,
  ...profile,
  ...settings,
  ...navigation,
  ...localeSwitcher,
  ...resume,
  ...resumeCreate,
  ...resumeEdit,
  ...shared,
};
