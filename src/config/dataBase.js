// EN ESTE ARCHIVO, ESCRIBIMOS EL CODIGO PARA LA CONEXION CON LA BASE DE DATOS

// 1. importar las dependencias que se necesitan
import mongoose from "mongoose";

// 2. Creamos una función para conectar la base de datos
// FUNCIÓN ASINCRONICA -> Se usa cuando necesitamos esperar una respuesta

export async function connectionMongo(){
    //  debemos controlar los errores -> boque try - catch 
    // try -> gestiona cuando la respuesta es positiva
    // catch -> atrapa los errores

    try{
        // conectar base de datos
        await mongoose.connect(process.env.DB_URL,{dbName: "actividadClase"});
        console.log("Conexión exitosa con la base de datos");
    }catch(error){
        console.error("Error de conexión: " + error)
    }
}