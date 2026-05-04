"use client";
import { useEffect } from "react";

import { PersonalToolsProps } from "@/lib/constants/props/resume/personalTools";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import fetchPersonalTools from "@/store/personalTools/operations/fetchPersonalTools";
import { isLoadingSelector } from "@/store/personalTools/selectors";

import PersonalToolsForm from "@/views/shared/PersonalTools/Form";

const PersonalTools = ({ locale, isEdit }: PersonalToolsProps) => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(isLoadingSelector);

  useEffect(() => {
    if (locale) {
      dispatch(fetchPersonalTools());
    }
  }, [dispatch, locale]);

  return isLoading ? (
    <>Loading</>
  ) : (
    <PersonalToolsForm locale={locale} isEdit={isEdit} />
  );
};

export default PersonalTools;
