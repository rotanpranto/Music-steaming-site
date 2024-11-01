const express = require('express')
const {
  getAlbums, 
  getAlbum, 
  createAlbum, 
  deleteAlbum, 
  updateAlbum
} = require('../controllers/albumController')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all albums routes
router.use(requireAuth)

// GET all Albums
router.get('/', getAlbums)

// GET a single Album
router.get('/:id', getAlbum)

// POST a new Album
router.post('/', createAlbum)

// DELETE a Album
router.delete('/:id', deleteAlbum)

// UPDATE a Album
router.patch('/:id', updateAlbum)

module.exports = router