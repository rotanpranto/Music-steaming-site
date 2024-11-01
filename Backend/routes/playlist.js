const express = require('express')
const {
    getPlaylist,
    getAllPlaylistTracks,
    addToPlaylist,
    addPlaylist,
} = require('../controllers/playlistController')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all tracks routes
router.use(requireAuth)

// GET all Tracks
router.get('/getPlaylist', getPlaylist)

// GET all Tracks
router.get('/:id', getAllPlaylistTracks)

// // GET a single Track
router.post('/addToPlaylist', addToPlaylist)

// GET a all Track from an Album
router.post('/addPlaylist', addPlaylist)

module.exports = router