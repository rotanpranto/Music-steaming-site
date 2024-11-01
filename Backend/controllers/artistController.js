const Artist = require('../models/artistModel')
const mongoose = require('mongoose')

// get all Artists
const getArtists = async (req, res) => {
  const artists = await Artist.find({}).sort({createdAt: -1})

  res.status(200).json(artists)
}

// get a single Artist
const getArtist = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such Artist'})
  }

  const artist = await Artist.findById(id)

  if (!artist) {
    return res.status(404).json({error: 'No such Artist'})
  }

  res.status(200).json(artist)
}

// create a new Artist
const createArtist = async (req, res) => {
  const {name, artistImg} = req.body

  // add to the database
  try {
    const artist = await Artist.create({ name, artistImg })
    res.status(200).json(artist)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete a Artist
const deleteArtist = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such Artist'})
  }

  const artist = await Artist.findOneAndDelete({_id: id})

  if(!artist) {
    return res.status(400).json({error: 'No such Artist'})
  }

  res.status(200).json(artist)
}

// update a Artist
const updateArtist = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such Artist'})
  }

  const artist = await Artist.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!artist) {
    return res.status(400).json({error: 'No such Artist'})
  }

  res.status(200).json(artist)
}

module.exports = {
  getArtists,
  getArtist,
  createArtist,
  deleteArtist,
  updateArtist
}