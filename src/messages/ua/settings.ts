const settings = {
  "Settings": {
    "layout": {
      "title": "Налаштування",
      "description": "Налаштування - опис"
    },
    "title": "Налаштування",
    "removeAccount": {
      "title": "Видалити акаунт",
      "button": "Видалити акаунт",
      "modal": {
        "title": "Удалить акаунт",
        "form": {
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
          "alert": {
            "error": "Ім'я користувача неправильне!",
          },
          "submitButton": "Удалить аккаунт",
        },
      }
    }
  },
};

export default settings;