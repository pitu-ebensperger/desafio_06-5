const reportMiddleware = async (req, res, next) => {
  const parametros = req.parametros
  const url = req.url
  console.log(`[${new Date()}] Consulta a la ruta: ${url} con los parámetros:
  `, parametros)
  next()
};

export default reportMiddleware;
