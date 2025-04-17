"use client";
import { useState } from "react";
import { inc, dec } from "ramda";
import { useTranslations } from "next-intl";

import { DEFAULT_LOCALE } from "@/lib/constants/locales";
import Button from "@/views/shared/antd/Button";
import { Title } from "@/views/shared/antd/Typography";
import Steps from "@/views/shared/Steps";
import LocalTabs from "@/views/shared/LocalTabs";
import PersonalInfoForm from "@/views/shared/PersonalInfoForm";
import PersonalHobbiesForm from "@/views/shared/PersonalHobbiesForm";
import PersonalLanguagesForm from "@/views/shared/PersonalLanguagesForm";
import PersonalExperienceForm from "@/views/shared/PersonalExperienceForm";
import PersonalEducationForm from "@/views/shared/PersonalEducationForm";
import PersonalCoursesForm from "@/views/shared/PersonalCoursesForm";
import PersonalSkillsForm from "@/views/shared/PersonalSkillsForm";
import PersonalToolsForm from "@/views/shared/PersonalToolsForm";

const ResumeCreate = () => {
  const t = useTranslations("ResumeCreate");
  const tShared = useTranslations("shared");
  const [current, setCurrent] = useState(0);
  const [locale, setLocale] = useState(DEFAULT_LOCALE);

  const onNext = (): void => {
    setCurrent(inc(current));
  };

  const onPrev = (): void => {
    setCurrent(dec(current));
  };

  const onChange = (locale: string): void => {
    setLocale(locale);
  };

  const CREATE_RESUME_STEPS = [
    {
      title: t("personalInfo"),
      content: (
        <LocalTabs
          onChange={onChange}
          Component={<PersonalInfoForm locale={locale} />}
        />
      ),
    },
    {
      title: t("personalHobbies"),
      content: (
        <LocalTabs
          onChange={onChange}
          Component={<PersonalHobbiesForm locale={locale} />}
        />
      ),
    },
    {
      title: t("personalLanguages"),
      content: (
        <LocalTabs
          onChange={onChange}
          Component={<PersonalLanguagesForm locale={locale} />}
        />
      ),
    },
    {
      title: t("personalExperience"),
      content: (
        <LocalTabs
          onChange={onChange}
          Component={<PersonalExperienceForm locale={locale} />}
        />
      ),
    },
    {
      title: t("personalEducation"),
      content: (
        <LocalTabs
          onChange={onChange}
          Component={<PersonalEducationForm locale={locale} />}
        />
      ),
    },
    {
      title: t("personalCourses"),
      content: (
        <LocalTabs
          onChange={onChange}
          Component={<PersonalCoursesForm locale={locale} />}
        />
      ),
    },
    {
      title: t("personalSkills"),
      content: (
        <LocalTabs
          onChange={onChange}
          Component={<PersonalSkillsForm locale={locale} />}
        />
      ),
    },
    {
      title: t("personalTools"),
      content: (
        <LocalTabs
          onChange={onChange}
          Component={<PersonalToolsForm locale={locale} />}
        />
      ),
    },
  ];

  return (
    <div className="page__container">
      <div className="page__block">
        <header className="text-center mb-32">
          <Title className="page__title mt-0">{t("title")}</Title>
        </header>
        <Steps
          steps={CREATE_RESUME_STEPS}
          direction="vertical"
          current={current}
        />
        <footer className="text-right">
          {current > 0 && (
            <Button className="" onClick={onPrev}>
              {tShared("previous")}
            </Button>
          )}
          {current < dec(CREATE_RESUME_STEPS.length) && (
            <Button className="ml-16" onClick={onNext}>
              {tShared("next")}
            </Button>
          )}
        </footer>
      </div>
    </div>
  );
};

export default ResumeCreate;
