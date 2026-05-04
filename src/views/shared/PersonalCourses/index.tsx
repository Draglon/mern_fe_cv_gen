"use client";
import { useEffect } from "react";

import { PersonalCoursesProps } from "@/lib/constants/props/resume/personalCourses";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import fetchPersonalCourses from "@/store/personalCourses/operations/fetchPersonalCourses";
import { isLoadingSelector } from "@/store/personalCourses/selectors";

import PersonalCoursesForm from "@/views/shared/PersonalCourses/Form";

const PersonalCourses = ({ locale, isEdit }: PersonalCoursesProps) => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(isLoadingSelector);

  useEffect(() => {
    if (locale) {
      dispatch(fetchPersonalCourses());
    }
  }, [dispatch, locale]);

  return isLoading ? (
    <>Loading</>
  ) : (
    <PersonalCoursesForm locale={locale} isEdit={isEdit} />
  );
};

export default PersonalCourses;
