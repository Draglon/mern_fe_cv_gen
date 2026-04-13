const login = {
  "Login": {
    "layout": {
      "title": "Log in",
      "description": "Login - description"
    },
    "title": "Log in",
    "description": "To log in, enter your email address and password",
    "submitButton": "Log in",
    "form": {
      "email": {
        "label": "Email",
        "placeholder": "Input email",
        "errors": {
          "required": "Please input your email!",
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
    }
  },
};

export default login;

