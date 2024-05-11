import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import IdentityReducer from "./slices/IdentitySlice";
import GameReducer from "./slices/GameSlice";
import NotificationsReducer from "./slices/NotificationsSlice";
import { createLogger } from "redux-logger";

const logger = createLogger({
  // ...options
});

export const store = configureStore({
  reducer: {
    IdentityReducer,
    GameReducer,
    NotificationsReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(logger);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
