"use client";
import { useEffect } from "react";

import { PersonalInfoProps } from "@/lib/constants/props/resume/personalInfo";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import fetchPersonalInfo from "@/store/personalInfo/operations/fetchPersonalInfo";
import { isLoadingSelector } from "@/store/personalInfo/selectors";

import PersonalInfoForm from "@/views/shared/PersonalInfo/Form";

const PersonalInfo = ({ resumeLocale, isEdit }: PersonalInfoProps) => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(isLoadingSelector);

  useEffect(() => {
    if (resumeLocale) {
      dispatch(fetchPersonalInfo());
    }
  }, [dispatch, resumeLocale]);

  return isLoading ? (
    <>Loading</>
  ) : (
    <PersonalInfoForm resumeLocale={resumeLocale} isEdit={isEdit} />
  );
};

export default PersonalInfo;
