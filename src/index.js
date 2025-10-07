import app from "./app.js";
import { appConfig } from "../config/env.js";

const PORT = appConfig.port;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

