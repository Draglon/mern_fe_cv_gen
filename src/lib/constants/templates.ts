import standfordImage from "@/../public/images/templates/standford.jpg";
import edinburghImage from "@/../public/images/templates/edinburgh.jpg";
import modernImage from "@/../public/images/templates/modern.png";

export const TEMPLATES = {
  edinburgh: "edinburgh",
  standford: "standford",
  modern: "modern",
} as const;

export const TEMPLATES_LIST = [
  {
    template: TEMPLATES.edinburgh,
    image: edinburghImage,
  },
  {
    template: TEMPLATES.standford,
    image: standfordImage,
  },
  {
    template: TEMPLATES.modern,
    image: modernImage,
  },
];

export const TEMPLATES_PERSONAL_INFO_FULLNAME = [
  TEMPLATES.edinburgh,
  TEMPLATES.modern,
];

export const TEMPLATES_PERSONAL_DATA_ICONS = [
  TEMPLATES.edinburgh,
  TEMPLATES.modern,
];

export const TEMPLATES_SIDEBARS_SKILLS = [
  TEMPLATES.edinburgh,
  TEMPLATES.modern,
];

export const TEMPLATES_SIDEBARS_TOOLS = [
  TEMPLATES.edinburgh,
  TEMPLATES.modern,
];
