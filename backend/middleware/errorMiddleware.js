const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
}

const errorHandler = (err, req, res, next) => {
  const { status = 500, message = 'Something went wrong' } = err;
  res.status(status).json({message});
}

module.exports = { notFound, errorHandler }