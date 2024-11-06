// ESTE ARCHIVO NOS PERMITE CREAR LAS RUTAS PARA PODER HACER LAS PETICIONES GET, POST, PUSH y DELETE

// 1. IMPORTAR MIS CONTROLADORES
import { getProduct, postProduct, putProductById, deleteProductById } from "../controllers/products.controller.js";

import express from "express"; //express tambien nos ayuda a hacer las rutas para las peticiones


// 2. Configurar el router de express
export const productRouter = express.Router();

// 3. Crearme las rutas

// Ruta para la peticion GET -> leer, obtener, mostrar
    // 1. primero, se determina la ruta, luego le indico que debe hacer (indcar el controlador)
productRouter.get("/obtener", getProduct);

// Ruta para la peticion POST -> crear
productRouter.post("/crear", postProduct);

// Ruta para la peticion PUT -> actualiza la informacion
productRouter.put("/actualizar/:id", putProductById);

// Ruta para la peticion DELETE -> eliminar
productRouter.delete("/eliminar/:id", deleteProductById);