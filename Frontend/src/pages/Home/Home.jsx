import axios from 'axios';
import {useEffect, useState, useRef} from 'react';
import { Link } from 'react-router-dom';
import { useAudioContext } from '../../hooks/useAudioContext';
import { BiPlus } from 'react-icons/bi';
import './Home.css';
import { useAuthContext } from '../../hooks/useAuthContext';
import { MdQueue } from 'react-icons/md';
import Plane from '../Plane/Plane'

const Dashboard = () => {

  const [tracks, setTracks] = useState([]);
  const {song, dispatch} = useAudioContext();
  const {user} = useAuthContext()
  const [selectedindex, setSelectedindex] = useState(null);
  const buttonRefs = useRef([]);
  const [recommendedSongs, setRecommendedSongs] = useState([]);

  const handlePlaylist = (index) => {
    setSelectedindex(index === selectedindex ? null : index);
  };

  const fetchRecommendedSongs = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:4000/api/tracks/recommand/${user.userId}`, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      console.log(response.data);
      setRecommendedSongs(response.data.recommended_songs);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:4000/api/tracks", {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });
        if (user) {
          console.log(response.data);
          setTracks(response.data);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchTracks();
    fetchRecommendedSongs();
  }, [user]);


  return( 
    <div className="homeContainer">
      {tracks ?
        <div>
          <h1 className="tracks-heading">Trending</h1>
          <div className='tracksContainer'>
          {tracks.map((track,index) => {
            return (
              <div className="track" key={index}>
                <img src={track.album_id.albumImg} onClick={() => dispatch({type: 'SET_AUDIO', payload: {trackId: track._id, song: track.songUrl, name: track.name, album: track.album_id.name, album_id: track.album_id._id, albumImg: track.album_id.albumImg}})} className="track-image" />
                <div className="track-info-container">
                  <p className="track-name" onClick={() => dispatch({type: 'SET_AUDIO', payload: {trackId: track._id, song: track.songUrl, name: track.name, album: track.album_id.name, album_id: track.album_id._id, albumImg: track.album_id.albumImg}})}>{track.name}</p>
                  <Link to={`album/${track.album_id._id}`} className="track-image-container">
                    <p>{track.album_id.name}</p>
                  </Link>
                  <span>
                    <BiPlus className="add-track-icon" onClick={() => dispatch({type: 'QUEUE_AUDIO', payload: {trackId: track._id, song: track.songUrl, name: track.name, album: track.album_id.name, album_id: track.album_id._id, albumImg: track.album_id.albumImg}})}/>
                    <span className="app">
                      <MdQueue size={20} style={{margin: "0 0 0 5rem"}} onClick={() => handlePlaylist(index)} ref={(ref) => (buttonRefs.current[index] = ref)}/>
                      {index === selectedindex && <Plane selectedindex={index} trackId={track._id}/>}
                    </span>
                  </span>
                </div>
              </div>
            )
          })}
          </div>
          <h1 className="tracks-heading">Recommanded</h1>
              {recommendedSongs.length === 0 ? (
            <p>Loading recommended songs...</p>
          ) : (
            <ul>
              {recommendedSongs.map((song,index) => (
                <li key={index} style={{color: "tomato"}}>{song}</li>
              ))}
            </ul>
          )}
        </div>
          : null}
    </div>
  )
};

export default Dashboard;
