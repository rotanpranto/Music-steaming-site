const Album = require('../models/albumModel')
const mongoose = require('mongoose')

// get all Albums
const getAlbums = async (req, res) => {
  const album = await Album.find({}).populate('artist_id', 'name artistImg').sort({createdAt: -1})

  res.status(200).json(album)
}

// get a single Album
const getAlbum = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such Album'})
  }

  const album = await Album.findById(id)

  if (!album) {
    return res.status(404).json({error: 'No such Album'})
  }

  res.status(200).json(album)
}

// create a new Album
const createAlbum = async (req, res) => {
  const {name, albumImg, duration, artist_id} = req.body

  // add to the database
  try {
    const album = await Album.create({ name, albumImg, duration, artist_id })
    res.status(200).json(album)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete a Album
const deleteAlbum = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such Album'})
  }

  const album = await Album.findOneAndDelete({_id: id})

  if(!album) {
    return res.status(400).json({error: 'No such Album'})
  }

  res.status(200).json(album)
}

// update a Album
const updateAlbum = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such Album'})
  }

  const album = await Album.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!album) {
    return res.status(400).json({error: 'No such Album'})
  }

  res.status(200).json(album)
}

module.exports = {
  getAlbums,
  getAlbum,
  createAlbum,
  deleteAlbum,
  updateAlbum
}