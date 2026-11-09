import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./slice/uiSlice";
import themeReducer from "./slice/themeSlice";

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
