import axios from 'axios';
import {useState} from 'react'
import { useAuthContext } from '../../hooks/useAuthContext';

function PlaneForm({ onAction , trackId}) {
    const [name, setName] = useState('');
    const { user } = useAuthContext()
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Perform form submission logic here
      console.log('Submitted:', name);
      console.log(user.email)
      axios.post('http://127.0.0.1:4000/api/playlist/addPlaylist', {
        email: user.email,
        name: name
      }, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
        .then(function (response) {
          axios.post('http://127.0.0.1:4000/api/playlist/addToPlaylist', {
        email: user.email,
        playlistId: response.data,
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
        })
        .catch(function (error) {
          console.error(error);
        });
      
      // Reset form fields and hide form panel
      setName('');
      onAction();
    };
  
    return (
          <div>
            <form onSubmit={handleSubmit}>
              <label>
                Name:
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
              </label>
              <br />
              {name &&
              <button type="submit">Submit</button>}
              <button onClick={onAction}>Cancel</button>
            </form>
          </div>
    );
  };

export default PlaneForm