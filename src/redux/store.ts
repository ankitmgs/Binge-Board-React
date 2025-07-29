import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import addListSlice from "./slices/lists/addListSlice";
import getAllLists from "./slices/lists/getAllListSlice";
import deleteListSlice from "./slices/lists/deleteListSlice";
import editListSlice from "./slices/lists/editListSlice";
import addItemSlice from "./slices/lists/AddItemSlice";
import getAllItemIDsSlice from "./slices/Items/getAllItemIdsSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    addList: addListSlice,
    getAllList: getAllLists,
    deleteList: deleteListSlice,
    editList: editListSlice,
    addItem: addItemSlice,
    getAllItemIDs: getAllItemIDsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
