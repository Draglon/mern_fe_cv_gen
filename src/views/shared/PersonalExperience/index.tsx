"use client";
import { useEffect } from "react";

import { Locales } from "@/lib/constants/props/locales";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import fetchPersonalExperience from "@/store/personalExperience/operations/fetchPersonalExperience";
import { isLoadingSelector } from "@/store/personalExperience/selectors";

import PersonalExperienceForm from "@/views/shared/PersonalExperience/Form";

type PersonalExperienceProps = {
  locale: Locales;
  isEdit?: boolean;
};

const PersonalExperience = ({ locale, isEdit }: PersonalExperienceProps) => {
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
