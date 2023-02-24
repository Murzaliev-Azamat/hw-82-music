import React, { useEffect } from 'react';
import { fetchArtists } from './artistsThunks';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectArtists, selectFetchAllArtistsLoading } from './artistsSlice';
import Spinner from '../../components/UI/Spinner/Spinner';
import { apiUrl } from '../../constants';
import { Link } from 'react-router-dom';

const Artists = () => {
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectArtists);
  const fetchAllArtistsLoading = useAppSelector(selectFetchAllArtistsLoading);

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  let info = null;

  if (fetchAllArtistsLoading) {
    info = <Spinner/>
  } else {
    info = (
      <>
        {artists.map((artist) => (
          <div key={artist._id} style={{display: "flex", alignItems: "center", marginBottom: "15px"}}>
            <img src={apiUrl + '/' +artist.image} style={{marginRight: "10px", width: "200px"}}></img>
            <Link to={'/albums/' + artist._id}>{artist.name}</Link>
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