export const isLoadingSelector = state => state.personalExperience.status === "loading";
export const personalExperienceSelector = state => state.personalExperience?.data;
