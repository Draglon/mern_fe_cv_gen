"use client";
import { useEffect, useState } from "react";

import { TEMPLATES_LIST, TEMPLATES } from "@/lib/constants/templates";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import fetchPersonalInfo from "@/store/personalInfo/operations/fetchPersonalInfo";
import { personalInfoIdSelector } from "@/store/auth/selectors";
import { personalInfoSelector } from "@/store/personalInfo/selectors";

import Sidebar from "@/views/Resume/Sidebar";
import Content from "@/views/Resume/Content";

const Resume = () => {
  const [template, setTemplate] = useState(TEMPLATES.standford);
  const dispatch = useAppDispatch();
  const personalInfoId = useAppSelector(personalInfoIdSelector);
  const personalInfoData = useAppSelector(personalInfoSelector);

  useEffect(() => {
    if (personalInfoId) {
      dispatch(fetchPersonalInfo({ id: personalInfoId }));
    }
  }, [dispatch, personalInfoId]);

  return (
    <div className="page-container">
      <div className="sidebar">
        <ul className="templates-list">
          {TEMPLATES_LIST.map((item, index) => (
            <li key={index} className="templates-list__item">
              <a
                className="templates-list__link"
                href="#"
                role="button"
                onClick={() => setTemplate(item.template)}
              >
                {item.template}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className={`template template--${template}`}>
        <Sidebar personalInfo={personalInfoData} template={template} />
        <Content personalInfo={personalInfoData} template={template} />
      </div>
    </div>
  );
};

export default Resume;
