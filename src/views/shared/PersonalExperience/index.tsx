"use client";
import { useEffect } from "react";

import { PersonalExperiencesProps } from "@/lib/constants/props/resume/personalExperiences";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import fetchPersonalExperience from "@/store/personalExperience/operations/fetchPersonalExperience";
import { isLoadingSelector } from "@/store/personalExperience/selectors";

import PersonalExperienceForm from "@/views/shared/PersonalExperience/Form";

const PersonalExperience = ({
  resumeLocale,
  isEdit,
}: PersonalExperiencesProps) => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(isLoadingSelector);

  useEffect(() => {
    if (resumeLocale) {
      dispatch(fetchPersonalExperience());
    }
  }, [dispatch, resumeLocale]);

  return isLoading ? (
    <>Loading</>
  ) : (
    <PersonalExperienceForm resumeLocale={resumeLocale} isEdit={isEdit} />
  );
};

export default PersonalExperience;
