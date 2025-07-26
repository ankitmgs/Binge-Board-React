import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import addListSlice from "./slices/lists/addListSlice";
import getAllLists from "./slices/lists/getAllListSlice";
import deleteListSlice from "./slices/lists/deleteListSlice";
import editListSlice from "./slices/lists/editListSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    addList: addListSlice,
    getAllList: getAllLists,
    deleteList: deleteListSlice,
    editList: editListSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
