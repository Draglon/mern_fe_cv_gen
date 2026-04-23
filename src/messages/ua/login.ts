const login = {
  "Login": {
    "layout": {
      "title": "Увійти",
      "description": "Увійти - опис"
    },
    "title": "Увійти",
    "description": "Для входу в систему введіть адресу електронної пошти і пароль",
    "submitButton": "Увійти",
    "alert": {
      "errors": {
        "invalidEmailOrPassword": "Недійсна електронна адреса або пароль!",
      },
    },
    "form": {
      "email": {
        "label": "Електронна пошта",
        "placeholder": "Введіть електронну пошту",
        "errors": {
          "required": "Будь ласка, введіть електронну пошту!",
          "maxLength": "Має містити не більше {maxLength} символів!",
          "pattern": "Недійсна адреса електронної пошти! (Наприклад: example@mail.com)",
        }
      },
      "password": {
        "label": "Пароль",
        "placeholder": "Введіть пароль",
        "errors": {
          "required": "Будь ласка, введіть пароль!",
          "minLength": "Має містити щонайменше {minLength} символів!",
          "maxLength": "Має містити не більше {maxLength} символів!",
          "uppercase": "Повинно містити хоча б одну велику літеру!",
          "number": "Повинно містити хоча б одну цифру!",
        }
      }
    }
  },
};

export default login;

