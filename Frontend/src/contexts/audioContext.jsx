import axios from "axios";
import { createContext, useReducer } from "react";

export const audioContext = createContext()

const incTrendCount = (songId) => {
    // Make an API call to increment the trending count
    axios.patch(`http://127.0.0.1:4000/api/tracks/trend/${songId}`)
    .then((response) => {
      console.log(response.data); // "Trending incremented"
    })
    .catch((error) => {
      console.error(error);
    });
}

export const audioReducer = (state, action) => {
    switch (action.type) {
        case 'SET_AUDIO':
            incTrendCount(action.payload.trackId)
            return {
                song: [action.payload]
            }
        case 'QUEUE_AUDIO':
            return {
                song: [...state.song, action.payload]
            }
        default:
            return state
    }
}

export const AudioContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(audioReducer, {
        song: null,
        name: null,
        album: null,
        album_id: null,
        albumImg: null,
        trackId: null
    })

    return(
        <audioContext.Provider value={{...state,dispatch}}>
            {children}
        </audioContext.Provider>
    )
}
