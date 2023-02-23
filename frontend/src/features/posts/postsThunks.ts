import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from '../../axiosApi';
import { Post, PostApi } from '../../../types';

export const fetchPosts = createAsyncThunk<Post[]>(
  'posts/fetchAll',
  async () => {
    const postsResponse = await axiosApi.get<Post[]>('/posts');
    return postsResponse.data;
  }
);

export const addPost = createAsyncThunk<void, PostApi>(
  'posts/add',
  async (post) => {
    const formData = new FormData();

    const keys = Object.keys(post) as (keyof PostApi)[];
    keys.forEach(key => {
      const value = post[key];

      if (value !== null) {
        formData.append(key, value);
      }
    });

    await axiosApi.post<PostApi>('/posts', formData);
  }
);