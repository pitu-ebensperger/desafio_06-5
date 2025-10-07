const errorHandler = async (err, req, res, next) => {
  const method = req.method
  const url = req.url
  console.error(`[${new Date()}] ${method} ${url}`, err);
  const status = err.statusCode || 500;
  res.status(status).json({
    error: err.message || "Error interno del servidor",
    path: req.url,
    code: err.code || "InternalServerError",
  });
};
export default errorHandler;