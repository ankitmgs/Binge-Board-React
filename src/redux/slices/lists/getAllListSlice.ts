import { createSlice } from "@reduxjs/toolkit";
import { getAllList } from "../../rtk-apis/getList";

export interface ListItem {
  id: string;
  name: string;
  userId: string;
  isPin: boolean;
  items: [];
  createdAt: string;
  updatedAt: string;
}
export interface ListState {
  lists: ListItem[];
  status: "idle" | "loading" | "error";
  error: string | null;
  isLoading: boolean;
  msg: string;
}

const initialState: ListState = {
  lists: [],
  status: "idle",
  error: null,
  isLoading: false,
  msg: "",
};

const getAllListSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    clearAllLists: (state) => {
      state.lists = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllList.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.isLoading = true;
        state.msg = "";
      })
      .addCase(getAllList.fulfilled, (state, action) => {
        state.lists = action.payload.data;
        state.status = "idle";
        state.isLoading = false;
        state.msg = action.payload.msg || "Lists fetch Successfully";
      })
      .addCase(getAllList.rejected, (state, action: any) => {
        state.status = "error";
        state.error = action.payload as string;
        state.isLoading = false;
        state.msg = action.payload.msg;
      });
  },
});

export default getAllListSlice.reducer;
export const { clearAllLists } = getAllListSlice.actions;
