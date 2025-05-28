import standfordImage from "@/../public/images/templates/standford.jpg";
import edinburghImage from "@/../public/images/templates/edinburgh.jpg";

export const TEMPLATES = {
  standford: "standford",
  edinburgh: "edinburgh",
};

export const TEMPLATES_LIST = [
  {
    template: TEMPLATES.standford,
    image: standfordImage,
  },
  {
    template: TEMPLATES.edinburgh,
    image: edinburghImage,
  }
];

export const TEMPLATES_TRANSLATIONS = {
  en: {
    personalInfo: {
      title: "About me",
    },
    personalPhoto: {
      alt: "Personal photo"
    },
    personalData: {
      title: "Personal data",
      name: "Name",
      birthday: "Birthday",
      address: "Address",
      phoneNumber: "Phone number",
      email: "Email",
      linkedin: "LinkedIn"
    },
    personalHobbies: {
      title: "Hobbies and interests"
    },
    personalLanguages: {
      title: "Languages",
      level: {
        native: "Native",
        elementary: "Elementary",
        preIntermediate: "Pre-Intermediate",
        intermediate: "Intermediate",
        upperIntermediate: "Upper-Intermediate",
        advanced: "Advanced",
        proficiency: "Proficiency"
      }
    },
    personalExperience: {
      title: "Experience"
    },
    personalEducation: {
      title: "Education"
    },
    personalCourses: {
      title: "Courses"
    },
    personalSkills: {
      title: "Skills"
    },
    personalTools: {
      title: "Tools"
    },
    skills: "Skills: ",
    faculty: "Faculty: ",
    specialty: "Specialty: "
  },
  ru: {
    personalInfo: {
      title: "Про себя",
    },
    personalPhoto:  {
      alt: "Персональная фотография"
    },
    personalData: {
      title: "Персональные данные",
      name: "Имя",
      birthday: "Дата рождения",
      address: "Адрес",
      phoneNumber: "Номер телефона",
      email: "Email",
      linkedin: "LinkedIn"
    },
    personalHobbies: {
      title: "Интересы",
    },
    personalLanguages: {
      title: "Языки",
      level: {
        native: "Родной",
        elementary: "Элементарный",
        preIntermediate: "Предварительно-средний",
        intermediate: "Средний",
        upperIntermediate: "Выше среднего",
        advanced: "Продвинутый",
        proficiency: "Профессиональный"
      }
    },
    personalExperience: {
      title: "Опыт работы"
    },
    personalEducation: {
      title: "Образование"
    },
    personalCourses: {
      title: "Курсы"
    },
    personalSkills: {
      title: "Навыки"
    },
    personalTools: {
      title: "Инструменты"
    },
    skills: "Навыки: ",
    faculty: "Факультет: ",
    specialty: "Специальность: "
  },
  ua: {
    personalInfo: {
      title: "Про мене",
    },
    personalPhoto:  {
      alt: "Персональна фотографія"
    },
    personalData: {
      title: "Персональні дані",
      name: "Ім'я",
      birthday: "Дата народження",
      address: "Адреса",
      phoneNumber: "Номер телефону",
      email: "Email",
      linkedin: "LinkedIn"
    },
    personalHobbies: {
      title: "Інтереси"
    },
    personalLanguages: {
      title: "Мови",
      level: {
        native: "Рідний",
        elementary: "Початковий",
        preIntermediate: "Нижче середнього",
        intermediate: "Середній",
        upperIntermediate: "Вище середнього",
        advanced: "Розширений",
        proficiency: "Професійний"
      }
    },
    personalExperience: {
      title: "Досвід роботи"
    },
    personalEducation: {
      title: "Освіта"
    },
    personalCourses: {
      title: "Курси"
    },
    personalSkills: {
      title: "Навички"
    },
    personalTools: {
      title: "Інструменти"
    },
    skills: "Навички: ",
    faculty: "Факультет: ",
    specialty: "Спеціальність: "
  },
};
