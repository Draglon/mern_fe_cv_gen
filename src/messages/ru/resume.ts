import { RESUME } from "@/messages/common/resume";

const resume = {
  "Template": {
    "layout": {
      "title": "Резюме",
      "description": "Резюме - описание",
    },
    "emptyState": {
      "title": "Ваше резюме готово к старту.",
      "description": "У вас пока нет резюме. Создайте свое первое резюме, чтобы выделиться среди кандидатов и получить работу мечты.",
      "alt": "Пустое состояние",
      "button": "Создать резюме"
    },
    ...RESUME
  },
};

export default resume;
