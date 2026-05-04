"use client";
import { useEffect } from "react";

import { PersonalSkillsProps } from "@/lib/constants/props/resume/personalSkills";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import fetchPersonalSkills from "@/store/personalSkills/operations/fetchPersonalSkills";
import { isLoadingSelector } from "@/store/personalSkills/selectors";

import PersonalSkillsForm from "@/views/shared/PersonalSkills/Form";

const PersonalSkills = ({ locale, isEdit }: PersonalSkillsProps) => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(isLoadingSelector);

  useEffect(() => {
    if (locale) {
      dispatch(fetchPersonalSkills());
    }
  }, [dispatch, locale]);

  return isLoading ? (
    <>Loading</>
  ) : (
    <PersonalSkillsForm locale={locale} isEdit={isEdit} />
  );
};

export default PersonalSkills;
