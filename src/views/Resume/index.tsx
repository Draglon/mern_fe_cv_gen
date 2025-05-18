"use client";
import { useState } from "react";

import { TEMPLATES } from "@/lib/constants/templates";

import TemplatesList from "@/views/Resume/TemplatesList";
import Template from "@/views/Resume/Template";

const Resume = () => {
  const [template, setTemplate] = useState<string>(TEMPLATES.standford);

  return (
    <>
      <div className="page__sidebar">
        <TemplatesList setTemplate={setTemplate} activeTemplate={template} />
      </div>
      <div className="page__content">
        <Template template={template} />
      </div>
    </>
  );
};

export default Resume;
