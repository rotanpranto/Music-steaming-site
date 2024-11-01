import React, { useEffect, useState } from "react";
import "./Plane.css";
import { MdCreate } from "react-icons/md";
import PlaneForm from "./PlaneForm";
import { useAuthContext } from "../../hooks/useAuthContext";
import axios from "axios";

const Plane = ({ buttonRef, trackId }) => {
  const [showForm, setShowForm] = useState(false);
  const [playlists, setPlaylists] = useState();
  const {user} = useAuthContext();

  useEffect(() => {
    console.log(user.email)
    axios.get("http://127.0.0.1:4000/api/playlist/getPlaylist", {
      headers: {
        'Authorization': `Bearer ${user.token}`,
        email: user.email
      }
    })
    .then((res) => {
      console.log(res.data);
      setPlaylists(res.data.playlists);
    })
    .catch((error) => {
      console.error(error);
    });

  },[user, showForm])

  const handleButtonClick = () => {
    setShowForm(!showForm);
  };

  const handleAdd = (playlistId) => {
    console.log(playlistId)
    axios.post('http://127.0.0.1:4000/api/playlist/addToPlaylist', {
        email: user.email,
        playlistId: playlistId,
        trackId: trackId,
      }, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
  }

  return (
    <div className="plane" style={{ top: buttonRef?.current?.offsetTop, left: buttonRef?.current?.offsetLeft}}>
      <div>
        {playlists && playlists.map((playlist, index) => (
          <p key={index} className="playlists" onClick={(e) => handleAdd(playlist._id)}>{playlist.name}</p>
        ))}
      </div>
      <MdCreate onClick={handleButtonClick}/>
      {showForm && (
        <div  className="formpanel">
          <PlaneForm onAction={handleButtonClick} trackId={trackId}/>
        </div>
      )}
    </div>
  );
};

export default Plane;
