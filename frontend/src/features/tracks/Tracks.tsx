import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Spinner from '../../components/UI/Spinner/Spinner';
import { useParams } from 'react-router-dom';
import { selectFetchAllTracksLoading, selectTracks } from './tracksSlice';
import { fetchTracks } from './tracksThunks';
import { addTrackToHistory } from '../tracksHistory/tracksHistoryThunks';
import YouTube from 'react-youtube';
import YoutubeModal from '../../components/UI/YoutubeModal';

const Tracks = () => {
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const tracks = useAppSelector(selectTracks);
  const fetchAllTracksLoading = useAppSelector(selectFetchAllTracksLoading);
  const [showYoutubeModal, setShowYoutubeModal] = useState(false);
  const [linkYoutube, setLinkYoutube] = useState('');

  const cancelYoutubeModal = () => setShowYoutubeModal(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchTracks(id));
    }
  }, [dispatch]);

  let artistName = null;

  if (tracks.length > 0) {
    artistName = tracks[0].album.artist.name
  }

  const playTrack = async (id: string, link?: string) => {
    await dispatch(addTrackToHistory(id));

    if (link) {
      setShowYoutubeModal(true);
      setLinkYoutube(link);
    }
  }

  const opts = {
    height: '200',
    width: '400',
    playerVars: {
      autoplay: 0,
    },
  };


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
            <button onClick={() => playTrack(track._id, track.linkToYoutube)}>Play</button>
          </div>
        ))}
      </>
    )
  }

  return (
    <div>
      <h1>{artistName}</h1>
      {info}
      <YoutubeModal show={showYoutubeModal} title="Расширенный фильтр" onClose={cancelYoutubeModal}>
        <div className="modal-body">
          <YouTube videoId={linkYoutube} opts={opts}/>
        </div>
        <div className="modal-footer">
          <button className="btn btn-danger" onClick={cancelYoutubeModal}>Cancel</button>
        </div>
      </YoutubeModal>
    </div>
  );
};

export default Tracks;