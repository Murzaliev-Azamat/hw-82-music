import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { Artist } from '../../../types';
import { RootState } from '../../app/store';

export const fetchArtists = createAsyncThunk<Artist[]>(
  'artists/fetchAll',
  async () => {
    const artistsResponse = await axiosApi.get<Artist[]>('/artists');
    return artistsResponse.data;
  }
);

export const deleteArtist = createAsyncThunk<void, string, {state: RootState }>(
  'artists/deleteArtist',
  async (id, {getState}) => {
    const token = getState().users.user?.token;

    await axiosApi.delete('/artists/' + id, {headers: {'Authorization': token}});
  }
);