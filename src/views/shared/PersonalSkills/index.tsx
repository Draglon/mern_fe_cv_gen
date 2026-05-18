"use client";
import { useEffect } from "react";

import { PersonalSkillsProps } from "@/lib/constants/props/resume/personalSkills";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import fetchPersonalSkills from "@/store/personalSkills/operations/fetchPersonalSkills";
import { isLoadingSelector } from "@/store/personalSkills/selectors";

import PersonalSkillsForm from "@/views/shared/PersonalSkills/Form";

const PersonalSkills = ({ resumeLocale, isEdit }: PersonalSkillsProps) => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(isLoadingSelector);

  useEffect(() => {
    if (resumeLocale) {
      dispatch(fetchPersonalSkills());
    }
  }, [dispatch, resumeLocale]);

  return isLoading ? (
    <>Loading</>
  ) : (
    <PersonalSkillsForm resumeLocale={resumeLocale} isEdit={isEdit} />
  );
};

export default PersonalSkills;
