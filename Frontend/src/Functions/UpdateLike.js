import axios from 'axios';

const UpdateLike = (trackId, userId) => {
    console.log(userId)
  axios
    .put(`/api/tracks/liked/${trackId}`, { userId })
    .then(response => {
        console.log("here")
      console.log(response.data);
      // Handle the response
    })
    .catch(error => {
      console.error(error);
      // Handle the error
    });
};

export default UpdateLike