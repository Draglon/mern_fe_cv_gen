"use client";
import { useLocale } from "next-intl";

import { Locale, Locales } from "@/lib/constants/props/locales";
import { Text } from "@/views/shared/antd/Typography";

const PERSONAL_SKILLS = [
  {
    label: "HTML, HAML, PUG",
    progress: "100%",
  },
  {
    label: "CSS, LESS, SCSS, SASS, Tailwind CSS",
    progress: "100%",
  },
  {
    label: "React, React Native, Expo",
    progress: "100%",
  },
  {
    label: "Redux, Redux (Toolkit), Logic",
    progress: "100%",
  },
  {
    label: "Next, Next 15",
    progress: "100%",
  },
  {
    label: "JavaScript, TypeScript",
    progress: "100%",
  },
  {
    label: "Lodash, Ramda, jQuery",
    progress: "100%",
  },
  {
    label: "Jest, Enzyme, React testing library",
    progress: "100%",
  },
  {
    label: "React hook form, Formik, Yup",
    progress: "100%",
  },
  {
    label: "Ant Design, Material UI, Bootstrap",
    progress: "100%",
  },
  {
    label: "Rest API",
    progress: "75%",
  },
  {
    label: "WebSockets",
    progress: "75%",
  },
  {
    label: "Node, Express, Express validator",
    progress: "25%",
  },
  {
    label: "MongoDB, Mongoose, Mongoose intl",
    progress: "25%",
  },
];

type PersonalSkillsProps = {
  personalSkills: {
    skills: Locale;
  };
};

const PersonalSkills = ({ personalSkills }: PersonalSkillsProps) => {
  const locale = useLocale();
  const skillsByLocale = JSON.parse(
    personalSkills?.skills[locale as Locales] || "[]"
  );

  console.log("skillsByLocale: ", skillsByLocale);

  return (
    <div className="personal-skills">
      {PERSONAL_SKILLS.map((skill, index) => (
        <div className="personal-skills__item" key={index}>
          <Text className="personal-skills__label" strong>
            {skill.label}
          </Text>
          <div className="personal-skills__progress">
            <div
              className="personal-skills__progress-value"
              style={{ width: skill.progress }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PersonalSkills;
