const settings = {
  "Settings": {
    "layout": {
      "title": "Налаштування",
      "description": "Налаштування - опис"
    },
    "title": "Налаштування",
    "subTitle": "Керування налаштуваннями акаунту.",
    "changeEmail": {
      "title": "Изменить адрес электронной почты",
      "button": "Изменить адрес электронной почты",
      "form": {
        "email": {
          "label": "Нова електронна пошта",
          "placeholder": "Введіть нову електронну пошту",
          "errors": {
            "alreadyExists": "Електронна адреса вже існує!",
          }
        },
        "password": {
          "label": "Поточний пароль",
          "errors": {
            "currentPassword": "Недійсний поточний пароль",
          }
        },
      }
    },
    "changePassword": {
      "title": "Змінити пароль",
      "button": "Змінити пароль",
      "form": {
        "password": {
          "label": {
            "currentPassword": "Поточний пароль",
            "newPassword": "Новий пароль",
            "confirmPassword": "Підтвердити пароль",
          },
          "placeholder": {
            "newPassword": "Введіть новий пароль",
            "confirmPassword": "Введіть пароль для підтвердження",
          },
          "errors": {
            "required": "Будь ласка, введіть пароль!",
            "currentPassword": "Недійсний поточний пароль!",
            "newPassword": "Новий пароль має відрізнятися від поточного!",
            "confirmPassword": "Паролі не збігаються!",
          }
        },
      }
    },
    "deleteAccount": {
      "title": "Видалити акаунт",
      "button": "Видалити акаунт",
      "modal": {
        "title": "Удалить акаунт",
        "form": {
          "userName": {
            "label": 'Напишіть свій "username" для підтвердження видалення акаунту',
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