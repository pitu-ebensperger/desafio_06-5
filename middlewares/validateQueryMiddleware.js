const validateQuery = (req, res, next) => {
  const { limit, page, order_by } = req.query;
  if (limit && (!/^[0-9]+$/.test(limit) || Number(limit) <= 0)) {
    return res.status(400).json({ error: 'limit debe ser un número positivo' });
  }
  if (page && (!/^[0-9]+$/.test(page) || Number(page) <= 0)) {
    return res.status(400).json({ error: 'page debe ser un número positivo' });
  }
  if (order_by && !/^[a-z_]+_(ASC|DESC)$/i.test(order_by)) {
    return res.status(400).json({ error: 'order_by inválido' });
  }
  next();
};

export default validateQuery;