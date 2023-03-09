import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { Track, TrackApi } from '../../../types';

export const fetchTracks = createAsyncThunk<Track[], string>(
  'tracks/fetchAll',
  async (id) => {

    const tracksResponse = await axiosApi.get<Track[]>('/tracks/?album=' + id)
    return tracksResponse.data;
  }
);

export const addTrack = createAsyncThunk<void, TrackApi>(
  'tracks/addTrack',
  async (track) => {

    await axiosApi.post<TrackApi>('/tracks', track);
  }
);

export const deleteTrack = createAsyncThunk<void, string>(
  'tracks/deleteTrack',
  async (id) => {

    await axiosApi.delete('/tracks/' + id);
  }
);