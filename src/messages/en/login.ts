const login = {
  "Login": {
    "layout": {
      "title": "Log in",
      "description": "Login - description"
    },
    "title": "Log in",
    "description": "To log in, enter your email address and password",
    "submitButton": "Log in",
    "alert": {
      "errors": {
        "invalidEmailOrPassword": "Invalid email or password!",
      },
    },
    "form": {
      "email": {
        "label": "Email",
        "placeholder": "Input email",
        "errors": {
          "required": "Please input your email!",
          "maxLength": "The length must be no more than {maxLength} characters!",
          "pattern": "Invalid email address! (For example: example@mail.com)",
        }
      },
      "password": {
        "label": "Password",
        "placeholder": "Enter your password",
        "errors": {
          "required": "Please enter your password!",
          "minLength": "The length must be at least {minLength} characters!",
          "maxLength": "The length must be no more than {maxLength} characters!",
          "uppercase": "Must contain at least one uppercase letter!",
          "number": "Must contain at least one number!",
        }
      },
    }
  },
};

export default login;

