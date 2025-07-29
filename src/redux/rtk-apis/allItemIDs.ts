import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { AllItemIDsURL } from "../../constant/apiUrl";

export const getAllItemIDs = createAsyncThunk(
  "Item/IDs",
  async (_, { rejectWithValue }) => {
    try {
      const userId = localStorage.getItem("uid");
      const result = await axios.get(`${AllItemIDsURL}/${userId}`);
      return result.data;
    } catch (error: any) {
      console.error("Error while fetching Item IDs");
      rejectWithValue(error.response.data || error.message);
    }
  }
);
