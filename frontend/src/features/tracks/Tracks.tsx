import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Navigate, useParams } from 'react-router-dom';
import { selectFetchAllTracksLoading, selectTracks } from './tracksSlice';
import { fetchTracks } from './tracksThunks';
import { selectUser } from '../users/usersSlise';
import { addTrackToHistory } from '../tracksHistory/tracksHistoryThunks';

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
            <p style={{marginRight: "10px"}}>{track.trackNumber}</p>
            <p style={{marginRight: "10px", color: "green"}}>{track.name}</p>
            <p style={{marginRight: "10px"}}>{track.time + " minutes"}</p>
            <button onClick={() =>  dispatch(addTrackToHistory(track._id))}>Play</button>
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