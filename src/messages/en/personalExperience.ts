import { EMPLOYMENT_TYPE_OPTIONS, WORK_FORMAT_OPTIONS } from "@/messages/common/selectOptions";

const personalExperience = {
  "PersonalExperience": {
    "title": "Experience",
    "cardTitle": "Experience {index}",
    "form": {
      "recentPositionsCount": {
        "label": "Last places of works",
        "placeholder": "Input number",
        "errors": {
          "required": "Please input number places of works!",
        }
      },
      "position": {
        "label": "Position",
        "placeholder": "Input position",
      },
      "companyName": {
        "label": "Company name",
        "placeholder": "Input company name",
      },
      "location": {
        "label": "Location",
        "placeholder": "Input location",
      },
      "employmentType": {
        "label": "Place of work",
        "placeholder": "Select place of work",
        "options": EMPLOYMENT_TYPE_OPTIONS,
        "errors": {
          "required": "Please select your place of work!",
        }
      },
      "workFormat": {
        "label": "Working time",
        "placeholder": "Select working time",
        "options": WORK_FORMAT_OPTIONS,
        "errors": {
          "required": "Please select your working time!",
        }
      },
      "startDate": {
        "label": "Start date",
        "placeholder": "Input start date",
        "errors": {
          "required": "Please input your start date!",
        }
      },
      "endDate": {
        "label": "End date",
        "placeholder": "Input end date",
        "errors": {
          "required": "Please input your end date!",
        }
      },
      "isCurrent": {
        "label": "Current work",
      },
      "description": {
        "label": "Description",
        "placeholder": "Input description",
      },
      "skills": {
        "label": "Skills",
        "placeholder": "Select skills",
      },
    },
  },
};

export default personalExperience;