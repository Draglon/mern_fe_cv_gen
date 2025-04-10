export const isLoadingSelector = state => state.personalSkills.status === "loading";
export const personalSkillsSelector = state => state.personalSkills?.data;
