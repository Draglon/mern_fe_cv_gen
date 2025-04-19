"use client";
import { useState } from "react";
import { inc, dec } from "ramda";
import { useTranslations } from "next-intl";

import { DEFAULT_LOCALE } from "@/lib/constants/locales";
import { RESUME_ITEMS } from "@/lib/constants/resume";
import Button from "@/views/shared/antd/Button";
import { Title } from "@/views/shared/antd/Typography";
import Steps from "@/views/shared/Steps";
import LocalTabs from "@/views/shared/LocalTabs";

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

  const CREATE_RESUME_STEPS = RESUME_ITEMS.map(({ key, Component }) => ({
    title: t(`steps.${key}`),
    content: (
      <LocalTabs
        onChange={onChange}
        Component={<Component locale={locale} />}
      />
    ),
  }));

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
