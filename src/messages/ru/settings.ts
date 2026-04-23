const settings = {
  "Settings": {
    "layout": {
      "title": "Настройки",
      "description": "Настройки - описание"
    },
    "title": "Настройки",
    "subTitle": "Управление настройками аккаунта.",
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
          "placeholder": "Введите пароль",
          "errors": {
            "required": "Пожалуйста, введите пароль!",
            "minLength": "Длина должна быть не менее {minLength} символов!",
            "maxLength": "Длина должна быть не более {maxLength} символов!",
            "uppercase": "Должен содержать как минимум одну заглавную букву!",
            "number": "Должен содержать хотя бы одну цифру!",
            "currentPassword": "Неверный текущий пароль",
            "confirmPassword": "Пароли не совпадают",
          }
        },
        "submitButton": "Изменить пароль",
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
            "placeholder": "Введите имя пользователя",
            "errors": {
              "required": "Пожалуйста, введите ваше имя пользователя!",
              "pattern": "Неправильный формат имени пользователя! (Имя пользователя может состоять из латинских букв, цифр или _)",
              "minLength": "Длина должна быть не менее {minLength} символов!",
              "maxLength": "Длина должна быть не более {maxLength} символов!",
            },
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