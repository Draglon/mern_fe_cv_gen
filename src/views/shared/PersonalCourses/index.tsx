"use client";
import { useEffect } from "react";

import { Locales } from "@/lib/constants/props/locales";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import fetchPersonalCourses from "@/store/personalCourses/operations/fetchPersonalCourses";
import { isLoadingSelector } from "@/store/personalCourses/selectors";
import { personalCoursesIdSelector } from "@/store/auth/selectors";

import PersonalCoursesForm from "@/views/shared/PersonalCourses/Form";

type PersonalCoursesProps = {
  locale: Locales;
  isEdit?: boolean;
};

const PersonalCourses = ({ locale, isEdit }: PersonalCoursesProps) => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(isLoadingSelector);
  const personalCoursesId = useAppSelector(personalCoursesIdSelector);

  useEffect(() => {
    if (personalCoursesId) {
      dispatch(fetchPersonalCourses({ id: personalCoursesId }));
    }
  }, [dispatch, personalCoursesId]);

  return isLoading ? (
    <>Loading</>
  ) : (
    <PersonalCoursesForm locale={locale} isEdit={isEdit} />
  );
};

export default PersonalCourses;
