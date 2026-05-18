"use client";
import { useEffect } from "react";

import { PersonalHobbiesProps } from "@/lib/constants/props/resume/personalHobbies";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import fetchPersonalHobbies from "@/store/personalHobbies/operations/fetchPersonalHobbies";
import { isLoadingSelector } from "@/store/personalHobbies/selectors";

import PersonalHobbiesForm from "@/views/shared/PersonalHobbies/Form";

const PersonalHobbies = ({ resumeLocale, isEdit }: PersonalHobbiesProps) => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(isLoadingSelector);

  useEffect(() => {
    if (resumeLocale) {
      dispatch(fetchPersonalHobbies());
    }
  }, [dispatch, resumeLocale]);

  return isLoading ? (
    <>Loading</>
  ) : (
    <PersonalHobbiesForm resumeLocale={resumeLocale} isEdit={isEdit} />
  );
};

export default PersonalHobbies;
