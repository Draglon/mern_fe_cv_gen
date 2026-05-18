"use client";
import { useEffect } from "react";

import { PersonalEducationProps } from "@/lib/constants/props/resume/personalEducation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import fetchPersonalEducation from "@/store/personalEducation/operations/fetchPersonalEducation";
import { isLoadingSelector } from "@/store/personalEducation/selectors";

import PersonalEducationForm from "@/views/shared/PersonalEducation/Form";

const PersonalEducation = ({
  resumeLocale,
  isEdit,
}: PersonalEducationProps) => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(isLoadingSelector);

  useEffect(() => {
    if (resumeLocale) {
      dispatch(fetchPersonalEducation());
    }
  }, [dispatch, resumeLocale]);

  return isLoading ? (
    <>Loading</>
  ) : (
    <PersonalEducationForm resumeLocale={resumeLocale} isEdit={isEdit} />
  );
};

export default PersonalEducation;
