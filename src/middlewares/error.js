module.exports = function(error, req, res, next){
    let status = 500;
  let message = error.message;
  if (error) {
    status = error.statusCode || status;
  }
  if (error.error && error.error.isJoi) {
    status = 400;
    message = buildJoiResponse(error);
  }
  res.status(status).send({ success: false, message: message });
};


function buildJoiResponse(error) {
    return error.error.details.map((value) => {
      return {
        message: value.message,
        path: value.path,
      };
    });
  }