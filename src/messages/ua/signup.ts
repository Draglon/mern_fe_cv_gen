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
          "required": "Будь ласка, введіть електронну пошту!"
        }
      },
      "password": {
        "label": "Пароль",
        "placeholder": "Введіть пароль",
        "errors": {
          "required": "Будь ласка, введіть пароль!",
          "minLength": "Має містити щонайменше 6 символів",
          "maxLength": "Має містити не більше 20 символів"
        }
      },
      "userName": {
        "label": "Ім'я користувача",
        "placeholder": "Введіть ім'я користувача",
        "errors": {
          "required": "Будь ласка, введіть своє ім'я користувача!",
          "minLength": "Будь ласка, введіть своє ім'я користувача!"
        }
      }
    }
  },
};

export default signup;