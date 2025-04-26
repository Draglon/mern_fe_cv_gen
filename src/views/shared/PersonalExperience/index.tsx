"use client";
import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import fetchPersonalExperience from "@/store/personalExperience/operations/fetchPersonalExperience";
import { isLoadingSelector } from "@/store/personalExperience/selectors";
import { personalExperienceIdSelector } from "@/store/auth/selectors";

import PersonalExperienceForm from "@/views/shared/PersonalExperience/Form";

type PersonalExperienceProps = {
  locale: string;
  isEdit?: boolean;
};

const PersonalExperience = ({ locale, isEdit }: PersonalExperienceProps) => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(isLoadingSelector);
  const personalExperienceId = useAppSelector(personalExperienceIdSelector);

  useEffect(() => {
    if (personalExperienceId) {
      dispatch(fetchPersonalExperience({ id: personalExperienceId }));
    }
  }, [dispatch, personalExperienceId]);

  return isLoading ? (
    <>Loading</>
  ) : (
    <PersonalExperienceForm locale={locale} isEdit={isEdit} />
  );
};

export default PersonalExperience;
