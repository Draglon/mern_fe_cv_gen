const shared = {
  "shared": {
    "confirm": "Confirm",
    "cancel": "Cancel",
    "logIn": "Log in",
    "signUp": "Sign up",
    "logout": "Log out",
    "profile": "Profile",
    "settings": "Settings",
    "create": "Create",
    "next": "Next",
    "previous": "Previous",
    "add": "Add",
    "save": "Save",
    "addField": "Add fields",
    "form": {
      "avatarUrl": {
        "label": "Upload avatar",
      },
      "email": {
        "label": "Email",
        "placeholder": "Input email",
        "errors": {
          "required": "Please input your email!",
          "maxLength": "The length must be no more than {maxLength} characters!",
          "pattern": "Invalid email address! (For example: example@mail.com)",
          "alreadyExists": "Электронная почта уже существует!",
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
      "userName": {
        "label": "Username",
        "placeholder": "Input username",
        "errors": {
          "required": "Please input your username!",
          "pattern": "Incorrect username format! (A username can consist of Latin letters, numbers or _)",
          "minLength": "Must be at least {minLength} characters!",
          "maxLength": "Must be no more than {maxLength} characters!",
        }
      },
      "firstName": {
        "label": "Name",
        "placeholder": "Input name",
        "errors": {
          "pattern": "Only letters, hyphens, and apostrophes are allowed",
          "minLength": "Must be at least {minLength} characters!",
          "maxLength": "Must be no more than {maxLength} characters!",
        },
      },
      "lastName": {
        "label": "Surname",
        "placeholder": "Input surname",
        "errors": {
          "pattern": "Only letters, hyphens, and apostrophes are allowed",
          "minLength": "Must be at least {minLength} characters!",
          "maxLength": "Must be no more than {maxLength} characters!",
        },
      },
      "sectionTitle": {
        "label": "Section title",
        "placeholder": "Input section title",
        "errors": {
          "pattern": "Please use only letters and spaces!",
          "minLength": "Must be at least {minLength} characters!",
          "maxLength": "Must be no more than {maxLength} characters!",
        }
      },
      "inputText": {
        "errors": {
          "required": "Field is required!",
          "minLength": "Must be at least {minLength} characters!",
          "maxLength": "Must be no more than {maxLength} characters!",
        }
      },
      "select": {
        "errors": {
          "required": "Field is required!",
        }
      },
      "submitButton": "Save changes",
    }
  },
};

export default shared;
