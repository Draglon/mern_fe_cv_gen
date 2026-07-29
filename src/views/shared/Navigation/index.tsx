import { useTranslations } from "next-intl";

import { resumeRoute, resumeCreateRoute, resumeEditRoute } from "@/lib/routes";
import { useAppSelector } from "@/store/hooks";
import { userResumeSelector } from "@/store/auth/selectors";

import NavigationLink from "@/views/shared/NavigationLink";

const Navigation = () => {
  const t = useTranslations("Navigation");
  const userResume = useAppSelector(userResumeSelector);

  return (
    <nav className="nav">
      <NavigationLink href={resumeRoute} className="nav__link">
        {t("navResume")}
      </NavigationLink>
      {!userResume?.isCreated && (
        <NavigationLink href={resumeCreateRoute} className="nav__link">
          {t("navResumeCreate")}
        </NavigationLink>
      )}
      {userResume?.isCreated && (
        <NavigationLink href={resumeEditRoute} className="nav__link">
          {t("navResumeEdit")}
        </NavigationLink>
      )}
    </nav>
  );
};

export default Navigation;
