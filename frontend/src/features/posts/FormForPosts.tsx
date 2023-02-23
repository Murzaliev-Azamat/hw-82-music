import React, { useState } from 'react';
import { Button, Grid, TextField } from '@mui/material';
import { useAppDispatch } from '../../app/hooks';
import { addPost, fetchPosts } from './postsThunks';
import FileInput from '../../components/UI/FileInput/FileInput';
import { PostApi } from '../../../types';

const FormForPosts = () => {
  const dispatch = useAppDispatch();

  const [state, setState] = useState<PostApi>({
    author: '',
    message: '',
    image: null,
  });

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(addPost({
      author: state.author,
      message: state.message,
      image: state.image,
    }));
    setState({author: '', message: '', image: null});
    await dispatch(fetchPosts());
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setState(prevState => {
      return {...prevState, [name]: value};
    });
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;
    if (files && files[0]) {
      setState(prevState => ({
        ...prevState, [name]: files[0]
      }));
    } else {
      setState(prevState => ({
        ...prevState, [name]: null,
      }))
    }
  };

  return (
    <form
      autoComplete="off"
      onSubmit={submitFormHandler}
    >
      <Grid item container justifyContent="space-between" alignItems="center" xs sx={{mb: 1}}>
        <TextField
          sx={{width: '100%'}}
          id="author" label="Author"
          value={state.author}
          onChange={inputChangeHandler}
          name="author"
        />
      </Grid>

      <Grid container direction="column" spacing={2} sx={{mb: 1}}>
        <Grid item xs>
          <TextField
            sx={{width: 1}}
            multiline rows={3}
            id="message" label="Message"
            value={state.message}
            onChange={inputChangeHandler}
            name="message"
            required
          />
        </Grid>

        <Grid item xs>
          <FileInput
            onChange={fileInputChangeHandler}
            name="image"
            label="Image"
          />
        </Grid>
      </Grid>

      <Button type="submit" color="primary" variant="contained">
        Add post
      </Button>
    </form>
  );

};

export default FormForPosts;