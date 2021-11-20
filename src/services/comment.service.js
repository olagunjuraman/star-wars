const  Comment  = require("../models/comment.model");

const getComments = async (query = {}) => {
  const comments = await Comment.findAll({
    where: query,
    order: [["createdAt", "DESC"]],
  });

  return comments;
};

const getComment = async (query) => {
  const comment = await Comment.findOne({
    where: query,
  });

  return comment;
};

const getCommentCount = async (query) => {
  const count = await Comment.count({
    where: query,
    raw: true,
  });

  return count;
};


const create = async (data) => {
  const comment = await Comment.create(data);
  return comment;
};


module.exports = {
  getComments,
  getComment,
  getCommentCount,
  create
};
