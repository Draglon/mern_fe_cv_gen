"use client";
import { useEffect } from "react";

import { Locales } from "@/lib/constants/props/locales";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import fetchPersonalHobbies from "@/store/personalHobbies/operations/fetchPersonalHobbies";
import { isLoadingSelector } from "@/store/personalHobbies/selectors";
import { personalHobbiesIdSelector } from "@/store/auth/selectors";

import PersonalHobbiesForm from "@/views/shared/PersonalHobbies/Form";

type PersonalHobbiesProps = {
  locale: Locales;
  isEdit?: boolean;
};

const PersonalHobbies = ({ locale, isEdit }: PersonalHobbiesProps) => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(isLoadingSelector);
  const personalHobbiesId = useAppSelector(personalHobbiesIdSelector);

  useEffect(() => {
    if (personalHobbiesId) {
      dispatch(fetchPersonalHobbies({ id: personalHobbiesId }));
    }
  }, [dispatch, personalHobbiesId]);

  return isLoading ? (
    <>Loading</>
  ) : (
    <PersonalHobbiesForm locale={locale} isEdit={isEdit} />
  );
};

export default PersonalHobbies;
