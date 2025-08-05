import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  AddMovieListModalState,
} from "./addMovieListModalSlice";
import type { Movie } from "../../../components/Modals/AddMovieListModal";

const initialState: AddMovieListModalState = {
  isOpen: false,
  movieDetails: null,
};

const manageMovieListModalSlice = createSlice({
  name: "manageMovieListModal",
  initialState,
  reducers: {
    openManageMovieListModal: (state, action: PayloadAction<Movie>) => {
      state.isOpen = true;
      state.movieDetails = action.payload;
    },
    closeManageMovieListModal: (state) => {
      state.isOpen = false;
      state.movieDetails = null;
    },
  },
});

export const { closeManageMovieListModal, openManageMovieListModal } =
  manageMovieListModalSlice.actions;
export default manageMovieListModalSlice.reducer;
