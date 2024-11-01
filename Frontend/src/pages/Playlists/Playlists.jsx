import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuthContext } from "../../hooks/useAuthContext";
import './Playlists.css'
import { Link } from "react-router-dom";

const Playlists = ( ) => {
  const [playlists, setPlaylists] = useState([]);
  const {user} = useAuthContext()

  useEffect(() => {
    axios
      .get("http://127.0.0.1:4000/api/playlist/getPlaylist", {
        headers: {
          Authorization: `Bearer ${user.token}`,
          email: user.email,
        },
      })
      .then((res) => {
        console.log(res.data);
        setPlaylists(res.data.playlists);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [user]);

  const handlePlaylistClick = (playlistId) => {
    
  };

  return (
    <div className="playlistContainer">
      <h1>Your Playlists:</h1>
      {playlists && playlists.map((playlist) => (
        <Link to={`/playlist/${playlist._id}`}>
          <div
            key={playlist._id}
            className="playlistItem"
            onClick={() => handlePlaylistClick(playlist._id)}
          >
            
            <p className="playlistName">{playlist.name}</p>
            
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Playlists;
