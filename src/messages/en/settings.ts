const settings = {
  "Settings": {
    "layout": {
      "title": "Settings",
      "description": "Settings - description"
    },
    "title": "Settings",
    "subTitle": "Manage your account preferences",
    "changePassword": {
      "title": "Change password",
      "button": "Change password",
      "form": {
        "password": {
          "label": {
            "currentPassword": "Current password",
            "newPassword": "New password",
            "confirmPassword": "Confirm password",
          },
          "placeholder": "Input password",
          "errors": {
            "required": "Please input your password!",
            "minLength": "Must be at least {minLength} characters!",
            "maxLength": "Must be no more than {maxLength} characters!",
            "uppercase": "Must contain at least one uppercase letter!",
            "number": "Must contain at least one number!",
            "currentPassword": "Incorrect current password",
            "confirmPassword": "Passwords do not match",
          }
        },
        "submitButton": "Change password",
      }
    },
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