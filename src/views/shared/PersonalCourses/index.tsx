"use client";
import { useEffect } from "react";

import { PersonalCoursesProps } from "@/lib/constants/props/resume/personalCourses";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import fetchPersonalCourses from "@/store/personalCourses/operations/fetchPersonalCourses";
import { isLoadingSelector } from "@/store/personalCourses/selectors";

import PersonalCoursesForm from "@/views/shared/PersonalCourses/Form";

const PersonalCourses = ({ resumeLocale, isEdit }: PersonalCoursesProps) => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(isLoadingSelector);

  useEffect(() => {
    if (resumeLocale) {
      dispatch(fetchPersonalCourses());
    }
  }, [dispatch, resumeLocale]);

  return isLoading ? (
    <>Loading</>
  ) : (
    <PersonalCoursesForm resumeLocale={resumeLocale} isEdit={isEdit} />
  );
};

export default PersonalCourses;
