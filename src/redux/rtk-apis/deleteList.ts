import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { LISTURL } from "../../constant/apiUrl";

export const deleteList = createAsyncThunk(
  "list/delete",
  async (listId: string, { rejectWithValue }) => {
    try {
      const result = await axios.delete(`${LISTURL}/${listId}`);
      return result.data;
    } catch (error: any) {
      console.error("Error while deleting the list", error);
      rejectWithValue(error.response.data || error.message);
    }
  }
);
