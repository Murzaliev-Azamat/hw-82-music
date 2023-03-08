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

export const deleteTrack = createAsyncThunk<void, string, {state: RootState }>(
  'tracks/deleteTrack',
  async (id, {getState}) => {
    const token = getState().users.user?.token;

    await axiosApi.delete('/tracks/' + id, {headers: {'Authorization': token}});
  }
);