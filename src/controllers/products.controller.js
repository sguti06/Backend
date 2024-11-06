// los CONTROLLERS/CONTROLADORES -> Gestionan la logica de las peticiones
// La logica para GET, POST, PUT, y DELETE (LEER, CREAR, ACTUALIZAR, ELIMINAR)
// 1. Importar el modelo de datos que manipularemos
import { request } from "express";
import { productModel } from "../models/product.model.js"
import { response } from "express";

// peticion POST -> para crear productos
// es una funcion flecha
export const postProduct = async (request, response) => {

    // LOGICA DE LA PETICION POST
    try{
        // para yo poder crear -> si o si necesito enviar información
        // La informacion la enviamos en el cuerpo de la peticion -> es decir, en el "body"
        const newProduct = await productModel.create(request.body); //asi se crean las colecciones en la base de datos
        return response.status(201).json({
            mensaje: "El producto se creo satisfactoriamente",
            datos: newProduct
        })

    } catch(error) {
        return response.status(400).json({
            mensaje: "Ocurrio un error al crear el producto",
            problem: error || error.message
        })
    }
}


// peticion GET -> para mostrar productos
export const getProduct = async (request, response) => {

    // LOGICA DE LA PETICION GET (IMPORTANTE -> MANEJO DE ERRORES)
    try {
        // método find() -> mostrarme todo lo que encuentra en la base de datos
        let products = await productModel.find();

        // podemos agregar validaciones 
        // Qué pasa si no hay nada almacenado en la base de datos
        if(products.length === 0){
            return response.status(200).json({
                mensaje: "No se encontraron productos en la base de datos"
            });
        }

        // Si sí tiene productos guardados,que me los muestre
        return response.status(200).json({
            mensaje: "Estos son todos los productos encontrados",
            datos: products
        });

      
    } catch (error) {
        return response.status(400).json({
            mensaje: "Ocurrió un error al buscar los productos",
            problem: error || error.message 
        });
    }

}


// petición PUT -> para actualizar productos
// actualizar un producto en particular -> actualizar por ID
export const putProductById = async (request, response) => {

    // LÓGICA DE LA PETICIÓN PUT
    try {
        let idforPut = request.params.id; //el parametro ID del producto que queremos actualizar
        let dataForUpdate = request.body; //pasarle la informacion actualizada

                      // 2. parametros, primero el ID y luego la info actualizada
        const productUpdate = await productModel.findByIdAndUpdate(idforPut, dataForUpdate);

        // validacion cuando el id no es correcto o no existe
        // !productUpdate -> negación de una variable -> no hay nada en esa variable -> falso
        if(!productUpdate){
            return response.status(400).json({
                mensaje: "Lo siento! No se encontro producto para actualizar"
            });
        }

        return response.status(200).json({
            mensaje: "Ocurrió un error al actualziar el producto",
            datos: productUpdate
        });

    } catch (error){
        return response.status(400).json({
            mensaje: "Ocurrió un error al actualizar el producto",
            problem: error || error.message 
        });
    }
}

// petición DELETE -> para eliminar productos
// eliminamos un producto en particular -> eliminar por ID
export const deleteProductById = async (request, response) => {

    // LÓGICA DE LA PETICIÓN DELETE
    try {
        let idForDelete = request.params.id;
        // Lo que se elimina no lo tenemos que guardar en variables
        // encuentreme el producto con ese ID y eliminalo
        await productModel.findByIdAndDelete(idForDelete)

        return response.status(200).json({
            mensaje: "Producto eliminado satisfactoriamente"
        });

    } catch (error) {
        return response.status(400).json({
            mensaje: "Ocurrió un error al eliminar el producto",
            problem: error || error.message 
        });
    }
}