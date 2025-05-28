const personalInfo = {
  "PersonalInfo": {
    "title": "Персональная информация",
    "form": {
      "userUrl": {
        "label": "Фото"
      },
      "firstName": {
        "label": "Имя",
        "placeholder": "Введите имя",
        "errors": {
          "required": "Пожалуйста, введите свое имя!",
          "minLength": "Имя должно быть длиной не менее 3 символов."
        }
      },
      "lastName": {
        "label": "Фамилия",
        "placeholder": "Введите фамилию",
        "errors": {
          "required": "Пожалуйста, введите свою фамилию!",
          "minLength": "Фамилия должна быть длиной не менее 3 символов."
        }
      },
      "about": {
        "label": "Обо мне",
        "placeholder": "Введите информацию о себе",
        "errors": {
          "required": "Пожалуйста, введите информацию о себе!"
        }
      },
      "email": {
        "label": "Электронная почта",
        "placeholder": "Введите адрес электронной почты",
        "errors": {
          "required": "Пожалуйста, введите свой адрес электронной почты!",
          "pattern": "Пожалуйста, введите правильный адрес электронной почты!"
        }
      },
      "address": {
        "label": "Адрес",
        "placeholder": "Введите адрес"
      },
      "phoneNumber": {
        "label": "Номер телефона",
        "placeholder": "Введите номер телефона",
        "errors": {
          "pattern": "Пожалуйста, введите правильный номер телефона!",
          "required": "Пожалуйста, введите ваш номер телефона!"
        }
      },
      "birthday": {
        "label": "День рождения",
        "placeholder": "Введите день рождения",
        "errors": {
          "pattern": "Пожалуйста, введите правильную дату вашего рождения!"
        }
      },
      "linkedIn": {
        "label": "LinkedIn",
        "placeholder": "Пожалуйста, введите ваш linkedin"
      },
    },
  },
};

export default personalInfo;