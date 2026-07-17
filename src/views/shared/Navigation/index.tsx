import { useTranslations } from "next-intl";

import { useAppSelector } from "@/store/hooks";
import { userResumeSelector } from "@/store/auth/selectors";

import NavigationLink from "@/views/shared/NavigationLink";

const Navigation = () => {
  const t = useTranslations("Navigation");
  const { isCreated } = useAppSelector(userResumeSelector);

  return (
    <nav className="nav">
      <NavigationLink href="/resume" className="nav__link">
        {t("navResume")}
      </NavigationLink>
      {!isCreated && (
        <NavigationLink href="/resume_create" className="nav__link">
          {t("navResumeCreate")}
        </NavigationLink>
      )}
      {isCreated && (
        <NavigationLink href="/resume_edit" className="nav__link">
          {t("navResumeEdit")}
        </NavigationLink>
      )}
    </nav>
  );
};

export default Navigation;
