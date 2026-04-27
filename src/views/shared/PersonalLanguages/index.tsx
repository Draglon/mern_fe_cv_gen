"use client";
import { useEffect } from "react";

import { Locales } from "@/lib/constants/props/locales";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import fetchPersonalLanguages from "@/store/personalLanguages/operations/fetchPersonalLanguages";
import { isLoadingSelector } from "@/store/personalLanguages/selectors";

import PersonalLanguagesForm from "@/views/shared/PersonalLanguages/Form";

type PersonalLanguagesProps = {
  locale: Locales;
  isEdit?: boolean;
};

const PersonalLanguages = ({ locale, isEdit }: PersonalLanguagesProps) => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(isLoadingSelector);

  useEffect(() => {
    if (locale) {
      dispatch(fetchPersonalLanguages());
    }
  }, [dispatch, locale]);

  return isLoading ? (
    <>Loading</>
  ) : (
    <PersonalLanguagesForm locale={locale} isEdit={isEdit} />
  );
};

export default PersonalLanguages;
