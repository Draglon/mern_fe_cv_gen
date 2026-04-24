const profile = {
  "Profile": {
    "layout": {
      "title": "Profile",
      "description": "Profile - description"
    },
    "title": "Profile",
    "form": {
      "avatarUrl": {
        "label": "Upload avatar",
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
          "required": "Please input your name!",
          "minLength": "Must be at least {minLength} characters!",
          "maxLength": "Must be no more than {maxLength} characters!",
        },
      },
      "lastName": {
        "label": "Surname",
        "placeholder": "Input surname",
        "errors": {
          "required": "Please input your surname!",
          "minLength": "Must be at least {minLength} characters!",
          "maxLength": "Must be no more than {maxLength} characters!",
        },
      },
      "submitButton": "Save",
    },
  },
};

export default profile;