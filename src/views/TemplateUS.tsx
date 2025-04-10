// import { useTranslations } from "next-intl";

// import Avatar from "@/views/shared/TemplateResume/Avatar";
// import Section from "@/views/shared/TemplateResume/Section";
// import PersonalData from "@/views/shared/TemplateResume/PersonalData";
// import PersonalHobbies from "@/views/shared/TemplateResume/PersonalHobbies";
// import PersonalLanguages from "@/views/shared/TemplateResume/PersonalLanguages";
// import PersonalInfo from "@/views/shared/TemplateResume/PersonalInfo";
// import PersonalExperience from "@/views/shared/TemplateResume/PersonalExperience";
// import PersonalEducation from "@/views/shared/TemplateResume/PersonalEducation";
// import PersonalCourses from "@/views/shared/TemplateResume/PersonalCourses";
// import PersonalSkills from "@/views/shared/TemplateResume/PersonalSkills";
// import PersonalTools from "@/views/shared/TemplateResume/PersonalTools";

// import photo from "@/assets/image/photo.jpg";

// const personalData = {
//   firstName: "Sergey",
//   lastName: "Nazarchuk",
//   birthday: "24 april 1987",
//   address: "Dnipro, Dnipropetrovsk region, 49000, Ukraine",
//   phone: "+38 (098) 125-50-71",
//   email: "s.nazarchuck@gmail.com",
//   linkedIn: "https://www.linkedin.com/in/sergey-nazarchuk-7aa77876/",
// };

// const personalInterests = ["Active sports", "Football"];

// const personalLanguages = [
//   {
//     language: "English",
//     level: "intermediate",
//   },
//   {
//     language: "Russian",
//     level: "native",
//   },
//   {
//     language: "Ukrainian",
//     level: "native",
//   },
// ];

// const personalInfo = {
//   firstName: "Sergey",
//   lastName: "Nazarchuk",
//   about:
//     "I have been working as a web developer for over 10 years. Frontend developer for the last 6 years. I have experience as markup and react developer. I learn quickly and adapt to new conditions. I expect interesting projects, the opportunity for professional growth and development.",
// };

// const personalEducation = {
//   degree: "Specialist",
//   startDate: "2004",
//   endDate: "2009",
//   place: "Dnipro Institute of Infrastructure and Transport (DIIT)",
//   faculty: "Technical cybernetics",
//   specialty: "“Software for automated systems”, software engineer.",
// };

// const personalCourses = [
//   {
//     title: "English",
//     description: "English language school “Green forest” (Dnipro)",
//     startDate: "2014",
//     endDate: "2016",
//   },
//   {
//     title: "Computer Academy “Step”",
//     description: "Graphic design",
//     startDate: "2010",
//     endDate: "2012",
//   },
// ];

