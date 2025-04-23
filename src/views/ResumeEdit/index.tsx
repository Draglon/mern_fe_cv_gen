"use client";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

import { DEFAULT_LOCALE } from "@/lib/constants/locales";
import { RESUME_ITEMS, DEFAULT_RESUME_ITEM } from "@/lib/constants/resume";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import fetchPersonalCourses from "@/store/personalCourses/operations/fetchPersonalCourses";
import fetchPersonalEducation from "@/store/personalEducation/operations/fetchPersonalEducation";
import fetchPersonalExperience from "@/store/personalExperience/operations/fetchPersonalExperience";
import fetchPersonalHobbies from "@/store/personalHobbies/operations/fetchPersonalHobbies";
import fetchPersonalInfo from "@/store/personalInfo/operations/fetchPersonalInfo";
import fetchPersonalLanguages from "@/store/personalLanguages/operations/fetchPersonalLanguages";
import fetchPersonalSkills from "@/store/personalSkills/operations/fetchPersonalSkills";
import fetchPersonalTools from "@/store/personalTools/operations/fetchPersonalTools";
import { userSelector } from "@/store/auth/selectors";
import Tabs from "@/views/shared/antd/Tabs";
import LocalTabs from "@/views/shared/LocalTabs";
import { Title } from "@/views/shared/antd/Typography";

const ResumeEdit = () => {
  const t = useTranslations("ResumeEdit");
  const dispatch = useAppDispatch();
  const user = useAppSelector(userSelector);
  const [currentTab, setCurrentTab] = useState(DEFAULT_RESUME_ITEM);
  const [locale, setLocale] = useState(DEFAULT_LOCALE);

  useEffect(() => {
    if (user?.personalCoursesId) {
      dispatch(fetchPersonalCourses({ id: user.personalCoursesId }));
    }
    if (user?.personalEducationId) {
      dispatch(fetchPersonalEducation({ id: user.personalEducationId }));
    }
    if (user?.personalExperienceId) {
      dispatch(fetchPersonalExperience({ id: user.personalExperienceId }));
    }
    if (user?.personalHobbiesId) {
      dispatch(fetchPersonalHobbies({ id: user.personalHobbiesId }));
    }
    if (user?.personalInfoId) {
      dispatch(fetchPersonalInfo({ id: user.personalInfoId }));
    }
    if (user?.personalLanguagesId) {
      dispatch(fetchPersonalLanguages({ id: user.personalLanguagesId }));
    }
    if (user?.personalSkillsId) {
      dispatch(fetchPersonalSkills({ id: user.personalSkillsId }));
    }
    if (user?.personalToolsId) {
      dispatch(fetchPersonalTools({ id: user.personalToolsId }));
    }
  }, [dispatch, user]);

  const onChangeTab = (tabKey: string): void => {
    setCurrentTab(tabKey);
  };

  const onChangeLocale = (locale: string): void => {
    setLocale(locale);
  };

  const EDIT_RESUME_TABS = RESUME_ITEMS.map(({ key, Component }) => ({
    key: key,
    label: t(`tabs.${key}`),
    children: (
      <LocalTabs
        onChange={onChangeLocale}
        Component={<Component locale={locale} isEdit />}
      />
    ),
  }));

  return (
    <div className="page__container">
      <div className="page__block">
        <header className="text-center mb-32">
          <Title className="page__title mt-0">{t("title")}</Title>
        </header>
        <Tabs
          items={EDIT_RESUME_TABS}
          defaultActiveKey={currentTab}
          onChange={onChangeTab}
        />
      </div>
    </div>
  );
};

export default ResumeEdit;
