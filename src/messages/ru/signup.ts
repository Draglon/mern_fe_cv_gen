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
          "required": "Пожалуйста, введите электронную почту!",
          "maxLength": "Длина должна быть не более {maxLength} символов!",
          "pattern": "Неверный адрес электронной почты! (Например: example@mail.com)",
          "alreadyExists": "Электронная почта уже существует!",
        }
      },
      "password": {
        "label": "Пароль",
        "placeholder": "Введите пароль",
        "errors": {
          "required": "Пожалуйста, введите пароль!",
          "minLength": "Длина должна быть не менее {minLength} символов!",
          "maxLength": "Длина должна быть не более {maxLength} символов!",
        }
      },
      "userName": {
        "label": "Имя пользователя",
        "placeholder": "Введите имя пользователя",
        "errors": {
          "required": "Пожалуйста, введите свое имя пользователя!",
          "pattern": "Неверный формат никнейма! (Никнейм может состоять из латинских буквы, цифры или _)",
          "minLength": "Длина должна быть не менее {minLength} символов!",
          "maxLength": "Длина должна быть не более {maxLength} символов!",
        }
      }
    }
  },
};

export default signup;