// ---User (SELF)---
export const authLoginRoute = "/auth/login";
export const authRegistrationRoute = "/auth/register";
export const authUserRoute = "/auth/user";
// ---Resume---
export const personalInfoCreateRoute = "/personal_info";
export const personalInfoRoute = (id: string) => `/personal_info/${id}`;
export const personalHobbiesCreateRoute = "/personal_hobbies";
export const personalHobbiesRoute = (id: string) => `/personal_hobbies/${id}`;
export const personalLanguagesCreateRoute = "/personal_languages";
export const personalLanguagesRoute = (id: string) => `/personal_languages/${id}`;
export const personalExperienceCreateRoute = "/personal_experience";
export const personalExperienceRoute = (id: string) => `/personal_experience/${id}`;
export const personalEducationCreateRoute = "/personal_education";
export const personalEducationRoute = (id: string) => `/personal_education/${id}`;
export const personalCoursesCreateRoute = "/personal_courses";
export const personalCoursesRoute = (id: string) => `/personal_courses/${id}`;
export const personalSkillsCreateRoute = "/personal_skills";
export const personalSkillsRoute = (id: string) => `/personal_skills/${id}`;
export const personalToolsCreateRoute = "/personal_tools";
export const personalToolsRoute = (id: string) => `/personal_tools/${id}`;
