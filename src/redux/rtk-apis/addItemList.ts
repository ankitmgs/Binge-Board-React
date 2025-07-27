import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { AddItemTOListURL } from "../../constant/apiUrl";

export const addItemList = createAsyncThunk(
  "list/addItem",
  async (payload: Object, { rejectWithValue }) => {
    try {
      const result = await axios.post(AddItemTOListURL, payload);
      return result.data;
    } catch (error: any) {
      console.error("Error while adding item to lists");
      rejectWithValue(error.response.data || error.message);
    }
  }
);
