import standfordImage from "@/../public/images/templates/standford.jpg";
import edinburghImage from "@/../public/images/templates/edinburgh.jpg";

export const TEMPLATES = {
  standford: "standford",
  edinburgh: "edinburgh",
  edinburghPlus: "edinburgh-plus",
};

export const TEMPLATES_LIST = [
  {
    template: TEMPLATES.edinburghPlus,
    image: edinburghImage,
  },
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
  TEMPLATES.edinburghPlus,
];

export const TEMPLATES_PERSONAL_DATA_ICONS = [
  TEMPLATES.edinburgh,
  TEMPLATES.edinburghPlus,
];

export const TEMPLATES_SIDEBARS_SKILLS = [
  TEMPLATES.edinburghPlus,
];

export const TEMPLATES_SIDEBARS_TOOLS = [
  TEMPLATES.edinburghPlus,
];

