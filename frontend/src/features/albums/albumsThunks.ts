import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { Album } from '../../../types';

export const fetchAlbums = createAsyncThunk<Album[], string>(
  'albums/fetchAll',
  async (id) => {
    const albumsResponse = await axiosApi.get<Album[]>('/albums/?artist=' + id);
    return albumsResponse.data;
  }
);

export const deleteAlbum = createAsyncThunk<void, string>(
  'albums/deleteAlbum',
  async (id) => {

    await axiosApi.delete('/albums/' + id);
  }
);