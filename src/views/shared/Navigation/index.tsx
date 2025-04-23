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
        {t("navResumeCreate")}
      </NavigationLink>
      <NavigationLink href="/resume_edit" className="nav__link">
        {t("navResumeEdit")}
      </NavigationLink>
    </nav>
  );
};

export default Navigation;
