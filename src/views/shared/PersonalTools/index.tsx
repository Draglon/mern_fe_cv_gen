"use client";
import { useEffect } from "react";

import { Locales } from "@/lib/constants/props/locales";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import fetchPersonalTools from "@/store/personalTools/operations/fetchPersonalTools";
import { isLoadingSelector } from "@/store/personalTools/selectors";

import PersonalToolsForm from "@/views/shared/PersonalTools/Form";

type PersonalToolsProps = {
  locale: Locales;
  isEdit?: boolean;
};

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
