import { createSlice } from "@reduxjs/toolkit";
import { getAllItemIDs } from "../../rtk-apis/allItemIDs";

interface IDsState {
  IDs: number[];
  isLoading: boolean;
  msg: string;
  error: string;
  status: "idle" | "loading" | "success" | "error";
}

const initialState: IDsState = {
  IDs: [],
  isLoading: false,
  msg: "",
  error: "",
  status: "idle",
};

const getAllItemIDsSlice = createSlice({
  name: "Items/ID",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllItemIDs.pending, (state) => {
        state.status = "loading";
        state.error = "";
        state.isLoading = true;
        state.msg = "";
      })
      .addCase(getAllItemIDs.fulfilled, (state, action) => {
        state.IDs = action.payload.data;
        state.status = "idle";
        state.isLoading = false;
        state.msg = action.payload.msg || "Lists fetch Successfully";
      })
      .addCase(getAllItemIDs.rejected, (state, action: any) => {
        state.status = "error";
        state.error = action.payload as string;
        state.isLoading = false;
        state.msg = action.payload.msg;
      });
  },
});

export default getAllItemIDsSlice.reducer;
