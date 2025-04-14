import { useTranslations } from "next-intl";

import NavigationLink from "@/views/shared/NavigationLink";

const Navigation = () => {
  const t = useTranslations("Navigation");

  return (
    <nav className="nav">
      <NavigationLink href="/resume" className="nav__link">
        {t("navResume")}
      </NavigationLink>
      <NavigationLink href="/resume_create" className="nav__link">
        Resume create
      </NavigationLink>
      <NavigationLink href="/resume_edit" className="nav__link">
        Resume edit
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
