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
        }
      },
      "password": {
        "label": "Password",
        "placeholder": "Input password",
        "errors": {
          "required": "Please input your password!",
          "minLength": "Must be at least 6 characters long",
          "maxLength": "Must be no more than 20 characters"
        }
      },
      "userName": {
        "label": "Username",
        "placeholder": "Input username",
        "errors": {
          "required": "Please input your username!"
        }
      }
    }
  },
};

export default signup;