"use client";
import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import fetchPersonalLanguages from "@/store/personalLanguages/operations/fetchPersonalLanguages";
import { isLoadingSelector } from "@/store/personalLanguages/selectors";
import { personalLanguagesIdSelector } from "@/store/auth/selectors";

import PersonalLanguagesForm from "@/views/shared/PersonalLanguages/Form";

type PersonalLanguagesProps = {
  locale: string;
  isEdit?: boolean;
};

const PersonalLanguages = ({ locale, isEdit }: PersonalLanguagesProps) => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(isLoadingSelector);
  const personalLanguagesId = useAppSelector(personalLanguagesIdSelector);

  useEffect(() => {
    if (personalLanguagesId) {
      dispatch(fetchPersonalLanguages({ id: personalLanguagesId }));
    }
  }, [dispatch, personalLanguagesId]);

  return isLoading ? (
    <>Loading</>
  ) : (
    <PersonalLanguagesForm locale={locale} isEdit={isEdit} />
  );
};

export default PersonalLanguages;
