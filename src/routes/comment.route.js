const express = require("express");
const { celebrate, Joi } = require("celebrate");

const {
  getComments,
  createComment,
  getCommentsByEpisodeId
} = require("../controllers/comment.controller");


const router = express.Router();

router.get('/', getComments)

router.post("/:episode_id", celebrate({
    body: Joi.object({
        text: Joi.string().max(500).required()
    }),
}), createComment);


router.get("/episode/:episode_id", getCommentsByEpisodeId);

module.exports = router;