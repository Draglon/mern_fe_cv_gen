// import { useTranslations } from "next-intl";

// import Avatar from "@/views/shared/TemplateResume/Avatar";
// import Section from "@/views/shared/TemplateResume/Section";
// import PersonalData from "@/views/shared/TemplateResume/PersonalData";
// import PersonalInterests from "@/views/shared/TemplateResume/PersonalInterests";
// import PersonalLanguages from "@/views/shared/TemplateResume/PersonalLanguages";
// import PersonalInfo from "@/views/shared/TemplateResume/PersonalInfo";
// import PersonalExperience from "@/views/shared/TemplateResume/PersonalExperience";
// import PersonalEducation from "@/views/shared/TemplateResume/PersonalEducation";
// import PersonalCourses from "@/views/shared/TemplateResume/PersonalCourses";
// import PersonalSkills from "@/views/shared/TemplateResume/PersonalSkills";
// import PersonalTools from "@/views/shared/TemplateResume/PersonalTools";

// import photo from "@/assets/image/photo.jpg";

// const personalData = {
//   firstName: "Сергей",
//   lastName: "Назарчук",
//   birthday: "24 апреля 1987",
//   address: "Днепр, Днепропетровская область, Украина, 49000",
//   phone: "+38 (098) 125-50-71",
//   email: "s.nazarchuck@gmail.com",
//   linkedIn: "https://www.linkedin.com/in/sergey-nazarchuk-7aa77876/",
// };

// const personalInterests = ["Активные виды спорта", "Футбол"];

// const personalLanguages = [
//   {
//     language: "Английский",
//     level: "intermediate",
//   },
//   {
//     language: "Русский",
//     level: "native",
//   },
//   {
//     language: "Украинский",
//     level: "native",
//   },
// ];

// const personalInfo = {
//   firstName: "Сергей",
//   lastName: "Назарчук",
//   about:
//     "Работаю веб разработчиком более 10 лет. Frontend разработчиком последние 6 лет. Имею опыт в верстке и react. Быстро учусь и адаптируюсь к новым условиям. Ожидаю интересных проектов, возможность профессионального роста и развития. Есть большое желание освоить MERN.",
// };

// const personalEducation = {
//   degree: "Специалист",
//   startDate: "2004 г.",
//   endDate: "2009 г.",
//   place: "Днепровский институт инфраструктуры и транспорта (ДИИТ)",
//   faculty: "Технической кибернетики",
//   specialty:
//     "“Программное обеспечение автоматизированных систем”, инженер‑программист.",
// };

// const personalCourses = [
//   {
//     title: "Английский",
//     description: "Школа английского языка “Green forest“ (Днепр)",
//     startDate: "2014 г.",
//     endDate: "2016 г.",
//   },
//   {
//     title: "Компьютерная академия “Шаг“",
//     description: "Графический дизайн",
//     startDate: "2010 г.",
//     endDate: "2012 г.",
//   },
// ];

// const personalExperience = [
//   {
//     position: "React Developer",
//     companyName: "RubyGarage",
//     location: "Днепр, Днепропетровская область, Украина",
//     placeOfWork: "Полный рабочий день",
//     workingTime: "Гибридный формат работы",
//     startDate: "май 2019 г.",
//     endDate: "окт. 2024 г.",
//     description:
//       "Разработка медицинской платформы для web и мобильного приложения (clinix.com.py).\nРазработка админ панели для (expertbox.com).",
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
//       "BEM",
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
//     location: "Днепр, Днепропетровская область, Украина",
//     placeOfWork: "Полный рабочий день",
//     workingTime: "Работа в офисе",
//     startDate: "июнь 2018 г.",
//     endDate: "май 2019 г.",
//     description:
//       "Разработка торговых платформ (criptex.com, trades.com).\nПоддержка торговой платформы criptex: верстка под все виды устройств, оптимизация.",
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
//     location: "Днепр, Днепропетровская область, Украина",
//     placeOfWork: "Полный рабочий день",
//     workingTime: "Работа в офисе",
//     startDate: "сент. 2017 г.",
//     endDate: "май 2018 г.",
//     description:
//       "Разработка корпоративных сайтов (phonexa.com, t.uk, zeroparallel.com).\nВерстка на WordPress, анимация, адаптация, оптимизация кода.",
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
//       "VS Code",
//       "JIRA",
//       "VS Code",
//     ],
//   },
//   {
//     position: "Markup developer",
//     companyName: "ASM BRAIN",
//     location: "Днепр, Днепропетровская область, Украина",
//     placeOfWork: "Полный рабочий день",
//     workingTime: "Работа в офисе",
//     startDate: "янв. 2017 г.",
//     endDate: "сент. 2017 г.",
//     description:
//       "Разработка платформы для бинарных опционов.\nОптимизация, адаптация под мобильные устройства.",
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
//     location: "Днепр, Днепропетровская область, Украина",
//     placeOfWork: "Полный рабочий день",
//     workingTime: "Работа в офисе",
//     startDate: "авг. 2014 г.",
//     endDate: "авг. 2016 г.",
//     description:
//       "Верстка и поддержка веб приложения в области здравоохранения в США.\nПриложение помогает людям в оформлении страхования, поиске врача, консультациях и т.д.\nПоддержка мобильной и веб версии приложения.\nОптимизация и проверка кода.",
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
//     location: "Днепр, Днепропетровская область, Украина",
//     placeOfWork: "Полный рабочий день",
//     workingTime: "Работа в офисе",
//     startDate: "май 2012 г.",
//     endDate: "май 2014 г.",
//     description:
//       "Верстка и поддержка интернет‑магазинов на украинском рынке, таких как (rozetka, 5ok, sokol, matrix, can, mebelini).\nПоддержка мобильной и web версии интернет‑магазина rozetka.\nОптимизация и проверка кода.",
//     skills: ["HTML", "CSS", "JavaScript", "jQuery", "Git", "Photoshop", "JIRA"],
//   },
//   {
//     position: "Markup developer, Technical Support",
//     companyName: "SoftServe",
//     location: "Днепр, Днепропетровская область, Украина",
//     placeOfWork: "Полный рабочий день",
//     workingTime: "Работа в офисе",
//     startDate: "май 2011 г.",
//     endDate: "май 2012 г.",
//     description:
//       "Поддержка интернет‑магазинов.\nПроект “Bazaarvoice”, система рейтинга товаров.\nИсправление ошибок, стилизация по макетам, переписка с клиентами, оптимизация и проверка кода.",
//     skills: ["HTML", "CSS", "JavaScript", "jQuery", "Git", "Photoshop", "JIRA"],
//   },
// ];

const Resume = () => {
  // const t = useTranslations("Template");

  return (
    <div className="template">
      {/* <div className="template__sidebar">
        <Section>
          <Avatar
            src={photo}
            alt={t("personalPhoto.alt")}
            width={170}
            height={170}
          />
        </Section>

        <Section title={t("personalData.title")} size="small">
          <PersonalData personalData={personalData} />
        </Section>

        <Section title={t("personalHobbies.title")} size="small">
          <PersonalInterests interests={personalInterests} />
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

export default Resume;
