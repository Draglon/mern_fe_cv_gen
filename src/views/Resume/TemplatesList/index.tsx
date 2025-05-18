"use client";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import clsx from "clsx";

import { TEMPLATES_LIST } from "@/lib/constants/templates";

type ResumeTemplatesListProps = {
  activeTemplate: string;
  setTemplate: Dispatch<SetStateAction<string>>;
};

const ResumeTemplatesList = ({
  setTemplate,
  activeTemplate,
}: ResumeTemplatesListProps) => {
  return (
    <ul className="templates-list">
      {TEMPLATES_LIST.map(({ template, image }, index) => (
        <li key={index} className="templates-list__item">
          <a
            className={clsx("templates-list__link", {
              "templates-list__link--active": activeTemplate === template,
            })}
            href="#"
            role="button"
            onClick={() => setTemplate(template)}
          >
            <Image
              className="templates-list__image"
              src={image}
              alt={template}
              width={160}
              height={240}
            />
          </a>
        </li>
      ))}
    </ul>
  );
};

export default ResumeTemplatesList;
