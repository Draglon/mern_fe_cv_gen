import { combineReducers, configureStore, UnknownAction, createListenerMiddleware } from '@reduxjs/toolkit';
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

import { registerNotifications } from "@/store/middleware/notifications/registerNotifications";
import authReducer from "@/store/auth";
import modalReducer from "@/store/modal";
import resumeReducer from "@/store/resume";
import personalInfoReducer from "@/store/personalInfo";
import personalHobbiesReducer from "@/store/personalHobbies";
import personalLanguagesReducer from "@/store/personalLanguages";
import personalExperienceReducer from "@/store/personalExperience";
import personalEducationReducer from "@/store/personalEducation";
import personalCoursesReducer from "@/store/personalCourses";
import personalSkillsReducer from "@/store/personalSkills";
import personalToolsReducer from "@/store/personalTools";

const listenerMiddleware = createListenerMiddleware();
registerNotifications(listenerMiddleware);

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
    }).prepend(listenerMiddleware.middleware),
});

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]
