import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { Track } from '../../../types';
import { RootState } from '../../app/store';

export const fetchTracks = createAsyncThunk<Track[], string, {state: RootState}>(
  'tracks/fetchAll',
  async (id, {getState}) => {
    const user = getState().users.user;

    if (user) {
      const tracksResponse = await axiosApi.get<Track[]>('/tracks/?album=' + id, {headers: {'Authorization': user.token}})
      return tracksResponse.data;
    } else {
      throw new Error('No user');
    }
  }
);