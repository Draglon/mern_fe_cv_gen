export const isLoadingSelector = state => state.personalInfo.status === "loading";
export const personalInfoSelector = state => state.personalInfo?.data;
