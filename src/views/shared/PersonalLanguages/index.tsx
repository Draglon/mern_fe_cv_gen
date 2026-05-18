"use client";
import { useEffect } from "react";

import { PersonalLanguagesProps } from "@/lib/constants/props/resume/personalLanguages";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import fetchPersonalLanguages from "@/store/personalLanguages/operations/fetchPersonalLanguages";
import { isLoadingSelector } from "@/store/personalLanguages/selectors";

import PersonalLanguagesForm from "@/views/shared/PersonalLanguages/Form";

const PersonalLanguages = ({
  resumeLocale,
  isEdit,
}: PersonalLanguagesProps) => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(isLoadingSelector);

  useEffect(() => {
    if (resumeLocale) {
      dispatch(fetchPersonalLanguages());
    }
  }, [dispatch, resumeLocale]);

  return isLoading ? (
    <>Loading</>
  ) : (
    <PersonalLanguagesForm resumeLocale={resumeLocale} isEdit={isEdit} />
  );
};

export default PersonalLanguages;
