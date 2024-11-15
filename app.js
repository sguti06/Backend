// El archivo app.js -> es el archivo de ejecucion de nuestro aplicativo web
// Aca voy a configurar nuestro servidor con EXPRESS y vamos a gestionar todo lo relacionado con la logica de negocio -> conexion a base de datos, peticiones, respuestas, etc...

// 1. IMPORTAR LAS DEPENDENCIAS Y MODULOS QUE NECESITAMOS
import express from "express"; //ECMAS 6
import dotenv from "dotenv"; //dependencia para manejar variables de entorno
import { connectionMongo } from "./src/config/dataBase.js";
import { productRouter } from "./src/routes/products.routes.js"; //importé mis rutas
import { usersRouter } from "./src/routes/user.routes.js";
import loginRouter from "./src/routes/login.routes.js";


// 2. CONFIGURAR EL USO DE NUESTRO SERVIDOR
const app = express(); 
dotenv.config(); //configurando para poder usar variables de entorno
connectionMongo();
const port = process.env.PORT//6000, 9000

// le indico las rutas que debe utilizar
app.use(express.json()); //para poder usar formato json -> crear y actualizar 
app.use("/productos", productRouter);
app.use("/usuarios", usersRouter);
app.use("/iniciarSesion", loginRouter);

// 3. EJECUTAR EL SERVIDOR EN NUESTRO COMPUTADOR
app.listen(port, ()=>{
    console.log("El servidor está ejecutándose correctamente, en el puerto ", port);
});