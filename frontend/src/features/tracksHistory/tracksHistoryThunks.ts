import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { RootState } from '../../app/store';


export const addTrackToHistory = createAsyncThunk<void, string, {state: RootState}>(
  'tracksHistory/addTrackToHistory',
  async (id, {getState}) => {
    const user = getState().users.user;

    if (user) {
      await axiosApi.post('/track_history', {track: id}, {headers: {'Authorization': user.token}})
    } else {
      throw new Error('No user');
    }
  }
);
