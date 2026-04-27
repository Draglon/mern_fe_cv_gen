"use client";
import { useEffect } from "react";

import { Locales } from "@/lib/constants/props/locales";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import fetchPersonalInfo from "@/store/personalInfo/operations/fetchPersonalInfo";
import { isLoadingSelector } from "@/store/personalInfo/selectors";

import PersonalInfoForm from "@/views/shared/PersonalInfo/Form";

type PersonalInfoProps = {
  locale: Locales;
  isEdit?: boolean;
};

const PersonalInfo = ({ locale, isEdit }: PersonalInfoProps) => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(isLoadingSelector);

  useEffect(() => {
    if (locale) {
      dispatch(fetchPersonalInfo());
    }
  }, [dispatch, locale]);

  return isLoading ? (
    <>Loading</>
  ) : (
    <PersonalInfoForm locale={locale} isEdit={isEdit} />
  );
};

export default PersonalInfo;
