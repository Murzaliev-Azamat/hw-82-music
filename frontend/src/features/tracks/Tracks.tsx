import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { selectFetchAllTracksLoading, selectTracks } from './tracksSlice';
import { fetchTracks } from './tracksThunks';
import { selectUser } from '../users/usersSlise';
import { secret } from '../users/usersThunks';

const Albums = () => {
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const tracks = useAppSelector(selectTracks);
  const user = useAppSelector(selectUser);
  const fetchAllTracksLoading = useAppSelector(selectFetchAllTracksLoading);


  useEffect(() => {
    if (id) {
      dispatch(fetchTracks(id));
    }
  }, [dispatch]);

  let artistName = null;

  if (tracks.length > 0) {
    artistName = tracks[0].album.artist.name
  }

  if (!user) {
    return <Navigate to="/login" />
  }

  let info = null;

  if (fetchAllTracksLoading) {
    info = <Spinner/>
  } else {
    info = (
      <>
        {tracks.map((track) => (
          <div key={track._id} style={{display: "flex", alignItems: "center", marginBottom: "15px"}}>
            {/*<img src={apiUrl + '/' + track.image} style={{marginRight: "10px", width: "200px"}}></img>*/}
            <p style={{marginRight: "10px"}}>{track.trackNumber}</p>
            <p style={{marginRight: "10px", color: "green"}}>{track.name}</p>
            <p style={{marginRight: "10px"}}>{track.time + " minutes"}</p>
            <button>Play</button>
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