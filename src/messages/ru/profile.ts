const profile = {
  "Profile": {
    "layout": {
      "title": "Профиль",
      "description": "Профиль - описание"
    },
    "title": "Профиль",
    "form": {
      "avatarUrl": {
        "label": "Загрузить аватар",
      },
      "userName": {
        "label": "Имя пользователя",
        "placeholder": "Введите имя пользователя",
        "errors": {
          "required": "Пожалуйста, введите свое имя пользователя!",
          "pattern": "Неправильный формат имени пользователя! (Имя пользователя может состоять из латинских букв, цифр или _)",
          "minLength": "Длина должна быть не менее {minLength} символов!",
          "maxLength": "Длина должна быть не более {maxLength} символов!",
        }
      },
      "firstName": {
        "label": "Имя",
        "placeholder": "Введите имя",
        "errors": {
          "minLength": "Длина должна быть не менее {minLength} символов!",
          "maxLength": "Длина должна быть не более {maxLength} символов!",
        },
      },
      "lastName": {
        "label": "Фамилия",
        "placeholder": "Введите фамилию",
        "errors": {
          "minLength": "Длина должна быть не менее {minLength} символов!",
          "maxLength": "Длина должна быть не более {maxLength} символов!",
        },
      },
      "submitButton": "Сохранить изменения",
    },
  },
};

export default profile;