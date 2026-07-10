"use client";
import { useRef, useEffect } from "react";

import { TemplateProps, ResumeProps } from "@/lib/constants/props/resume";
import isDeepEmpty from "@/utils/isDeepEmpty";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import fetchResume from "@/store/resume/operations/fetchResume";
import { userIdSelector } from "@/store/auth/selectors";
import { resumeSelector, isLoadingSelector } from "@/store/resume/selectors";

import Navigation from "@/views/Resume/Template/Navigation";
import Sidebar from "@/views/Resume/Template/Sidebar";
import Content from "@/views/Resume/Template/Content";
import EmptyState from "@/views/Resume/Template/EmptyState";
import Loader from "@/views/shared/antd/Loader";

const ResumeTemplate = ({ template, templateLocale }: TemplateProps) => {
  const dispatch = useAppDispatch();
  const userId: string = useAppSelector(userIdSelector);
  const resume = useAppSelector(resumeSelector) as ResumeProps;
  const isLoading = useAppSelector(isLoadingSelector);
  const resumeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (userId) {
      dispatch(fetchResume({ userId }));
    }
  }, [dispatch, userId]);

  return (
    <div className={`template template--${template}`}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {!isDeepEmpty(resume) ? (
            <>
              <Navigation resumeRef={resumeRef} />
              <div className="template__resume" ref={resumeRef}>
                <Sidebar
                  template={template}
                  templateLocale={templateLocale}
                  resume={resume}
                />
                <Content
                  template={template}
                  templateLocale={templateLocale}
                  resume={resume}
                />
              </div>
            </>
          ) : (
            <EmptyState />
          )}
        </>
      )}
    </div>
  );
};

export default ResumeTemplate;
