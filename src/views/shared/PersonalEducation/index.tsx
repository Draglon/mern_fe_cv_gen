"use client";
import { useEffect } from "react";

import { PersonalEducationProps } from "@/lib/constants/props/resume/personalEducation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import fetchPersonalEducation from "@/store/personalEducation/operations/fetchPersonalEducation";
import { isLoadingSelector } from "@/store/personalEducation/selectors";

import PersonalEducationForm from "@/views/shared/PersonalEducation/Form";

const PersonalEducation = ({ locale, isEdit }: PersonalEducationProps) => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(isLoadingSelector);

  useEffect(() => {
    if (locale) {
      dispatch(fetchPersonalEducation());
    }
  }, [dispatch, locale]);

  return isLoading ? (
    <>Loading</>
  ) : (
    <PersonalEducationForm locale={locale} isEdit={isEdit} />
  );
};

export default PersonalEducation;
