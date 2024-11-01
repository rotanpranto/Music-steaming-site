const express = require('express')
const {
  getTracks,
  getTrackOfAlbum, 
  getTrack, 
  createTrack, 
  deleteTrack, 
  updateTrack,
  updatePopularity,
  updateLike,
  getRecomTracks
} = require('../controllers/trackController')

const router = express.Router()

// GET all Tracks
router.get('/', getTracks)

// GET a single Track
router.get('/:id', getTrack)

// GET a all Track from an Album
router.get('/album/:id', getTrackOfAlbum)

// POST a new Track
router.post('/', createTrack)

router.patch("/trend/:id", updatePopularity)

router.patch("/liked/:id", updateLike)

// DELETE a Track
router.delete('/:id', deleteTrack)

// UPDATE a Track
router.patch('/:id', updateTrack)

router.get('/recommand/:id', getRecomTracks)

module.exports = router