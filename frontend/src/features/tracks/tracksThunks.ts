import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { Track } from '../../../types';
import { RootState } from '../../app/store';

// export const fetchTracks = createAsyncThunk<Track[], string>(
//   'tracks/fetchAll',
//   async (id) => {
//     const tracksResponse = await axiosApi.get<Track[]>('/tracks/?album=' + id);
//     return tracksResponse.data;
//   }
// );

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

// export const  = createAsyncThunk<void, void, {state: RootState}>(
//   'users/secret',
//   async (_, {getState}) => {
//     const user = getState().users.user;
//
//     if (user) {
//       return axiosApi.post('/users/secret', {}, {headers: {'Authorization': user.token}})
//     } else {
//       throw new Error('No user');
//     }
//   }
// )