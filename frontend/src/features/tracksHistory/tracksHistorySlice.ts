import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Track } from '../../../types';
import { addTrackToHistory } from './tracksHistoryThunks';


interface TracksHistoryState {
  tracksHistory: Track[] | [];
  addTracksHistoryLoading: boolean;
}

const initialState: TracksHistoryState = {
  tracksHistory: [],
  addTracksHistoryLoading: false,
}

export const TracksHistorySlice = createSlice({
  name: 'tracksHistory',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addTrackToHistory.pending, (state) => {
      state.addTracksHistoryLoading = true;
    });
    builder.addCase(addTrackToHistory.fulfilled, (state, action) => {
      state.addTracksHistoryLoading = false;
    });
    builder.addCase(addTrackToHistory.rejected, (state) => {
      state.addTracksHistoryLoading = false;
    });
  }});

export const tracksHistoryReducer = TracksHistorySlice.reducer;
export const selectTracksHistory = (state: RootState) => state.tracksHistory.tracksHistory;

export const selectAddTracksHistoryLoading = (state: RootState) => state.tracksHistory.addTracksHistoryLoading;