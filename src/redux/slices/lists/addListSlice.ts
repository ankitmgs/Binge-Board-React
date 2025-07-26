import { createSlice } from "@reduxjs/toolkit";
import { addList } from "../../rtk-apis/addList";

interface ListState {
  lists: any[];
  status: "idle" | "loading" | "failed";
  error: string | null;
}

const initialState: ListState = {
  lists: [],
  status: "idle",
  error: null,
};

const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    addList: (state, action) => {
      state.lists.push(action.payload);
    },
    clearLists: (state) => {
      state.lists = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addList.fulfilled, (state, action) => {
        state.status = "idle";
        state.lists.push(action.payload);
      })
      .addCase(addList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export default listSlice.reducer;
export const { clearLists } = listSlice.actions;
