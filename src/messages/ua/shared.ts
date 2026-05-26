const shared = {
  "shared": {
    "confirm": "Підтвердити",
    "cancel": "Відмінити",
    "logIn": "Увійти",
    "signUp": "Реєстрація",
    "logout": "Вийти",
    "profile": "Профіль",
    "settings": "Налаштування",
    "create": "Створити",
    "next": "Наступний",
    "previous": "Попередній",
    "add": "Додати",
    "save": "Зберегти",
    "addField": "Додати поля",
    "downloadPDF": "Завантажити PDF",
    "form": {
      "avatarUrl": {
        "label": "Завантажити аватар",
      },
      "email": {
        "label": "Електронна пошта",
        "placeholder": "Введіть електронну пошту",
        "errors": {
          "required": "Будь ласка, введіть електронну пошту!",
          "maxLength": "Має містити не більше {maxLength} символів!",
          "pattern": "Недійсна адреса електронної пошти! (Наприклад: example@mail.com)",
          "alreadyExists": "Електронна адреса вже існує!",
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
      },
      "userName": {
        "label": "Ім'я користувача",
        "placeholder": "Введіть ім'я користувача",
        "errors": {
          "required": "Будь ласка, введіть своє ім'я користувача!",
          "pattern": "Неправильний формат імені користувача! (Ім'я користувача може складатися з латинських букв, цифр або _)",
          "minLength": "Має містити щонайменше {minLength} символів!",
          "maxLength": "Має містити не більше {maxLength} символів!",
        }
      },
      "firstName": {
        "label": "Ім'я",
        "placeholder": "Введіть своє ім'я",
        "errors": {
          "pattern": "Дозволені лише літери, дефіс та апостроф!",
          "minLength": "Має містити щонайменше {minLength} символів!",
          "maxLength": "Має містити не більше {maxLength} символів!",
        },
      },
      "lastName": {
        "label": "Прізвище",
        "placeholder": "Введіть прізвище",
        "errors": {
          "pattern": "Дозволені лише літери, дефіс та апостроф!",
          "minLength": "Має містити щонайменше {minLength} символів!",
          "maxLength": "Має містити не більше {maxLength} символів!",
        },
      },
      "sectionTitle": {
        "label": "Назва розділу",
        "placeholder": "Ввести назву розділу",
        "errors": {
          "pattern": "Дозволені лише літери та пробіли!",
          "minLength": "Має містити щонайменше {minLength} символів!",
          "maxLength": "Має містити не більше {maxLength} символів!",
        }
      },
      "inputText": {
        "errors": {
          "required": "Обов'язкове поле!",
          "minLength": "Має містити щонайменше {minLength} символів!",
          "maxLength": "Має містити не більше {maxLength} символів!",
        }
      },
      "inputNumber": {
        "errors": {
          "required": "Обов'язкове поле!",
          "minNumber": "Значення має бути не менше {minNumber}!",
          "maxNumber": "Значення не повинно перевищувати {maxNumber}!",
        }
      },
      "textarea": {
        "errors": {
          "required": "Обов'язкове поле!",
          "minLength": "Має містити щонайменше {minLength} символів!",
          "maxLength": "Має містити не більше {maxLength} символів!",
        }
      },
      "select": {
        "errors": {
          "required": "Обов'язкове поле!",
        }
      },
      "languageLevel": {
        "errors": {
          "required": "Обов'язкове поле!",
          "invalidLanguageLevel": "Недійсний рівень мови!"
        },
      },
      "datePicker": {
        "errors": {
          "required": "Обов'язкове поле!",
          "invalid": "Невірний формат дати!",
          "endDateAfterStart": "Дата завершення повинна бути більшою або дорівнювати даті початку!",
        }
      },
      "inputLink": {
        "errors": {
          "invalid": "Будь ласка, введіть коректне посилання!",
        } 
      },
      "inputTelegram": {
        "errors": {
          "pattern": "Введіть коректний Telegram username (5–32 символів: латиниця, цифри, _). Наприклад: @username",
        }
      },
      "submitButton": "Зберегти зміни",
    }
  }
};

export default shared;
