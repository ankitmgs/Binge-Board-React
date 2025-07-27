import { createSlice } from "@reduxjs/toolkit";
import { addItemList } from "../../rtk-apis/addItemList";

const initialState = {
  //   lists: [],
  status: "idle",
  error: "",
  isLoading: false,
  msg: "",
};

const addItemSlice = createSlice({
  name: "list/addItem",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(addItemList.pending, (state) => {
        state.isLoading = true;
        state.status = "loading";
      })
      .addCase(addItemList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = "succeeded";
        state.msg = action.payload?.msg || "Item added to list";
      })
      .addCase(addItemList.rejected, (state, action) => {
        state.isLoading = false;
        state.status = "failed";
        state.error = action.error.message || "Failed to add item to list";
      }),
});

export default addItemSlice.reducer;
