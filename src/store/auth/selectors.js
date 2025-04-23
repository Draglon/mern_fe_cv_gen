export const isAuthSelector = state => Boolean(state.auth.data);
export const isLoadingSelector = state => state.auth.status === "loading";
export const userIdSelector = state => state.auth.data?._id;
export const userSelector = state => state.auth?.data;
export const personalInfoIdSelector = state => state.auth.data?.personalInfoId;
export const personalHobbiesIdSelector = state => state.auth.data?.personalHobbiesId;
export const personalLanguagesIdSelector = state => state.auth.data?.personalLanguagesId;
export const personalExperienceIdSelector = state => state.auth.data?.personalExperienceId;
export const personalEducationIdSelector = state => state.auth.data?.personalEducationId;
export const personalCoursesIdSelector = state => state.auth.data?.personalCoursesId;
export const personalSkillsIdSelector = state => state.auth.data?.personalSkillsId;
export const personalToolsIdSelector = state => state.auth.data?.personalToolsId;

