import axios from 'axios'
import {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { useAudioContext } from '../../hooks/useAudioContext';
import './Album.css'
import { useAuthContext } from '../../hooks/useAuthContext';
import { BsFillHeartFill, BsHeart } from 'react-icons/bs';

function Album() {
    const [tracks, setTracks] = useState([])
    const [album, setAlbum] = useState([])
    const {song, dispatch} = useAudioContext();
    
    const {albumId} = useParams()
    
    const {user} = useAuthContext()

    const fetchSong = () => {
      axios
        .get(`http://127.0.0.1:4000/api/tracks/album/${albumId}`)
        .then((res) => {
          setTracks(res.data);
          setAlbum(res.data[0].album_id);
        })
        .catch((error) => {
          console.error(error);
        });
    };
  
    useEffect(() => {
      fetchSong();
    }, [albumId]);

    useEffect(() => {

    }, [tracks]);
  
    const updateLike = async (trackId, userId) => {
      try {
        await axios.patch(`/api/tracks/liked/${trackId}`, { userId });
        // Update the like status in the tracks state
        const updatedTracks = tracks.map((track) => {
          if (track._id === trackId) {
            if (track.likes.includes(userId)) {
              track.likes = track.likes.filter((likeId) => likeId !== userId);
            } else {
              track.likes.push(userId);
            }
          }
          return track;
        });
        setTracks(updatedTracks);
      } catch (error) {
        console.error(error);
      }
    };
  
    return (
      <div>
        <div className='Album'>
          {tracks ? (
            <div>
              <h1>{album.name}</h1>
              <p>
                {(album.duration / 60).toFixed(0)}mins{' '}
                {(((album.duration / 60).toFixed(0) - album.duration / 60) * 60).toFixed(0)}sec
              </p>
              {tracks.map((track, index) => (
                <div className="track" key={track._id}>
                  <img
                    src={album.albumImg}
                    onClick={() =>
                      dispatch({
                        type: 'SET_AUDIO',
                        payload: {
                          song: track.songUrl,
                          name: track.name,
                          trackId: track._id,
                          album: track.album_id.name,
                          album_id: track.album_id._id,
                          albumImg: track.album_id.albumImg,
                        },
                      })
                    }
                  />
                  <div>
                    <p
                      onClick={() =>
                        dispatch({
                          type: 'SET_AUDIO',
                          payload: {
                            song: track.songUrl,
                            name: track.name,
                            trackId: track._id,
                            album: track.album_id.name,
                            album_id: track.album_id._id,
                            albumImg: track.album_id.albumImg,
                          },
                        })
                      }
                    >
                      {track.name}
                    </p>
                    <div className="track-duration">
                      <div>
                        {(track.duration / 60).toFixed(0)}mins{' '}
                        {(((track.duration / 60).toFixed(0) - track.duration / 60) * 60).toFixed(
                          0
                        )}
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
          ) : null}
        </div>
      </div>
    );
  }
  
  export default Album;