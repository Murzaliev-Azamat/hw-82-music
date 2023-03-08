import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Spinner from '../../components/UI/Spinner/Spinner';
import { apiUrl } from '../../constants';
import { Link, useParams } from 'react-router-dom';
import { selectAlbums, selectFetchAllAlbumsLoading } from './albumsSlice';
import { deleteAlbum, fetchAlbums } from './albumsThunks';
import { selectUser } from '../users/usersSlise';
import { Button } from '@mui/material';
import { deleteArtist, fetchArtists } from '../artists/artistsThunks';

const Albums = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const albums = useAppSelector(selectAlbums);
  const user = useAppSelector(selectUser);
  const fetchAllAlbumsLoading = useAppSelector(selectFetchAllAlbumsLoading);

  useEffect(() => {
    if (params.id) {
      dispatch(fetchAlbums(params.id));
    }
  }, [dispatch]);

  const removeAlbum = async (id: string) => {
    await dispatch(deleteAlbum(id));
    if (params.id) {
      await dispatch(fetchAlbums(params.id));
    }
  }

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
            <p style={{marginRight: "10px"}}>{album.year}</p>
            {user && user.role === 'admin' && (
            <Button onClick={() => removeAlbum(album._id)} variant="contained">Delete</Button>
              )}
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