const signup = {
  "Registration": {
    "layout": {
      "title": "Регистрация",
      "description": "Регистрация - описание"
    },
    "title": "Регистрация",
    "description": "Пожалуйста заполните все поля",
    "form": {
      "email": {
        "label": "Электронная почта",
        "placeholder": "Введите электронную почту",
        "errors": {
          "required": "Пожалуйста, введите электронную почту!"
        }
      },
      "password": {
        "label": "Пароль",
        "placeholder": "Введите пароль",
        "errors": {
          "required": "Пожалуйста, введите пароль!",
          "minLength": "Длина должна быть не менее 6 символов",
          "maxLength": "Длина должна быть не более 20 символов"
        }
      },
      "userName": {
        "label": "Имя пользователя",
        "placeholder": "Введите имя пользователя",
        "errors": {
          "required": "Пожалуйста, введите свое имя пользователя!"
        }
      }
    }
  },
};

export default signup;