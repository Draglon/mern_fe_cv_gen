"use client";
import { useEffect } from "react";

import { Locales } from "@/lib/constants/props/locales";
import { coursesByLocale } from "@/utils/personalCourses";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import fetchPersonalCourses from "@/store/personalCourses/operations/fetchPersonalCourses";
import { personalCoursesSelector } from "@/store/personalCourses/selectors";

import { Title, Text, Paragraph } from "@/views/shared/antd/Typography";

type Course = {
  course: string;
  description: string;
  startDate: string;
  endDate: string;
};

type PersonalCoursesProps = {
  templateLanguage: string;
  personalCoursesId: string;
};

const PersonalCourses = ({
  personalCoursesId,
  templateLanguage,
}: PersonalCoursesProps) => {
  const dispatch = useAppDispatch();
  const personalCourses = useAppSelector(personalCoursesSelector);
  const courses = coursesByLocale(personalCourses, templateLanguage as Locales);

  useEffect(() => {
    dispatch(fetchPersonalCourses({ id: personalCoursesId }));
  }, [dispatch, personalCoursesId]);

  return (
    <>
      {courses.map((item: Course, index: number) => (
        <div className="section__item" key={index}>
          <header className="section__subheader">
            <Title className="section__subtitle" level={4}>
              {item.course}
            </Title>
            <Text className="section__period" type="secondary" italic>
              {item.startDate} - {item.endDate}
            </Text>
          </header>
          <Paragraph className="section__label" italic>
            {item.description}
          </Paragraph>
        </div>
      ))}
    </>
  );
};

export default PersonalCourses;
