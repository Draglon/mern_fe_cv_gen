import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth";
import counterReducer from "./counter";
import modalReducer from "./modal";
import personalInfoReducer from "./personalInfo";
import personalHobbiesReducer from "./personalHobbies";
import personalLanguagesReducer from "./personalLanguages";
import personalExperienceReducer from "./personalExperience";
import personalEducationReducer from "./personalEducation";
import personalCoursesReducer from "./personalCourses";
import personalSkillsReducer from "./personalSkills";
import personalToolsReducer from "./personalTools";

export const makeStore = () => configureStore({
  reducer: {
    auth: authReducer,
    counter: counterReducer,
    modal: modalReducer,
    personalInfo: personalInfoReducer,
    personalHobbies: personalHobbiesReducer,
    personalLanguages: personalLanguagesReducer,
    personalExperience: personalExperienceReducer,
    personalEducation: personalEducationReducer,
    personalCourses: personalCoursesReducer,
    personalSkills: personalSkillsReducer,
    personalTools: personalToolsReducer,
  },
});

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]
