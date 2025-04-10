export const isLoadingSelector = state => state.personalEducation.status === "loading";
export const personalEducationSelector = state => state.personalEducation?.data;
