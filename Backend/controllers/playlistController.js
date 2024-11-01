const Playlist = require('../models/playlistModel')
const User = require('../models/userModel')
const mongoose = require('mongoose')

// get all playlist of a user
const getPlaylist = async (req, res) => {
  const {email} = req.headers

  try {
    const user = await User.findOne({ email }).populate('playlists');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// get all the tracks of a playlist of a user
const getAllPlaylistTracks = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such Playlist'})
  }

  const playlist = await Playlist.findById(id).populate(({
    path: 'songs',
    model: 'Track',
    populate: [{
        path: 'album_id',
        model: 'Album'
    }
   ]
}))

  if (!playlist) {
    return res.status(404).json({error: 'No such Album'})
  }

  res.status(200).json(playlist)
};

// add track to a playlist of a user
const addToPlaylist = async (req, res) =>{
  const {playlistId, trackId} = req.body

  Playlist.findById(playlistId)
  .then(async (playlist) => {
    if (!playlist) {
      console.log('Playlist not found');
      return;
    }

    // Update the playlist with the new song
    playlist.songs.push(trackId);
    try {
      await playlist.save();
      console.log('Song added to the playlist successfully!');
      console.log('Updated Playlist:', playlist);
    } catch (error) {
      console.error(error);
    }
  })
  .catch((error) => {
    console.error(error);
  });
}

// add playlist of a user
const addPlaylist = async (req, res) =>{
  const { email, name } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const playlist = new Playlist({ name, user_id: user._id });
    const savedPlaylist = await playlist.save();

    user.playlists.push(savedPlaylist._id);
    await user.save();

    res.status(200).json(savedPlaylist._id);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

module.exports = {
    getPlaylist,
    getAllPlaylistTracks,
    addToPlaylist,
    addPlaylist,
  }