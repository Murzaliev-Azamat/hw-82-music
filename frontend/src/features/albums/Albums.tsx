import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Spinner from '../../components/UI/Spinner/Spinner';
import { apiUrl } from '../../constants';
import { Link, useParams } from 'react-router-dom';
import { selectAlbums, selectFetchAllAlbumsLoading } from './albumsSlice';
import { fetchAlbums } from './albumsThunks';
import { selectUser } from '../users/usersSlise';

const Albums = () => {
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const albums = useAppSelector(selectAlbums);
  const user = useAppSelector(selectUser);
  const fetchAllAlbumsLoading = useAppSelector(selectFetchAllAlbumsLoading);

  useEffect(() => {
    if (id) {
      dispatch(fetchAlbums(id));
    }
  }, [dispatch]);

  let artistName = null;

  if (albums.length > 0) {
    artistName = albums[0].artist.name
  }

  let info = null;

  if (fetchAllAlbumsLoading) {
    info = <Spinner/>
  } else {
    info = (
      <>
        {albums.map((album) => (
          <div key={album._id} style={{display: "flex", alignItems: "center", marginBottom: "15px"}}>
            <img src={apiUrl + '/' + album.image} style={{marginRight: "10px", width: "200px"}} alt="image"></img>
            <Link to={user ? '/tracks/' + album._id : '/login'} style={{marginRight: "10px"}}>{album.name}</Link>
            <p>{album.year}</p>
          </div>
        ))}
      </>
    )
  }

  return (
    <div>
      <h1>{artistName}</h1>
      {info}
    </div>
  );
};

export default Albums;