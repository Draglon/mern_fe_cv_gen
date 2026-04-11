"use client";
import { useEffect } from "react";

import { TemplateProps } from "@/lib/constants/props/resume";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import fetchResume from "@/store/resume/operations/fetchResume";
import { userIdSelector } from "@/store/auth/selectors";

import Sidebar from "@/views/Resume/Template/Sidebar";
import Content from "@/views/Resume/Template/Content";

const ResumeTemplate = ({ template, templateLanguage }: TemplateProps) => {
  const dispatch = useAppDispatch();
  const userId: string = useAppSelector(userIdSelector);

  useEffect(() => {
    if (userId) {
      dispatch(fetchResume({ userId }));
    }
  }, [dispatch, userId]);

  return (
    <div className={`template template--${template}`}>
      <Sidebar template={template} templateLanguage={templateLanguage} />
      <Content template={template} templateLanguage={templateLanguage} />
    </div>
  );
};

export default ResumeTemplate;
