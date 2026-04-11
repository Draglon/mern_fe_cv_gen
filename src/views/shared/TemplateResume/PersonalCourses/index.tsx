"use client";
import { Locales } from "@/lib/constants/props/locales";
import { PersonalCoursesProps } from "@/lib/constants/props/resume";
import { coursesByLocale } from "@/utils/personalCourses";

import { Title, Text, Paragraph } from "@/views/shared/antd/Typography";

type Course = {
  course: string;
  description: string;
  startDate: string;
  endDate: string;
};

type CoursesProps = {
  templateLanguage: Locales;
  personalCourses: PersonalCoursesProps;
};

const PersonalCourses = ({
  templateLanguage,
  personalCourses,
}: CoursesProps) => {
  const courses = coursesByLocale(personalCourses, templateLanguage);

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
