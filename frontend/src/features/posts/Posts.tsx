import React, { useEffect } from 'react';
import { fetchPosts } from './postsThunks';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectFetchAllLoading, selectPosts } from './postsSlice';
import CardForPost from '../../components/UI/CardForPost/CardForPost';
import Spinner from '../../components/UI/Spinner/Spinner';

const Posts = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectPosts);
  const fetchAllLoading = useAppSelector(selectFetchAllLoading);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  let info = null;

  if (fetchAllLoading) {
    info = <Spinner/>
  } else {
    info = (
      <>
        {posts.map((post) => (
          <CardForPost key={post.id} author={post.author} message={post.message}  image={post.image}/>
        ))}
      </>
    )
  }

  return (

    <div>
      {info}
    </div>
  );
};

export default Posts;