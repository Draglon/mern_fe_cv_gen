"use client";
import { useState } from "react";
import { inc, dec } from "ramda";
import { useLocale, useTranslations } from "next-intl";

import { redirect } from "@/i18n/navigation";
import { resumeRoute } from "@/lib/routes";
import { Locales } from "@/lib/constants/props/locales";
import { ParamsType } from "@/lib/constants/props/createResume";
import { DEFAULT_LOCALE } from "@/lib/constants/locales";
import { RESUME_ITEMS } from "@/lib/constants/resume";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { userResumeSelector } from "@/store/auth/selectors";
import updateUserResume from "@/store/auth/operations/updateUserResume";

import Button from "@/views/shared/antd/Button";
import { Title } from "@/views/shared/antd/Typography";
import Steps from "@/views/shared/Steps";
import LocalTabs from "@/views/shared/LocalTabs";

const ResumeCreate = () => {
  const dispatch = useAppDispatch();
  const locale = useLocale();
  const t = useTranslations("ResumeCreate");
  const tShared = useTranslations("shared");
  const { currentStep } = useAppSelector(userResumeSelector);
  const [resumeLocale, onChangeLocale] = useState<Locales>(DEFAULT_LOCALE);

  const onChangeStep = (resume: ParamsType) => () => {
    dispatch(updateUserResume(resume));

    if (resume.isCreated) {
      redirect({ href: resumeRoute, locale });
    }
  };

  const onChange = (resumeLocale: string): void => {
    onChangeLocale(resumeLocale as Locales);
  };

  const CREATE_RESUME_STEPS = RESUME_ITEMS.map(({ key, Component }) => ({
    title: t(`steps.${key}`),
    content: (
      <LocalTabs
        onChange={onChange}
        Component={<Component resumeLocale={resumeLocale} />}
      />
    ),
  }));

  return (
    <div className="page__wrapper">
      <div className="page__block">
        <header className="mb-32">
          <Title className="page__title mt-0">{t("title")}</Title>
        </header>
        <Steps
          steps={CREATE_RESUME_STEPS}
          orientation="vertical"
          current={currentStep}
        />
        <footer className="text-right">
          {currentStep > 0 && (
            <Button
              className="m-0"
              onClick={onChangeStep({
                currentStep: dec(currentStep),
                isCreated: false,
              })}
            >
              {tShared("previous")}
            </Button>
          )}
          {currentStep < dec(CREATE_RESUME_STEPS.length) && (
            <Button
              className="ml-16"
              onClick={onChangeStep({
                currentStep: inc(currentStep),
                isCreated: false,
              })}
            >
              {tShared("next")}
            </Button>
          )}
          {currentStep === dec(CREATE_RESUME_STEPS.length) && (
            <Button
              className="ml-16"
              onClick={onChangeStep({
                currentStep,
                isCreated: true,
              })}
            >
              {tShared("finish")}
            </Button>
          )}
        </footer>
      </div>
    </div>
  );
};

export default ResumeCreate;
