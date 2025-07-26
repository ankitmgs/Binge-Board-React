import { createSlice } from "@reduxjs/toolkit";
import { deleteList } from "../../rtk-apis/deleteList";

interface ListItem {
  id: string;
  name: string;
  userId: string;
  isPin: boolean;
  createdAt: string;
  updatedAt: string;
}
interface ListState {
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

const deleteListSlice = createSlice({
  name: "list/delete",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteList.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.isLoading = true;
        state.msg = "";
      })
      .addCase(deleteList.fulfilled, (state, action) => {
        state.lists = action.payload.data;
        state.status = "idle";
        state.isLoading = false;
        state.msg = action.payload.msg || "Lists deleted Successfully";
      })
      .addCase(deleteList.rejected, (state, action: any) => {
        state.status = "error";
        state.error = action.payload as string;
        state.isLoading = false;
        state.msg = action.payload.msg;
      });
  },
});

export default deleteListSlice.reducer;
