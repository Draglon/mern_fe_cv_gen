"use client";
import { useEffect } from "react";

import { PersonalToolsProps } from "@/lib/constants/props/resume/personalTools";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import fetchPersonalTools from "@/store/personalTools/operations/fetchPersonalTools";
import { isLoadingSelector } from "@/store/personalTools/selectors";

import Loader from "@/views/shared/antd/Loader";
import PersonalToolsForm from "@/views/shared/PersonalTools/Form";

const PersonalTools = ({ resumeLocale, isEdit }: PersonalToolsProps) => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(isLoadingSelector);

  useEffect(() => {
    if (resumeLocale) {
      dispatch(fetchPersonalTools());
    }
  }, [dispatch, resumeLocale]);

  return isLoading ? (
    <Loader />
  ) : (
    <PersonalToolsForm resumeLocale={resumeLocale} isEdit={isEdit} />
  );
};

export default PersonalTools;
