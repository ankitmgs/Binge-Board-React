import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { LISTURL } from "../../constant/apiUrl";

export const addList = createAsyncThunk(
  "list/add",
  async (payload: Record<string, any>, thunkAPI) => {
    try {
      const result = await axios.post(LISTURL, payload);
      return result.data;
    } catch (error: any) {
      console.error("Error adding list:", error);
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
