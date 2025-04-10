import { useTranslations } from "next-intl";

import NavigationLink from "@/views/shared/NavigationLink";

const Navigation = () => {
  const t = useTranslations("Navigation");

  return (
    <nav className="nav">
      <NavigationLink href="/create_resume" className="nav__link">
        Create resume
      </NavigationLink>
      <NavigationLink href="/resume" className="nav__link">
        {t("navResume")}
      </NavigationLink>
      <NavigationLink href="/template_us" className="nav__link">
        {t("navResumeUS")}
      </NavigationLink>
      <NavigationLink href="/template_ua" className="nav__link">
        {t("navResumeUA")}
      </NavigationLink>
    </nav>
  );
};

export default Navigation;
