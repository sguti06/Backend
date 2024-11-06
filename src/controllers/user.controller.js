// ACA VA LA LOGICA DE LOS CONTROLADORES PARA LAS PETICIONES HTTP PARA LOS USUARIOS
// Nos estaremos centrando en las peticiones Post y Get

// 1. Importar las dependencias y los modulos que se necesiten
import { userModel } from "../models/users.model.js";
// Importar las dependencias de encriptacion
import bcrypt from "bcryptjs"


// 2. Crear nuestras funciones asincontras para cada peticion
// Peticion POST
// function nombreFuncion(){}
// let nombreFuncion2 = ()=>{}

export const createUser = async(req, res)=>{
    // manejo de errores -> atrapar lo que pueda salir mal
    try {

        // Deestructuracion -> nos va a permitir acceder a cada una de las variables suministradas por el usuario en el req.body
        const {fullName, email, password, role} = req.body;

        // password = sancocho;

        // vamos a encriptar la contraseña
        // .hash -> metodo para encriptar contraseña
        // 2 parametros: 1. contraseña a encriptar
        //               2. # que determina que tan segura es la contraseña encriptada, normalmente entre 8-10 es lo recomendado
        const codedPassword = await bcrypt.hash(password, 10);

        const newUser = await userModel.create({
            fullName,
            email,
            password : codedPassword,
            role
        });

        // el codigo 201 significa especificamente que el codigo se creo correctamente
        return res.status(201).json({
            mensaje: "Usuario creado correctamente",
            datos: newUser
        });


    } catch (error) { 
        // tambien se le puede poner (e), lo que pasa es que cambia el nombre, por lo que no hay problema alguno
        return req.status(400).json({
            mensaje: "Ocurrio un error al crear un usuario",
            problema: error || error.message
        });
    }
};

// Peticion Get -> Mostrar todos los usuarios
export const showUser = async()=>{
    // manejo de errores -> atrapar lo que pueda salir mal
    try {

    } catch (error) {
        return req.status(400).json({
            mensaje: "Ocurrio un error al mostrar el usuario",
            problema: error || error.message
        });
    }
};