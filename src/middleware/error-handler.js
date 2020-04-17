module.exports = (error, req, res, next) => {
  if (req.headersSent) {
    return next(error);
  }

  console.log(error);
  return res.status(error.status || 500).send(
    JSON.stringify({
      error: { type: error.type, message: error.message, status: error.status },
    })
  );
};
