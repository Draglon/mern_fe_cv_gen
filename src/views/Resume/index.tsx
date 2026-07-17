"use client";
import { useState } from "react";

import { TEMPLATES } from "@/lib/constants/templates";
import { Locales } from "@/lib/constants/props/locales";

import TemplatesList from "@/views/Resume/TemplatesList";
import Template from "@/views/Resume/Template";
import TemplateCustomization from "@/views/Resume/TemplateCustomization";

const Resume = () => {
  const [template, setTemplate] = useState<string>(TEMPLATES.edinburgh);
  const [templateLocale, setTemplateLocale] = useState<Locales>("en");

  return (
    <>
      <div className="page__sidebar page__sidebar--left">
        <TemplatesList setTemplate={setTemplate} activeTemplate={template} />
      </div>
      <div className="page__content">
        <Template template={template} templateLocale={templateLocale} />
      </div>
      <div className="page__sidebar page__sidebar--right">
        <TemplateCustomization
          activeTemplateLocale={templateLocale}
          setTemplateLocale={setTemplateLocale}
        />
      </div>
    </>
  );
};

export default Resume;
