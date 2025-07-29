import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface MovieDetails {
  id: number;
  title?: string;
  name?: string;
  poster_path?: string;
  backdrop_path?: string;
  media_type?: string;
  // Add other movie details properties as needed
}

export interface AddMovieListModalState {
  isOpen: boolean;
  movieDetails: MovieDetails | null;
}

const initialState: AddMovieListModalState = {
  isOpen: false,
  movieDetails: null,
};

const addMovieListModalSlice = createSlice({
  name: 'addMovieListModal',
  initialState,
  reducers: {
    openAddMovieListModal: (state, action: PayloadAction<MovieDetails>) => {
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