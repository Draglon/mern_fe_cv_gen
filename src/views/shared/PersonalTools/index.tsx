"use client";
import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import fetchPersonalTools from "@/store/personalTools/operations/fetchPersonalTools";
import { isLoadingSelector } from "@/store/personalTools/selectors";
import { personalToolsIdSelector } from "@/store/auth/selectors";

import PersonalToolsForm from "@/views/shared/PersonalTools/Form";

type PersonalToolsProps = {
  locale: string;
  isEdit?: boolean;
};

const PersonalTools = ({ locale, isEdit }: PersonalToolsProps) => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(isLoadingSelector);
  const personalToolsId = useAppSelector(personalToolsIdSelector);

  useEffect(() => {
    if (personalToolsId) {
      dispatch(fetchPersonalTools({ id: personalToolsId }));
    }
  }, [dispatch, personalToolsId]);

  return isLoading ? (
    <>Loading</>
  ) : (
    <PersonalToolsForm locale={locale} isEdit={isEdit} />
  );
};

export default PersonalTools;
