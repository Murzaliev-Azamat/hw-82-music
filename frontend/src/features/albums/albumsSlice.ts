import { createSlice } from '@reduxjs/toolkit';
import { Album } from '../../../types';
import { RootState } from '../../app/store';
import { fetchAlbums } from './albumsThunks';


interface AlbumsState {
  albums: Album[] | [];
  fetchAllAlbumsLoading: boolean;
}

const initialState: AlbumsState = {
  albums: [],
  fetchAllAlbumsLoading: false,
}

export const AlbumsSlice = createSlice({
  name: 'albums',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAlbums.pending, (state) => {
      state.fetchAllAlbumsLoading = true;
    });
    builder.addCase(fetchAlbums.fulfilled, (state, action) => {
      state.fetchAllAlbumsLoading = false;
      state.albums = action.payload;
    });
    builder.addCase(fetchAlbums.rejected, (state) => {
      state.fetchAllAlbumsLoading = false;
    });
  }});

export const albumsReducer = AlbumsSlice.reducer;
export const selectAlbums = (state: RootState) => state.albums.albums;

export const selectFetchAllAlbumsLoading = (state: RootState) => state.albums.fetchAllAlbumsLoading;