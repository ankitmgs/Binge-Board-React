import axios from "axios";
import { LISTURL } from "../constant/apiUrl";

export const addList = async (listName: string): Promise<any> => {
  try {
    const userId = localStorage.getItem("uid") || "";
    const payload = {
      name: listName,
      userId: userId,
      isPin: false,
    };
    const response = await axios.post(LISTURL, payload);
    return response.data;
  } catch (error) {
    console.error("Error adding list:", error);
    return { error: true, message: "Failed to add list" };
  }
};
