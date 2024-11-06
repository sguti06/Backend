// ESTE ARCHIVO ES PARA DEFINIR LA ESTRUCTURA DE LOS DATOS QUE SE VAN A GUARDAR EN LA BASE DE DATOS

// 1. Importamos las depencia
import mongoose from "mongoose";


// 2. plantilla de los datos se define como SCHEMA -> esquema de datos que vamos a solicitar para guardar en la base de datos

const productSchema = new mongoose.Schema({
    //este nombre lo eligen usted, son caracteristicas de la info que quiere guardar
    image:{type: String, required: true}, 
    name: {type: String, required: true},
    category:{type:String, required: false},
    price: {type: Number, required: true},
    stock: {type: Number, required: true},
    isAvailable: {type: Boolean} //true o false -> buleano
});

// 3. Decirle a la base de datos que se cree una colección con el esquema anterior
//el primer parámetro, es el nombre de la colección
//el segundo parámetro, es la estructura de datos
export const productModel = mongoose.model("product", productSchema);