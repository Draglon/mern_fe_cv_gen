const settings = {
  "Settings": {
    "layout": {
      "title": "Настройки",
      "description": "Настройки - описание"
    },
    "title": "Настройки",
    "subTitle": "Управление настройками аккаунта.",
    "changeEmail": {
      "title": "Изменить адрес электронной почты",
      "button": "Изменить адрес электронной почты",
      "form": {
        "email": {
          "label": "Новая электронная почта",
          "placeholder": "Введите новую электронную почту",
          "errors": {
            "alreadyExists": "Электронная почта уже существует!",
          }
        },
        "password": {
          "label": "Текущий пароль",
          "errors": {
            "currentPassword": "Неверный текущий пароль",
          }
        },
      }
    },
    "changePassword": {
      "title": "Изменить пароль",
      "button": "Изменить пароль",
      "form": {
        "password": {
          "label": {
            "currentPassword": "Текущий пароль",
            "newPassword": "Новый пароль",
            "confirmPassword": "Подтвердите пароль",
          },
          "placeholder": {
            "newPassword": "Введите новый пароль",
            "confirmPassword": "Введите пароль для подтверждения",
          },
          "errors": {
            "required": "Пожалуйста, введите пароль!",
            "currentPassword": "Неверный текущий пароль!",
            "newPassword": "Новый пароль должен отличаться от текущего!",
            "confirmPassword": "Пароли не совпадают!",
          }
        },
      }
    },
    "deleteAccount": {
      "title": "Удалить аккаунт",
      "button": "Удалить аккаунт",
      "modal": {
        "title": "Удалить аккаунт",
        "form": {
          "userName": {
            "label": 'Напишите свой "username" для подтверждения удаления аккаунта',
          },
          "alert": {
            "error": "Имя пользователя указано неверно!",
          },
          "submitButton": "Удалить аккаунт",
        },
      },
    }
  },
};

export default settings;