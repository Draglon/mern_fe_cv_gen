export const isLoadingSelector = state => state.personalTools.status === "loading";
export const personalToolsSelector = state => state.personalTools?.data;
