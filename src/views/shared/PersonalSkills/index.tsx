"use client";
import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import fetchPersonalSkills from "@/store/personalSkills/operations/fetchPersonalSkills";
import { isLoadingSelector } from "@/store/personalSkills/selectors";
import { personalSkillsIdSelector } from "@/store/auth/selectors";

import PersonalSkillsForm from "@/views/shared/PersonalSkills/Form";

type PersonalSkillsProps = {
  locale: string;
  isEdit?: boolean;
};

const PersonalSkills = ({ locale, isEdit }: PersonalSkillsProps) => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(isLoadingSelector);
  const personalSkillsId = useAppSelector(personalSkillsIdSelector);

  useEffect(() => {
    if (personalSkillsId) {
      dispatch(fetchPersonalSkills({ id: personalSkillsId }));
    }
  }, [dispatch, personalSkillsId]);

  return isLoading ? (
    <>Loading</>
  ) : (
    <PersonalSkillsForm locale={locale} isEdit={isEdit} />
  );
};

export default PersonalSkills;
