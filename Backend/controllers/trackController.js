const Track = require('../models/trackModel')
const mongoose = require('mongoose')
const axios = require('axios');

// get all Tracks
const getTracks = async (req, res) => {
  const tracks = await Track.find({}).populate('album_id', 'name albumImg').populate('artist_id', 'name').sort({createdAt: -1})

  res.status(200).json(tracks)
}

const getRecomTracks = async (req, res) => {
  const { id } = req.params;

  try {
    const likedSongs = await Track.find({ likes: id });

    let data;
    if (likedSongs.length === 0) {
      const mostTrendingSong = await Track.aggregate([
        { $sort: { trendingCount: -1 } },
        { $limit: 1 }
      ]);

      data = {
        song: mostTrendingSong[0].name  // Assuming mostTrendingSong is an array
      };
    } else {
      const randomIndex = Math.floor(Math.random() * likedSongs.length);
      const randomLikedSong = likedSongs[randomIndex];

      data = {
        song: randomLikedSong.name
      };
    }

    // Send data to the Flask API
    axios
      .post('http://localhost:5000/api', data)
      .then(response => {
        const songs = response.data;
        res.status(200).json(songs);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred' });
  }
};



// get a single Track
const getTrack = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such Track'})
  }

  const track = await Track.findById(id).populate('album_id', 'name albumImg').populate('artist_id', 'name')

  if (!track) {
    return res.status(404).json({error: 'No such Track'})
  }

  res.status(200).json(track)
}

// get Tracks of an album
const getTrackOfAlbum = async (req, res) => {
  const { id } = req.params

  const tracks = await Track.find({ album_id: id }).populate('album_id', 'name albumImg duration').populate('artist_id', 'name')

  res.status(200).json(tracks)
}

// create a new Track
const createTrack = async (req, res) => {
  const {name, duration, album_id, artist_id, songUrl} = req.body

  // add to the database
  try {
    const track = await Track.create({ name, duration, album_id, artist_id, songUrl})
    res.status(200).json(track)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete a Track
const deleteTrack = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such Track'})
  }

  const track = await Track.findOneAndDelete({_id: id})

  if(!track) {
    return res.status(400).json({error: 'No such Track'})
  }

  res.status(200).json(track)
}

// update a Track
const updateTrack = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such Track'})
  }

  const track = await Track.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!track) {
    return res.status(400).json({error: 'No such Track'})
  }

  res.status(200).json(track)
}

const updatePopularity = async (req, res) => {
  const {id} = req.params
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such Track'})
  }

  Track.findByIdAndUpdate(id, { $inc: { trendingCount: 1 } }, { new: true })
  .then((updatedSong) => {
    res.json("Trending incremented");
  })
  .catch((error) => {
    res.json(error)
  });

}

const updateLike = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  try {
    const track = await Track.findById(id);

    if (!track) {
      throw new Error('Track not found');
    }

    // Check if the user has already liked the track
    const isLiked = track.likes.includes(userId);

    if (isLiked) {
      // User has already liked the track, so remove the like
      track.likes.pull(userId);
    } else {
      // User has not liked the track, so add the like
      track.likes.push(userId);
    }

    // Save the updated track
    await track.save();

    return track;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getTracks,
  getTrackOfAlbum,
  getTrack,
  createTrack,
  deleteTrack,
  updateTrack,
  updatePopularity,
  updateLike,
  getRecomTracks
}