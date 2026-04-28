const settings = {
  "Settings": {
    "layout": {
      "title": "Settings",
      "description": "Settings - description"
    },
    "title": "Settings",
    "subTitle": "Manage your account preferences",
    "changeEmail": {
      "title": "Change email",
      "button": "Change email",
      "form": {
        "email": {
          "label": "New email",
          "placeholder": "Input new email",
          "errors": {
            "alreadyExists": "Email already exists!",
          }
        },
        "password": {
          "label": "Current password",
          "errors": {
            "currentPassword": "Incorrect current password",
          }
        },
      }
    },
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
          "placeholder": {
            "newPassword": "Input new password",
            "confirmPassword": "Input confirm password",
          },
          "errors": {
            "required": "Please enter your password!",
            "currentPassword": "Incorrect current password!",
            "newPassword": "New password must be different from the current password!",
            "confirmPassword": "The passwords do not match!",
          }
        },
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