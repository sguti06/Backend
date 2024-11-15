// 1. Importar las dependencias y los modulos

import login from "../services/loginService.js";
import express from "express";

// 2. configurar nuestro router de express
const loginRouter = express.Router();

// 3. crear la ruta -> crear un inicio de sesion
// GET -> MOSTRAR -> LEER -> OBTENER
// POST -> CREAR
// PUT -> ACTUALIZAR
// DELETE -> ELIMINAR

loginRouter.post("/", login);

export default loginRouter;
