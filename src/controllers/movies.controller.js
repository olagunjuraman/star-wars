const Sequelize = require('sequelize');
const {getAllMovies, getMovie, getMovieCharacters} = require("../services/movie.service");

const asyncHandler = require('./../middlewares/async');


exports.getMovies = asyncHandler(async(req, res) => {
  const movies =   await getAllMovies();
   res.status(200).json(movies)
})


exports.getMovie = asyncHandler(async (req, res) => {
    const episodeId = req.params.episode_id;
    const result = await getMovie(episodeId);
    res.status(200).json({
      result,
    });
    return;

});


exports.getMovieCharacters = asyncHandler(async (req, res) => {
    const episodeId = req.params.episode_id;
    const sortBy = req.query.sort;
    const order = req.query.order;
    const filter = req.query.filter;

    const result = await getMovieCharacters(episodeId, sortBy, order, filter);

    res.status(200).json({
      result,
    });

});



