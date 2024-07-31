const router = require("express").Router();
const movieController = require('../../controllers/movieController');
const authMiddleware = require('../../middlewares/authMiddleware');
const multer = require('../../configs/multer');

//movie routes
router.post('/add_movie', multer.single('image'), authMiddleware.verifyAuth, movieController.addMovie);
router.patch('/update_movie/:id', multer.single('image'), authMiddleware.verifyAuth, movieController.updateMovie);
router.get('/get_movies', authMiddleware.verifyAuth, movieController.getMovies);

module.exports = router;