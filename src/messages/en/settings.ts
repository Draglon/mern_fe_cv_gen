const settings = {
  "Settings": {
    "layout": {
      "title": "Settings",
      "description": "Settings - description"
    },
    "title": "Settings",
    "removeAccount": {
      "title": "Remove account",
      "button": "Remove account",
      "modal": {
        "title": "Remove account",
        "form": {
          "userName": {
            "label": "Username",
            "placeholder": "Input username",
            "errors": {
              "required": "Please input your username!",
              "pattern": "Incorrect username format! (A username can consist of Latin letters, numbers or _)",
              "minLength": "Must be at least {minLength} characters!",
              "maxLength": "Must be no more than {maxLength} characters!",
            },
          },
          "alert": {
            "error": "User name is not correct!",
          },
          "submitButton": "Remove account",
        },
      },
    },
  },
};

export default settings;