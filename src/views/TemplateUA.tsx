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
//   firstName: "Сергій",
//   lastName: "Назарчук",
//   birthday: "24 квітня 1987",
//   address: "Дніпро, Дніпропетровська область, Україна, 49000",
//   phone: "+38 (098) 125-50-71",
//   email: "s.nazarchuck@gmail.com",
//   linkedIn: "https://www.linkedin.com/in/sergey-nazarchuk-7aa77876/",
// };

// const personalInterests = ["Активні види спорту", "Футбол"];

// const personalLanguages = [
//   {
//     language: "Англійська",
//     level: "intermediate",
//   },
//   {
//     language: "Російська",
//     level: "native",
//   },
//   {
//     language: "Українська",
//     level: "native",
//   },
// ];

// const personalInfo = {
//   firstName: "Сергій",
//   lastName: "Назарчук",
//   about:
//     "Працюю веб-розробником більше 10 років. Frontend розробник останні 6 років. Швидко навчаюсь і адаптуюсь до нових умов. Чекаю на цікаві проекти, можливість професійного зростання та розвитку. Є велике бажання освоїти MERN.",
// };

// const personalEducation = {
//   degree: "Фахівець",
//   startDate: "2004",
//   endDate: "2009",
//   place: "Дніпровський інститут інфраструктури та транспорту (ДІІТ)",
//   faculty: "Технічна кібернетика",
//   specialty:
//     "“Програмне забезпечення автоматизованих систем”, інженер-програміст.",
// };

// const personalCourses = [
//   {
//     title: "Англійська",
//     description: "Школа англійської мови “Green forest” (Дніпро)",
//     startDate: "2014",
//     endDate: "2016",
//   },
//   {
//     title: "Комп'ютерна Академія “Шаг”",
//     description: "Графічний дизайн",
//     startDate: "2010",
//     endDate: "2012",
//   },
// ];

// const personalExperience = [
//   {
//     position: "React Developer",
//     companyName: "RubyGarage",
//     location: "Дніпро, Дніпропетровська область, Україна",
//     placeOfWork: "Повний робочий день",
//     workingTime: "Гібридний робочий формат",
//     startDate: "трав. 2019",
//     endDate: "жовт. 2024",
//     description:
//       "Розробка медичної платформи та мобільного додатку (clinix.com.py).\nРозробка CRM панелі для (expertbox.com).",
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
//     location: "Дніпро, Дніпропетровська область, Україна",
//     placeOfWork: "Повний робочий день",
//     workingTime: "Робота в офісі",
//     startDate: "черв. 2018",
//     endDate: "трав. 2019",
//     description:
//       "Розробка торгових майданчиків (criptex.com, trades.com).\nПідтримка торгових платформ: адаптація, оптимізація.",
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
//     location: "Дніпро, Дніпропетровська область, Україна",
//     placeOfWork: "Повний робочий день",
//     workingTime: "Робота в офісі",
//     startDate: "верес. 2017",
//     endDate: "трав. 2018",
//     description:
//       "Розробка корпоративних сайтів (phonexa.com, t.uk, zeroparallel.com).\nWordPress, анімація, адаптація, оптимізація коду.",
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
//     ],
//   },
//   {
//     position: "Markup developer",
//     companyName: "ASM BRAIN",
//     location: "Дніпро, Дніпропетровська область, Україна",
//     placeOfWork: "Повний робочий день",
//     workingTime: "Робота в офісі",
//     startDate: "лют. 2017",
//     endDate: "верес. 2017",
//     description:
//       "Розробка платформи для бінарних опціонів.\nАдаптація, оптимізація коду.",
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
//     location: "Дніпро, Дніпропетровська область, Україна",
//     placeOfWork: "Повний робочий день",
//     workingTime: "Робота в офісі",
//     startDate: "серп. 2014",
//     endDate: "серп. 2016",
//     description:
//       "Підтримка веб-додатку в сфері охорони здоров'я в США. Додаток допомагає людям зі страхуванням, пошуком лікаря, консультаціями тощо.\nПідтримка мобільної та веб-версії додатку.\nОптимізація та перевірка коду.",
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
//     location: "Дніпро, Дніпропетровська область, Україна",
//     placeOfWork: "Повний робочий день",
//     workingTime: "Робота в офісі",
//     startDate: "трав. 2012",
//     endDate: "трав. 2014",
//     description:
//       "Підтримка інтернет-магазинів на ринку України, таких як (rozetka, 5ok, sokol, matrix, can, mebelini).\nАдаптація, оптимізація та перевірка коду.",
//     skills: ["HTML", "CSS", "JavaScript", "jQuery", "Git", "Photoshop", "JIRA"],
//   },
//   {
//     position: "Markup developer, Technical Support",
//     companyName: "SoftServe",
//     location: "Дніпро, Дніпропетровська область, Україна",
//     placeOfWork: "Повний робочий день",
//     workingTime: "Робота в офісі",
//     startDate: "трав. 2011",
//     endDate: "трав. 2012",
//     description:
//       "Підтримка інтернет-магазинів. Проект «Bazaarvoice» (система рейтингу товарів).\nВиправлення помилок, листування з клієнтами, перевірка та оптимізація коду.",
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
            width={170}
            height={170}
          />
        </Section>

        <Section title={t("personalData.title")} size="small">
          <PersonalData personalData={personalData} />
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
