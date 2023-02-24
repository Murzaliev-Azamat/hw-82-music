import { createSlice } from '@reduxjs/toolkit';
import { Artist } from '../../../types';
import { RootState } from '../../app/store';
import { fetchArtists } from './artistsThunks';


interface ArtistsState {
  artists: Artist[] | [];
  fetchAllArtistsLoading: boolean;
}

const initialState: ArtistsState = {
  artists: [],
  fetchAllArtistsLoading: false,
}

export const ArtistsSlice = createSlice({
  name: 'artists',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchArtists.pending, (state) => {
      state.fetchAllArtistsLoading = true;
    });
    builder.addCase(fetchArtists.fulfilled, (state, action) => {
      state.fetchAllArtistsLoading = false;
      state.artists = action.payload;
    });
    builder.addCase(fetchArtists.rejected, (state) => {
      state.fetchAllArtistsLoading = false;
    });
  }});

export const artistsReducer = ArtistsSlice.reducer;
export const selectArtists = (state: RootState) => state.artists.artists;

export const selectFetchAllArtistsLoading = (state: RootState) => state.artists.fetchAllArtistsLoading;