// const personalExperience = [
//   {
//     position: "React Developer",
//     companyName: "RubyGarage",
//     location: "Dnipro, Dnipropetrovsk region, Ukraine",
//     placeOfWork: "Full time",
//     workingTime: "Hybrid working format",
//     startDate: "may 2019",
//     endDate: "oct 2024",
//     description:
//       "Development medical web platform and mobile application (clinix.com.py).\nDevelopment CRM panel for (expertbox.com).\nSupport websites (rubygarage.org, expertbox.io)",
//     skills: [
//       "React",
//       "React native",
//       "Redux",
//       "Logic",
//       "JavaScript",
//       "TypeScript",
//       "jQuery",
//       "Next",
//       "Formik",
//       "Yup",
//       "Jest",
//       "Enzyme",
//       "React testing library",
//       "Ramda",
//       "Lodash",
//       "HTML",
//       "HAML",
//       "SCSS",
//       "LESS",
//       "Ant Design",
//       "Material UI",
//       "esLint",
//       "Webpack",
//       "Figma",
//       "Invision",
//       "JIRA",
//       "VS Code",
//     ],
//   },
//   {
//     position: "React Developer",
//     companyName: "WorkRocks",
//     location: "Dnipro, Dnipropetrovsk region, Ukraine",
//     placeOfWork: "Full time",
//     workingTime: "Office work",
//     startDate: "jun 2018",
//     endDate: "may 2019",
//     description:
//       "Development trading platforms (criptex.com, trades.com).\nSupport trading platforms: adaptation, optimization, code review.",
//     skills: [
//       "React",
//       "Redux",
//       "Saga",
//       "JavaScript",
//       "TypeScript",
//       "jQuery",
//       "Lodash",
//       "HTML",
//       "BEM",
//       "SCSS",
//       "LESS",
//       "Material UI",
//       "esLint",
//       "Webpack",
//       "Figma",
//       "VS Code",
//     ],
//   },
//   {
//     position: "Markup developer",
//     companyName: "Phonexa",
//     location: "Dnipro, Dnipropetrovsk region, Ukraine",
//     placeOfWork: "Full time",
//     workingTime: "Office work",
//     startDate: "sep 2017",
//     endDate: "may 2018",
//     description:
//       "Development corporate websites (phonexa.com, t.uk, zeroparallel.com).\nMarkup for WordPress, animation, adaptation, optimization, code review.",
//     skills: [
//       "HTML",
//       "HAML",
//       "PUG",
//       "BEM",
//       "SCSS",
//       "LESS",
//       "Bootstrap",
//       "JavaScript",
//       "jQuery",
//       "Git",
//       "esLint",
//       "Webpack",
//       "Invision",
//       "JIRA",
//       "VS Code",
//     ],
//   },
//   {
//     position: "Markup developer",
//     companyName: "ASM BRAIN",
//     location: "Dnipro, Dnipropetrovsk region, Ukraine",
//     placeOfWork: "Full time",
//     workingTime: "Office work",
//     startDate: "jan 2017",
//     endDate: "sep 2017",
//     description:
//       "Development trading platforms.\nSupport trading platforms: adaptation, optimization, code review.",
//     skills: [
//       "HTML",
//       "BEM",
//       "SCSS",
//       "LESS",
//       "Bootstrap",
//       "JavaScript",
//       "jQuery",
//       "Git",
//       "esLint",
//       "Webpack",
//       "Figma",
//       "VS Code",
//     ],
//   },
//   {
//     position: "Markup developer",
//     companyName: "HealthJoy",
//     location: "Dnipro, Dnipropetrovsk region, Ukraine",
//     placeOfWork: "Full time",
//     workingTime: "Office work",
//     startDate: "aug 2014",
//     endDate: "aug 2016",
//     description:
//       "Support web application in the field of healthcare in the USA.\nThe application helps people with insurance, finding a doctor, consultations, etc. Support mobile and web version. Adaptation, optimization, code review.",
//     skills: [
//       "HTML",
//       "BEM",
//       "SCSS",
//       "LESS",
//       "JavaScript",
//       "jQuery",
//       "Git",
//       "Invision",
//       "Photoshop",
//       "JIRA",
//     ],
//   },
//   {
//     position: "Markup developer",
//     companyName: "OWOX",
//     location: "Dnipro, Dnipropetrovsk region, Ukraine",
//     placeOfWork: "Full time",
//     workingTime: "Office work",
//     startDate: "may 2012",
//     endDate: "may 2014",
//     description:
//       "Support online stores on the Ukrainian market, such as (rozetka, 5ok, sokol, matrix, can, mebelini). Adaptation, optimization, code review.",
//     skills: ["HTML", "CSS", "JavaScript", "jQuery", "Git", "Photoshop", "JIRA"],
//   },
//   {
//     position: "Markup developer, Technical Support",
//     companyName: "SoftServe",
//     location: "Dnipro, Dnipropetrovsk region, Ukraine",
//     placeOfWork: "Full time",
//     workingTime: "Office work",
//     startDate: "may 2011",
//     endDate: "may 2012",
//     description:
//       "Support online stores. “Bazaarvoice“ project (product rating system).\nBugfixing, communication with clients, optimization, code review.",
//     skills: ["HTML", "CSS", "JavaScript", "jQuery", "Git", "Photoshop", "JIRA"],
//   },
// ];

const Template = () => {
  // const t = useTranslations("Template");

  return (
    <div className="template">
      {/* <div className="template__sidebar">
        <Section>
          <Avatar
            src={photo}
            alt={t("personalPhoto.alt")}
            width={190}
            height={190}
          />
        </Section>

        <Section title={t("personalData.title")} size="small">
          <PersonalData personalInfo={personalData} />
        </Section>

        <Section title={t("personalHobbies.title")} size="small">
          <PersonalHobbies interests={personalInterests} />
        </Section>

        <Section title={t("personalLanguages.title")} size="small">
          <PersonalLanguages languages={personalLanguages} />
        </Section>
      </div>

      <div className="template__container">
        <PersonalInfo personalInfo={personalInfo} />

        <Section title={t("personalExperience.title")}>
          <PersonalExperience experience={personalExperience} />
        </Section>

        <Section
          title={t("personalEducation.title")}
          className="section--education"
        >
          <PersonalEducation education={personalEducation} />
        </Section>

        <Section
          title={t("personalCourses.title")}
          className="section--courses"
        >
          <PersonalCourses courses={personalCourses} />
        </Section>

        <Section title={t("personalSkills.title")} className="section--skills">
          <PersonalSkills />
        </Section>

        <Section title={t("personalTools.title")} className="section--tools">
          <PersonalTools />
        </Section>
      </div> */}
    </div>
  );
};

export default Template;
