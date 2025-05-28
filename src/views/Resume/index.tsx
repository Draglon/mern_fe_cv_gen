"use client";
import { useState } from "react";

import { TEMPLATES } from "@/lib/constants/templates";

import TemplatesList from "@/views/Resume/TemplatesList";
import Template from "@/views/Resume/Template";
import TemplateCustomization from "@/views/Resume/TemplateCustomization";

const Resume = () => {
  const [template, setTemplate] = useState<string>(TEMPLATES.standford);
  const [templateLanguage, setTemplateLanguage] = useState<string>("en");

  return (
    <>
      <div className="page__sidebar page__sidebar--left">
        <TemplatesList setTemplate={setTemplate} activeTemplate={template} />
      </div>
      <div className="page__content">
        <Template template={template} templateLanguage={templateLanguage} />
      </div>
      <div className="page__sidebar page__sidebar--right">
        <TemplateCustomization
          activeTemplateLanguage={templateLanguage}
          setTemplateLanguage={setTemplateLanguage}
        />
      </div>
    </>
  );
};

export default Resume;
