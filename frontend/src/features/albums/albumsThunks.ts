import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { Album } from '../../../types';
import { RootState } from '../../app/store';

export const fetchAlbums = createAsyncThunk<Album[], string>(
  'albums/fetchAll',
  async (id) => {
    const albumsResponse = await axiosApi.get<Album[]>('/albums/?artist=' + id);
    return albumsResponse.data;
  }
);

export const deleteAlbum = createAsyncThunk<void, string, {state: RootState }>(
  'albums/deleteAlbum',
  async (id, {getState}) => {
    const token = getState().users.user?.token;

    await axiosApi.delete('/albums/' + id, {headers: {'Authorization': token}});
  }
);