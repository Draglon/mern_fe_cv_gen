"use client";
import { useLocale } from "next-intl";

import { Locale, Locales } from "@/lib/constants/props/locales";
// import { Title, Text, Paragraph } from "@/views/shared/antd/Typography";

// type Course = {
//   title: string;
//   description: string;
//   startDate: string;
//   endDate: string;
// };

type PersonalCoursesProps = {
  personalCourses: {
    courses: Locale;
  };
};

const PersonalCourses = ({ personalCourses }: PersonalCoursesProps) => {
  const locale = useLocale();
  const coursesByLocale = JSON.parse(
    personalCourses?.courses[locale as Locales] || "[]"
  );

  console.log("coursesByLocale: ", coursesByLocale);

  return (
    <>
      {/* {courses.map((item: Course) => (
        <div className="section__item" key={item.title}>
          <header className="section__subheader">
            <Title className="section__subtitle" level={4}>
              {item.title}
            </Title>
            <Text className="section__period" type="secondary" italic>
              {item.startDate} - {item.endDate}
            </Text>
          </header>
          <Paragraph className="section__label" italic>
            {item.description}
          </Paragraph>
        </div>
      ))} */}
    </>
  );
};

export default PersonalCourses;
