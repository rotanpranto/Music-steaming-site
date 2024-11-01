import React from 'react';
import { useState, useEffect } from 'react';
import { useAudioContext } from '../../hooks/useAudioContext';
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import axios from 'axios';
import { BiHeart } from 'react-icons/bi';
import './Playlist.css'; // Import the CSS file for the component
import { BsFillHeartFill, BsHeart } from 'react-icons/bs';

function Playlist() {
  const [playlist, setPlaylist] = useState([]);
  const { song, dispatch } = useAudioContext();
  const { playlistId } = useParams();
  const { user } = useAuthContext();

  const updateLike = async (trackId, userId) => {
    try {
      await axios.patch(`/api/tracks/liked/${trackId}`, { userId });
    } catch (error) {
      console.error(error);
    }
  };

  // Get the song's info of the album
  const fetchSong = (playlistId) => {
    axios
      .get(`http://127.0.0.1:4000/api/playlist/${playlistId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        console.log('-------------------------');
        console.log(res.data);
        console.log('-------------------------');
        setPlaylist(res.data);
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  };

  useEffect(() => {
    console.log(playlistId);
    if (user) {
      fetchSong(playlistId);
    }
  }, [user]);

  return (
    <div className="playlist-container">
      {playlist && playlist.songs && (
        <div>
          <h1 className="name">{playlist.name}</h1>
          {playlist.songs.map((track, index) => (
            <div
              className="track" // Apply the 'track' class for styling
            >
              <img src={track.album_id.albumImg} alt="" />
              <div className='track-info'>
                <h4 onClick={() =>
                dispatch({
                  type: 'SET_AUDIO',
                  payload: {
                    song: track.songUrl,
                    name: track.name,
                    album: track.album_id.name,
                    album_id: track.album_id._id,
                    albumImg: track.album_id.albumImg,
                  },
                })
              }
              >{track.name}</h4>
              <p>{track.album_id.name}</p>
                <div className="track-duration">
                  <div>
                    {(track.duration / 60).toFixed(0)}mins{' '}
                    {(((track.duration / 60).toFixed(0) - track.duration / 60) * 60).toFixed(0)}
                    s
                  </div>
                  {user && track.likes.includes(user.userId) ? (
                        <BsFillHeartFill
                          size={20}
                          className="button"
                          onClick={() => updateLike(track._id, user.userId)}
                      />
                      ) : (
                        <BsHeart
                          size={20}
                          className="button"
                          onClick={() => updateLike(track._id, user.userId)}
                        />
                      )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Playlist;
