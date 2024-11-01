const mongoose = require('mongoose')

const Schema = mongoose.Schema

const trackSchema = new Schema({
  name: String,
  album_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Album'
  },
  artist_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artist'
  },
  trendingCount: {
    type: Number,
    default: 0
  },
  duration: {
    type: Number,
    required: true
  },
  songUrl: {
    type: String,
    required: true
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, { timestamps: true })

module.exports = mongoose.model('Track', trackSchema)