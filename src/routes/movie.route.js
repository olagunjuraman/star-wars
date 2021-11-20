const express = require("express");

const {
    getMovies,
    getMovie,
    getMovieCharacters
} = require("../controllers/movies.controller");

const router = express.Router();

router.get("/", getMovies);
router.get("/:episode_id", getMovie);
router.get("/:episode_id/characters", getMovieCharacters);


module.exports = router;
