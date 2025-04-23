"use client";
import { useLocale } from "next-intl";

import { Locale, Locales } from "@/lib/constants/props/locales";
import { coursesByLocale } from "@/utils/personalCourses";
import { Title, Text, Paragraph } from "@/views/shared/antd/Typography";

type Course = {
  course: string;
  description: string;
  startDate: string;
  endDate: string;
};

type PersonalCoursesProps = {
  personalCourses: {
    courses: Locale;
  };
};

const PersonalCourses = ({ personalCourses }: PersonalCoursesProps) => {
  const locale = useLocale();
  const courses = coursesByLocale(personalCourses, locale as Locales);

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
