import standfordImage from "@/../public/images/templates/standford.jpg";
import edinburghImage from "@/../public/images/templates/edinburgh.jpg";

export const TEMPLATES = {
  edinburgh: "edinburgh",
  standford: "standford",
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
];

export const TEMPLATES_PERSONAL_INFO_FULLNAME = [
  TEMPLATES.edinburgh,
];

export const TEMPLATES_PERSONAL_DATA_ICONS = [
  TEMPLATES.edinburgh,
];

export const TEMPLATES_SIDEBARS_SKILLS = [
  TEMPLATES.edinburgh,
];

export const TEMPLATES_SIDEBARS_TOOLS = [
  TEMPLATES.edinburgh,
];
