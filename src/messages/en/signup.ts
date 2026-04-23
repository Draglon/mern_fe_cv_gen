const signup = {
  "Registration": {
    "layout": {
      "title": "Registration",
      "description": "Registration - description"
    },
    "title": "Sign up",
    "description": "Please, fill all fields",
    "form": {
      "email": {
        "label": "Email",
        "placeholder": "Input email",
        "errors": {
          "required": "Please input your email!",
          "maxLength": "Must be no more than {maxLength} characters!",
          "pattern": "Invalid email address! (For example: example@mail.com)",
          "alreadyExists": "Email already exists!",
        }
      },
      "password": {
        "label": "Password",
        "placeholder": "Input password",
        "errors": {
          "required": "Please input your password!",
          "minLength": "Must be at least {minLength} characters!",
          "maxLength": "Must be no more than {maxLength} characters!",
          "uppercase": "Must contain at least one uppercase letter!",
          "number": "Must contain at least one number!",
        }
      },
      "userName": {
        "label": "Username",
        "placeholder": "Input username",
        "errors": {
          "required": "Please input your username!",
          "pattern": "Incorrect username format! (A username can consist of Latin letters, numbers or _)",
          "minLength": "Must be at least {minLength} characters!",
          "maxLength": "Must be no more than {maxLength} characters!",
        }
      }
    }
  },
};

export default signup;