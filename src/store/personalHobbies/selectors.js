export const isLoadingSelector = state => state.personalHobbies.status === "loading";
export const personalHobbiesSelector = state => state.personalHobbies?.data;
