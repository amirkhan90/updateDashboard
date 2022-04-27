import { configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistStore,
} from "redux-persist";
import { combineReducers } from "redux";
import storageSession from "redux-persist/es/storage/session";
import userReducer from "./reducers/user";
import projectsReducer from "./reducers/projects";
import employeeReducer from "./reducers/employee";
import tasksReducer from "./reducers/tasks";
import reportsReducer from "./reducers/reports";
const rootReducer = combineReducers({
  user: userReducer,
  projects: projectsReducer,
  employee: employeeReducer,
  tasks: tasksReducer,
  reports: reportsReducer,
});
const persistConfig = {
  key: "root",
  version: 1,
  storage: storageSession,
  whitelist: ["user"],
};

// AsyncStorage.clear();

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export default store;
