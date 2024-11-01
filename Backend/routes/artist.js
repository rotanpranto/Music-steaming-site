const express = require('express')
const {
  getArtists, 
  getArtist, 
  createArtist, 
  deleteArtist, 
  updateArtist
} = require('../controllers/artistController')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all artist routes
router.use(requireAuth)

// GET all Artists
router.get('/', getArtists)

// GET a single Artist
router.get('/:id', getArtist)

// POST a new Artist
router.post('/', createArtist)

// DELETE a Artist
router.delete('/:id', deleteArtist)

// UPDATE a Artist
router.patch('/:id', updateArtist)

module.exports = router