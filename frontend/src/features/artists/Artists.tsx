import React, { useEffect } from 'react';
import { deleteArtist, fetchArtists } from './artistsThunks';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectArtists, selectFetchAllArtistsLoading } from './artistsSlice';
import Spinner from '../../components/UI/Spinner/Spinner';
import { apiUrl } from '../../constants';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { selectUser } from '../users/usersSlise';

const Artists = () => {
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectArtists);
  const fetchAllArtistsLoading = useAppSelector(selectFetchAllArtistsLoading);
  const user = useAppSelector(selectUser)

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  const removeArtist = async (id: string) => {
    await dispatch(deleteArtist(id));
    await dispatch(fetchArtists());
  }

  let info = null;

  if (fetchAllArtistsLoading) {
    info = <Spinner/>
  } else {
    info = (
      <>
        {artists.map((artist) => (
          <div key={artist._id} style={{display: "flex", alignItems: "center", marginBottom: "15px"}}>
            <img src={apiUrl + '/' +artist.image} style={{marginRight: "10px", width: "200px"}}></img>
            <Link to={'/albums/' + artist._id} style={{marginRight: "10px"}}>{artist.name}</Link>
            {user && user.role === 'admin' && (
            <Button onClick={() => removeArtist(artist._id)} variant="contained">Delete</Button>
            )}
          </div>
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

export default Artists;