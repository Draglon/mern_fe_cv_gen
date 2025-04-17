const personalInfo = {
  "PersonalInfo": {
    "title": "Personal information",
    "form": {
      "userUrl": {
        "label": "Photo"
      },
      "firstName": {
        "label": "Name",
        "placeholder": "Input name",
        "errors": {
          "required": "Please input your name!",
          "min": "The name must be at least 3 characters long."
        }
      },
      "lastName": {
        "label": "Surname",
        "placeholder": "Input surname",
        "errors": {
          "required": "Please input your surname!",
          "min": "The surname must be at least 3 characters long."
        }
      },
      "about": {
        "label": "About me",
        "placeholder": "Input information about yourself",
        "errors": {
          "required": "Please input your information about yourself!"
        }
      },
      "email": {
        "label": "Email",
        "placeholder": "Input email",
        "errors": {
          "required": "Please input your email!",
          "pattern": "Please input correct your email!"
        }
      },
      "address": {
        "label": "Address",
        "placeholder": "Input address"
      },
      "phoneNumber": {
        "label": "Phone number",
        "placeholder": "Input phone number",
        "errors": {
          "pattern": "Please input correct your phone number!",
          "required": "Please input your phone number!"
        }
      },
      "birthday": {
        "label": "Birthday",
        "placeholder": "Input birthday",
        "errors": {
          "pattern": "Please input correct your birthday!"
        }
      },
      "linkedIn": {
        "label": "LinkedIn",
        "placeholder": "Input linkedin"
      },
    },
  },
};

export default personalInfo;