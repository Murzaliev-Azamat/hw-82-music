import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../../../types';
import { RootState } from '../../app/store';
import { addPost, fetchPosts } from './postsThunks';


interface PostsState {
  posts: Post[] | [];
  fetchAllLoading: boolean;
  addLoading: boolean;
}

const initialState: PostsState = {
  posts: [],
  fetchAllLoading: false,
  addLoading: false,
}

export const PostsSlice = createSlice({
  name: 'posts',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.fetchAllLoading = true;
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.fetchAllLoading = false;
      state.posts = action.payload;
    });
    builder.addCase(fetchPosts.rejected, (state) => {
      state.fetchAllLoading = false;
    });
    builder.addCase(addPost.pending, (state) => {
      state.addLoading = true;
    });
    builder.addCase(addPost.fulfilled, (state) => {
      state.addLoading = false;
    });
    builder.addCase(addPost.rejected, (state) => {
      state.addLoading = false;
    });
  }});

export const postsReducer = PostsSlice.reducer;
export const selectPosts = (state: RootState) => state.posts.posts;

export const selectFetchAllLoading = (state: RootState) => state.posts.fetchAllLoading;