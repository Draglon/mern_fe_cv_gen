const signup = {
  "Registration": {
    "layout": {
      "title": "Реєстрація",
      "description": "Реєстрація сторінка - опис"
    },
    "title": "Реєстрація",
    "description": "Будь ласка заповніть всі поля",
    "form": {
      "email": {
        "label": "Електронна пошта",
        "placeholder": "Введіть електронну пошту",
        "errors": {
          "required": "Будь ласка, введіть електронну пошту!",
          "maxLength": "Має містити не більше {maxLength} символів!",
          "pattern": "Недійсна адреса електронної пошти! (Наприклад: example@mail.com)",
          "alreadyExists": "Електронна адреса вже існує!",
        }
      },
      "password": {
        "label": "Пароль",
        "placeholder": "Введіть пароль",
        "errors": {
          "required": "Будь ласка, введіть пароль!",
          "minLength": "Має містити щонайменше {minLength} символів!",
          "maxLength": "Має містити не більше {maxLength} символів!",
        }
      },
      "userName": {
        "label": "Ім'я користувача",
        "placeholder": "Введіть ім'я користувача",
        "errors": {
          "required": "Будь ласка, введіть своє ім'я користувача!",
          "pattern": "Неверный формат никнейма! (Никнейм може складатися з латинських букв, цифр або _)",
          "minLength": "Має містити щонайменше {minLength} символів!",
          "maxLength": "Має містити не більше {maxLength} символів!",
        }
      }
    }
  },
};

export default signup;