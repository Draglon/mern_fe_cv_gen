const settings = {
  "Settings": {
    "layout": {
      "title": "Settings",
      "description": "Settings - description"
    },
    "title": "Settings",
    "subTitle": "Manage your account preferences",
    "deleteAccount": {
      "title": "Delete account",
      "button": "Delete account",
      "modal": {
        "title": "Delete account",
        "form": {
          "userName": {
            "label": 'Write your "username" to confirm account deletion',
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
          "submitButton": "Delete account",
        },
      },
    },
  },
};

export default settings;