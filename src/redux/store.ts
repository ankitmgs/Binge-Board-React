import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import addListSlice from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    addList: addListSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
