import { combineReducers, configureStore, UnknownAction } from '@reduxjs/toolkit';
import {
  persistReducer,
  PersistConfig,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';

import authReducer from "./auth";
import modalReducer from "./modal";
import settingsReducer from "./settings";
import resumeReducer from "./resume";
import personalInfoReducer from "./personalInfo";
import personalHobbiesReducer from "./personalHobbies";
import personalLanguagesReducer from "./personalLanguages";
import personalExperienceReducer from "./personalExperience";
import personalEducationReducer from "./personalEducation";
import personalCoursesReducer from "./personalCourses";
import personalSkillsReducer from "./personalSkills";
import personalToolsReducer from "./personalTools";

const createNoopStorage = () => {
  return {
    getItem() {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: string) {
      return Promise.resolve(value);
    },
    removeItem() {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== 'undefined'
    ? createWebStorage('local')
    : createNoopStorage();

const persistConfig: PersistConfig<ReturnType<typeof appReducer>> = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};

const appReducer = combineReducers({
  auth: authReducer,
  modal: modalReducer,
  settings: settingsReducer,
  resume: resumeReducer,
  personalInfo: personalInfoReducer,
  personalHobbies: personalHobbiesReducer,
  personalLanguages: personalLanguagesReducer,
  personalExperience: personalExperienceReducer,
  personalEducation: personalEducationReducer,
  personalCourses: personalCoursesReducer,
  personalSkills: personalSkillsReducer,
  personalTools: personalToolsReducer,
});

const rootReducer = (state: ReturnType<typeof appReducer> | undefined, action: UnknownAction) => {
  if (action.type === 'auth/logout') {
    state = undefined;
  }

  return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = () => configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
      middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [
            FLUSH,
            REHYDRATE,
            PAUSE,
            PERSIST,
            PURGE,
            REGISTER,
          ],
        },
      }),
});

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]
