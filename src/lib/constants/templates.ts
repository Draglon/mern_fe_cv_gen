import standfordImage from "@/../public/images/templates/standford.jpg";
import edinburghImage from "@/../public/images/templates/edinburgh.jpg";

export const TEMPLATES = {
  standford: "standford",
  edinburgh: "edinburgh",
  edinburghPlus: "edinburghPlus",
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
