import { kebabCase } from 'lodash';

import { ParamsType } from "@/lib/constants/props/resume/personalLanguages";

export const formattedParams = (params: ParamsType) => {
  const { values, ...rest } = params;

  return {
    ...rest,
    ...values,
    languages: params.values.languages.map(item => ({
      ...item,
      level: kebabCase(item.level),
    })),
  };
};
