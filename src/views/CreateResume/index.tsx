"use client";
import { useState } from "react";
import { inc, dec } from "ramda";
import { useTranslations } from "next-intl";

import Steps from "@/views/shared/Steps";
import { Title } from "@/views/shared/antd/Typography";

import PersonalInfoForm from "./PersonalInfoForm";
import PersonalHobbiesForm from "./PersonalHobbiesForm";
import PersonalLanguagesForm from "./PersonalLanguagesForm";
import PersonalExperienceForm from "./PersonalExperienceForm";
import PersonalEducationForm from "./PersonalEducationForm";
import PersonalCoursesForm from "./PersonalCoursesForm";
import PersonalSkillsForm from "./PersonalSkillsForm";
import PersonalToolsForm from "./PersonalToolsForm";

const CreateResume = () => {
  const t = useTranslations("CreateResume");
  const [current, setCurrent] = useState(0);

  const onNext = () => {
    setCurrent(inc(current));
  };

  const onPrev = () => {
    setCurrent(dec(current));
  };

  const CREATE_RESUME_STEPS = [
    {
      title: "Personal info",
      content: <PersonalInfoForm onNext={onNext} />,
    },
    {
      title: "Personal hobbies",
      content: <PersonalHobbiesForm onPrev={onPrev} onNext={onNext} />,
    },
    {
      title: "Personal languages",
      content: <PersonalLanguagesForm onPrev={onPrev} onNext={onNext} />,
    },
    {
      title: "Personal experience",
      content: <PersonalExperienceForm onPrev={onPrev} onNext={onNext} />,
    },
    {
      title: "Personal education",
      content: <PersonalEducationForm onPrev={onPrev} onNext={onNext} />,
    },
    {
      title: "Personal courses",
      content: <PersonalCoursesForm onPrev={onPrev} onNext={onNext} />,
    },
    {
      title: "Personal skills",
      content: <PersonalSkillsForm onPrev={onPrev} onNext={onNext} />,
    },
    {
      title: "Personal tools",
      content: <PersonalToolsForm onPrev={onPrev} />,
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
      </div>
    </div>
  );
};

export default CreateResume;
