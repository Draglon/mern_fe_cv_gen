export const isLoadingSelector = state => state.resume.status === "loading";
export const resumeSelector = state => state.resume?.data;
