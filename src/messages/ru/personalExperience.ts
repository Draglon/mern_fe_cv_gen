import { EMPLOYMENT_TYPE_OPTIONS, WORK_FORMAT_OPTIONS } from "@/messages/common/selectOptions";

const personalExperience = {
  "PersonalExperience": {
    "title": "Опыт работы",
    "form": {
      "recentPositionsCount": {
        "label": "Последние места работы",
        "placeholder": "Введите число",
        "errors": {
          "required": "Пожалуйста, укажите количество мест работы!",
        }
      },
      "position": {
        "label": "Должность",
        "placeholder": "Введите вашу должность",
      },
      "companyName": {
        "label": "Название компании",
        "placeholder": "Введите название компании",
      },
      "location": {
        "label": "Расположение",
        "placeholder": "Введите расположение",
      },
      "employmentType": {
        "label": "Место работы",
        "placeholder": "Выберите место работы",
        "options": EMPLOYMENT_TYPE_OPTIONS,
        "errors": {
          "required": "Пожалуйста, выберите ваше место работы!",
        }
      },
      "workFormat": {
        "label": "Время работы",
        "placeholder": "Выберите время работы",
        "options": WORK_FORMAT_OPTIONS,
        "errors": {
          "required": "Пожалуйста, выберите ваше время работы!",
        }
      },
      "startDate": {
        "label": "Дата начала",
        "placeholder": "Введите дату начала",
        "errors": {
          "required": "Пожалуйста, введите дату начала!",
        }
      },
      "endDate": {
        "label": "Дата окончания",
        "placeholder": "Введите дату окончания",
        "errors": {
          "required": "Пожалуйста, введите дату окончания!",
        }
      },
      "isCurrent": {
        "label": "Текущая работа",
      },
      "description": {
        "label": "Описание",
        "placeholder": "Введите описание",
      },
      "skills": {
        "label": "Навыки",
        "placeholder": "Введите свои навыки",
      },
    },
  },
};

export default personalExperience;