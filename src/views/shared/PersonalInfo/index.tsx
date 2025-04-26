"use client";
import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import fetchPersonalInfo from "@/store/personalInfo/operations/fetchPersonalInfo";
import { isLoadingSelector } from "@/store/personalInfo/selectors";
import { personalInfoIdSelector } from "@/store/auth/selectors";

import PersonalInfoForm from "@/views/shared/PersonalInfo/Form";

type PersonalInfoProps = {
  locale: string;
  isEdit?: boolean;
};

const PersonalInfo = ({ locale, isEdit }: PersonalInfoProps) => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(isLoadingSelector);
  const personalInfoId = useAppSelector(personalInfoIdSelector);

  useEffect(() => {
    if (personalInfoId && locale) {
      dispatch(fetchPersonalInfo({ id: personalInfoId }));
    }
  }, [dispatch, personalInfoId, locale]);

  return isLoading ? (
    <>Loading</>
  ) : (
    <PersonalInfoForm locale={locale} isEdit={isEdit} />
  );
};

export default PersonalInfo;
