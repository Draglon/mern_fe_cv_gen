export const isLoadingSelector = state => state.personalLanguages.status === "loading";
export const personalLanguagesSelector = state => state.personalLanguages?.data;
