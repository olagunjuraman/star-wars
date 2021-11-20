
 // import models
const Comment = require('../models/comment.model')

// import services
const { create, getComments } = require("../services/comment.service");
const { getMovie } = require('../services/movie.service');


const asyncHandler = require('./../middlewares/async');



exports.getComments = asyncHandler(async(req, res)=>{
    const result = await getComments();
    res.status(200).json({
      result,
    });
})

exports.createComment = asyncHandler (async (req, res) => {
    const {episode_id }= req.params
   const episode =  await  getMovie(episode_id)
   if(!episode){
    res.status(404).json({
        success: false,
        data: `The episode with the ${episode_id} was not found`
    })
}
    const data = {
      user_ip_address: req.ip,
      ...req.body,
      episode_id
    };

    const result = await create(data);
    res.status(200).json({
      result,
    });
    return;

});

exports.getCommentsByEpisodeId = asyncHandler (async (req, res) => {

    const query = {
      episode_id: req.params.episode_id,
    };
    const result = await getComments(query);
    res.status(200).json({
      result,
    });
    return;
});

