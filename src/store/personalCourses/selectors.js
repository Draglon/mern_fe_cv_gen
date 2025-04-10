export const isLoadingSelector = state => state.personalCourses.status === "loading";
export const personalCoursesSelector = state => state.personalCourses?.data;
