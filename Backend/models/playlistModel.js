const mongoose = require('mongoose')

const Schema = mongoose.Schema

const playlistSchema = new Schema({
    name: String,
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    songs: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Track'
    }]
}, { timestamps: true })

module.exports = mongoose.model('Playlist', playlistSchema)