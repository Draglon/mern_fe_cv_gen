const login = {
  "Login": {
    "layout": {
      "title": "Авторизоваться",
      "description": "Авторизоваться - описание"
    },
    "title": "Авторизоваться",
    "description": "Для входа в систему введите адрес электронной почты и пароль",
    "submitButton": "Авторизоваться",
    "alert": {
      "errors": {
        "invalidEmailOrPassword": "Неверный адрес электронной почты или пароль!",
      },
    },
    "form": {
      "email": {
        "label": "Электронная почта",
        "placeholder": "Введите электронную почту",
        "errors": {
          "required": "Пожалуйста, введите электронную почту!",
          "maxLength": "Длина должна быть не более {maxLength} символов",
          "pattern": "Неверный адрес электронной почты! (Например: example@mail.com)",
        }
      },
      "password": {
        "label": "Пароль",
        "placeholder": "Введите пароль",
        "errors": {
          "required": "Пожалуйста, введите пароль!",
          "minLength": "Длина должна быть не менее {minLength} символов",
          "maxLength": "Длина должна быть не более {maxLength} символов",
        }
      },
    }
  },
};

export default login;

