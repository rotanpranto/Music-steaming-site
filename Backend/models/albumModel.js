const mongoose = require('mongoose')

const Schema = mongoose.Schema

const albumSchema = new Schema({
  name: String,
  albumImg: String,
  artist_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artist'
  }
}, { timestamps: true })

module.exports = mongoose.model('Album', albumSchema)