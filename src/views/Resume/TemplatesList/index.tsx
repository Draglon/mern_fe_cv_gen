"use client";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import clsx from "clsx";

import { TEMPLATES_LIST } from "@/lib/constants/templates";
import Button from "@/views/shared/antd/Button";

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
          <Button
            className={clsx("templates-list__btn", {
              "templates-list__btn--active": activeTemplate === template,
            })}
            color="default"
            variant="link"
            onClick={() => setTemplate(template)}
          >
            <Image
              className="templates-list__image"
              src={image}
              alt={template}
              width={160}
              height={240}
            />
          </Button>
        </li>
      ))}
    </ul>
  );
};

export default ResumeTemplatesList;
