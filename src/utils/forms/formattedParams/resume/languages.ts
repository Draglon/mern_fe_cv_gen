import { kebabCase } from 'lodash';

import { ParamsType } from "@/lib/constants/props/resume/personalLanguages";

export const formattedParams = (params:ParamsType) => ({
  ...params,
  ...params.values,
  languages: params.values.languages.map(item => ({
    ...item,
    level: kebabCase(item.level),
  })),
});
