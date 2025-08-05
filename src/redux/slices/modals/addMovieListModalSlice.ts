import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Movie } from '../../../components/Modals/AddMovieListModal';

export interface AddMovieListModalState {
  isOpen: boolean;
  movieDetails: Movie | null;
}

const initialState: AddMovieListModalState = {
  isOpen: false,
  movieDetails: null,
};

const addMovieListModalSlice = createSlice({
  name: 'addMovieListModal',
  initialState,
  reducers: {
    openAddMovieListModal: (state, action: PayloadAction<Movie>) => {
      state.isOpen = true;
      state.movieDetails = action.payload;
    },
    closeAddMovieListModal: (state) => {
      state.isOpen = false;
      state.movieDetails = null;
    },
  },
});

export const { openAddMovieListModal, closeAddMovieListModal } = addMovieListModalSlice.actions;
export default addMovieListModalSlice.reducer;