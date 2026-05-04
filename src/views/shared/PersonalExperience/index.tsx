"use client";
import { useEffect } from "react";

import { PersonalExperiencesProps } from "@/lib/constants/props/resume/personalExperiences";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import fetchPersonalExperience from "@/store/personalExperience/operations/fetchPersonalExperience";
import { isLoadingSelector } from "@/store/personalExperience/selectors";

import PersonalExperienceForm from "@/views/shared/PersonalExperience/Form";

const PersonalExperience = ({ locale, isEdit }: PersonalExperiencesProps) => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(isLoadingSelector);

  useEffect(() => {
    if (locale) {
      dispatch(fetchPersonalExperience());
    }
  }, [dispatch, locale]);

  return isLoading ? (
    <>Loading</>
  ) : (
    <PersonalExperienceForm locale={locale} isEdit={isEdit} />
  );
};

export default PersonalExperience;
