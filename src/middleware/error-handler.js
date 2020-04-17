module.exports = (error, req, res, next) => {
  if (req.headersSent) {
    return next(error);
  }

  return res.status(error.status || 500).send(
    JSON.stringify({
      error: { name: error.name, message: error.message, status: error.status },
    })
  );
};
