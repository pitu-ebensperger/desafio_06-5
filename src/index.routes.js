import express from "express";
import { getJoyas, getJoyasHATEOAS, getJoyasPorFiltros } from "./consultas.js";
import validateQuery from "../middlewares/validateQueryMiddleware.js";

const router = express.Router();

router.get("/joyas", validateQuery, async (req, res, next) => {
  try {
    const joyas = await getJoyas(req.query);
    res.json(getJoyasHATEOAS(joyas));
  } catch (error) {
    next(error);
  }
});

router.get("/joyas/filtros", async (req, res, next) => {
  try {
    const joyas = await getJoyasPorFiltros(req.query);
    res.json(joyas);
  } catch (error) {
    next(error);
  }
});

router.use((req, res) => {
  res.status(404).send("Esta ruta no existe");
});

export default router;
