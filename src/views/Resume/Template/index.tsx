"use client";
import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import fetchPersonalInfo from "@/store/personalInfo/operations/fetchPersonalInfo";
import { personalInfoIdSelector } from "@/store/auth/selectors";
import { personalInfoSelector } from "@/store/personalInfo/selectors";

import Sidebar from "@/views/Resume/Template/Sidebar";
import Content from "@/views/Resume/Template/Content";

type ResumeTemplateProps = {
  template: string;
};

const ResumeTemplate = ({ template }: ResumeTemplateProps) => {
  const dispatch = useAppDispatch();
  const personalInfoId = useAppSelector(personalInfoIdSelector);
  const personalInfoData = useAppSelector(personalInfoSelector);

  useEffect(() => {
    if (personalInfoId) {
      dispatch(fetchPersonalInfo({ id: personalInfoId }));
    }
  }, [dispatch, personalInfoId]);

  return (
    <div className={`template template--${template}`}>
      <Sidebar personalInfo={personalInfoData} template={template} />
      <Content personalInfo={personalInfoData} template={template} />
    </div>
  );
};

export default ResumeTemplate;
