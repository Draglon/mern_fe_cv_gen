import { kebabCase } from 'lodash';

import { ParamsType } from "@/lib/constants/props/resume/personalExperiences";

export const formattedParams = (params: ParamsType) => {
  const { values, ...rest } = params;

  return {
    ...rest,
    ...values,
    experiences: params.values.experiences.map(item => ({
      ...item,
      employmentType: kebabCase(item.employmentType),
      workFormat: kebabCase(item.workFormat),
    })),
  };
};
