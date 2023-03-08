import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { Artist } from '../../../types';

export const fetchArtists = createAsyncThunk<Artist[]>(
  'artists/fetchAll',
  async () => {
    const artistsResponse = await axiosApi.get<Artist[]>('/artists');
    return artistsResponse.data;
  }
);

export const deleteArtist = createAsyncThunk<void, string>(
  'artists/deleteArtist',
  async (id) => {

    await axiosApi.delete('/artists/' + id);
  }
);