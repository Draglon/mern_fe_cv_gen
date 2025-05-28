"use client";
import clsx from "clsx";
import { Dispatch, SetStateAction } from "react";

type ResumeTemplateCustomizationProps = {
  activeTemplateLanguage: string;
  setTemplateLanguage: Dispatch<SetStateAction<string>>;
};

const ResumeTemplateCustomization = ({
  activeTemplateLanguage,
  setTemplateLanguage,
}: ResumeTemplateCustomizationProps) => {
  return (
    <section className="">
      <section className="">
        <h3 className="title">Language</h3>
        <ul className="">
          <li
            className={clsx({ active: activeTemplateLanguage === "en" })}
            onClick={() => setTemplateLanguage("en")}
            role="button"
          >
            English
          </li>
          <li
            className={clsx({ active: activeTemplateLanguage === "ru" })}
            onClick={() => setTemplateLanguage("ru")}
            role="button"
          >
            Russian
          </li>
          <li
            className={clsx({ active: activeTemplateLanguage === "ua" })}
            onClick={() => setTemplateLanguage("ua")}
            role="button"
          >
            Ukrainian
          </li>
        </ul>
      </section>
    </section>
  );
};

export default ResumeTemplateCustomization;
