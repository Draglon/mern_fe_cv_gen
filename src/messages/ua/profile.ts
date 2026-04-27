const profile = {
  "Profile": {
    "layout": {
      "title": "Профіль",
      "description": "Профіль - опис"
    },
    "title": "Профіль",
    "form": {
      "avatarUrl": {
        "label": "Завантажити аватар",
      },
      "userName": {
        "label": "Ім'я користувача",
        "placeholder": "Введіть ім'я користувача",
        "errors": {
          "required": "Будь ласка, введіть своє ім'я користувача!",
          "pattern": "Неправильний формат імені користувача! (Ім'я користувача може складатися з латинських букв, цифр або _)",
          "minLength": "Має містити щонайменше {minLength} символів!",
          "maxLength": "Має містити не більше {maxLength} символів!",
        }
      },
      "firstName": {
        "label": "Ім'я",
        "placeholder": "Введіть своє ім'я",
        "errors": {
          "minLength": "Має містити щонайменше {minLength} символів!",
          "maxLength": "Має містити не більше {maxLength} символів!",
        },
      },
      "lastName": {
        "label": "Прізвище",
        "placeholder": "Введіть прізвище",
        "errors": {
          "minLength": "Має містити щонайменше {minLength} символів!",
          "maxLength": "Має містити не більше {maxLength} символів!",
        },
      },
      "submitButton": "Зберегти зміни",
    },
  },
};

export default profile;