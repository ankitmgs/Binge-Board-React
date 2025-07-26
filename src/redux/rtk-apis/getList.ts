import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { LISTURL } from "../../constant/apiUrl";

export const getAllList = createAsyncThunk(
  "getAllLists",
  async (_, { rejectWithValue }) => {
    try {
      const uid = localStorage.getItem("uid");
      if (!uid) {
        throw new Error("User ID not found, Please login again.");
      }
      const result = await axios.get(`${LISTURL}/${uid}`);
      return result.data;
    } catch (error: any) {
      console.error("Error while getting list", error);
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);
