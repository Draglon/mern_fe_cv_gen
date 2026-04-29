"use client";
import { useEffect } from "react";

import { PersonalHobbiesProps } from "@/lib/constants/props/resume/personalHobbies";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import fetchPersonalHobbies from "@/store/personalHobbies/operations/fetchPersonalHobbies";
import { isLoadingSelector } from "@/store/personalHobbies/selectors";

import PersonalHobbiesForm from "@/views/shared/PersonalHobbies/Form";

const PersonalHobbies = ({ locale, isEdit }: PersonalHobbiesProps) => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(isLoadingSelector);

  useEffect(() => {
    if (locale) {
      dispatch(fetchPersonalHobbies());
    }
  }, [dispatch, locale]);

  return isLoading ? (
    <>Loading</>
  ) : (
    <PersonalHobbiesForm locale={locale} isEdit={isEdit} />
  );
};

export default PersonalHobbies;
