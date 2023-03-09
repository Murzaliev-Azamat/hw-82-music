import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { Artist, ArtistApi } from '../../../types';

export const fetchArtists = createAsyncThunk<Artist[]>(
  'artists/fetchAll',
  async () => {
    const artistsResponse = await axiosApi.get<Artist[]>('/artists');
    return artistsResponse.data;
  }
);

// export const addPost = createAsyncThunk<void, PostApi>(
//   'posts/add',
//   async (post) => {
//     const formData = new FormData();
//
//     const keys = Object.keys(post) as (keyof PostApi)[];
//     keys.forEach(key => {
//       const value = post[key];
//
//       if (value !== null) {
//         formData.append(key, value);
//       }
//     });
//
//     await axiosApi.post<PostApi>('/posts', formData);
//   }
// );

export const addArtist = createAsyncThunk<void, ArtistApi>(
  'artists/addArtist',
  async (artist) => {

      const formData = new FormData();

      const keys = Object.keys(artist) as (keyof ArtistApi)[];
      keys.forEach(key => {
        const value = artist[key];

        if (value !== null) {
          formData.append(key, value);
        }
      });

      await axiosApi.post<ArtistApi>('/artists', formData);
  }
);

// export const addComment = createAsyncThunk<void, CommentApi, { state: RootState }>(
//   'comments/add',
//   async (comment, {getState}) => {
//     const user = getState().users.user;
//
//     if (user) {
//       await axiosApi.post<CommentApi>('/comments', comment, {headers: {'Authorization': user.token}});
//     } else {
//       throw new Error('No user');
//     }
//   }
// );

export const deleteArtist = createAsyncThunk<void, string>(
  'artists/deleteArtist',
  async (id) => {

    await axiosApi.delete('/artists/' + id);
  }
);