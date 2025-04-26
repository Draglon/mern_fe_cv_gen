"use client";
import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import fetchPersonalEducation from "@/store/personalEducation/operations/fetchPersonalEducation";
import { isLoadingSelector } from "@/store/personalEducation/selectors";
import { personalEducationIdSelector } from "@/store/auth/selectors";

import PersonalEducationForm from "@/views/shared/PersonalEducation/Form";

type PersonalEducationProps = {
  locale: string;
  isEdit?: boolean;
};

const PersonalEducation = ({ locale, isEdit }: PersonalEducationProps) => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(isLoadingSelector);
  const personalEducationId = useAppSelector(personalEducationIdSelector);

  useEffect(() => {
    if (personalEducationId) {
      dispatch(fetchPersonalEducation({ id: personalEducationId }));
    }
  }, [dispatch, personalEducationId]);

  return isLoading ? (
    <>Loading</>
  ) : (
    <PersonalEducationForm locale={locale} isEdit={isEdit} />
  );
};

export default PersonalEducation;
