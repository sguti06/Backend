// 1. importar controladores y dependencias

import { createUser, showUser } from "../controllers/user.controller.js";
import express from "express";


// 2. configurar el router
export const usersRouter = express.Router();


// 3. Crearme las rutas

// Ruta para el POST
usersRouter.post("/crear", createUser);

// Ruta para el GET
usersRouter.get("/obtener", showUser);