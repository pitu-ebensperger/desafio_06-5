import express from "express";
import cors from "cors";
import rutas from "./index.routes.js";
import reportMiddleware from "../middlewares/reportMiddleware.js";
import errorHandler from "../middlewares/errorHandler.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(reportMiddleware);

app.use("/", rutas);

app.use(errorHandler);

export default app;
