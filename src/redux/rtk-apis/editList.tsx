import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { LISTURL } from "../../constant/apiUrl";

export const editList = createAsyncThunk(
  "list/edit",
  async (
    { listId, payload }: { listId: string; payload: Object },
    { rejectWithValue }
  ) => {
    try {
      const result = await axios.put(`${LISTURL}/${listId}`, payload);
      return result.data;
    } catch (error: any) {
      console.log("Error while editing the list");
      return rejectWithValue(error?.response?.data || error?.message);
    }
  }
);
