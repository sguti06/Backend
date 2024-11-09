// En este archivo, estare haciendo toda la  logica necesaria para gestionar los inicios de sesion
// ES MUY PROBABLE QUE LA LOGICA DE ESTE ARCHIVO CAMBIE DEPENDIENDO DE CADA PROYECTO/TRABAJO


// 1. Importar las dependencias y modulos
// necesitamos el modelo para poder ir a la base de datos y verificar el correo y contraseña
import { userModel } from "../models/users.model.js";
// importar la funcion que nos creamos para generar tokens
import { generateToken } from "../lib/jwt.js";
// Para poder comparar la contraseña que ingresamos con la encriptada, necesito la dependencia bcrypt
import bcrypt from "bcryptjs";


// 2. Nos creamos una funcion para gestionar el inicio de sesion

const login = async (request, response)=>{

    // Tener muy en cuenta el manejo de errores con el "try""catch"

    // Cuando iniciemos sesion setisfactoriamente, se deberia de generar el token
    try {

        // VALIDACION 1: CORREO ............................................
        const {emailLogin, passwordLogin} = request.body;

        // 1. buscar si el emailLogin si existe en la base de datos
        // No devuelve el usuario y toda su informacion y me lo guarda en las variables
        const userFound = await userModel.findOne({
            email: emailLogin
        });

        // Aca indicaremos que pasaria si no se logra encontrar el "emailLogin" en la base de datos
        if(!userFound){
            return response.status(404).json({mensaje: "Usuario no encontrado, por favor registrate"})
        }


        // VALIDACION 2: CONTRASEÑA.....................................................................................................................
        // Comparar passwordLogin con la contraseña almacenada en la base de datos
        // true or false
        // a ".compare" le tengo que ingresar 2 parametros -> El primero, passwordLogin, y el segundo, la contraseña almacenada en la base de datos
        const isValidPassword = await bcrypt.compare(passwordLogin, userFound.password);

        if(!isValidPassword){
            // error 401 = no autorizado
            return response.status(401).json({mensaje: "Contraseña incorrecta"})
        }

        // VERIFICAR PERMISOS...................................................................................................
        // aca hacemos este "const", para que todos mis usuarios tengan esta misma info en su TOKEN
        const payload = {
            id: userFound._id,
            name: userFound.fullName,
        }

         /*
            payload si es cliente
            {
                id: 6452135145748,
                name: pepito
            }

        */

        // Pero si es administrados, enviar ese ron en el payLoad
        if(userFound.role === "admin"){
            // de esta manera, le agregamos la propiedad "isAdmin" = true, al payload que escribimos anteriormente
            payload.isAdmin = true;
        }

        /*
            payload si es administradores
            {
                id: 6452135145749,
                name: pepitoAdmin,
                isAdmin = true
            }

        */
    

        // GENERAR EL TOKEN........................................................................................
        // pasamos la info del usuario si es cliente o admin, en el payload
        const token = await generateToken(payload);

        // si TODO salio bien, las credenciales correctas y se genero el Token...
        return response.status(200).json({
            mensaje: "Inicio de sesion exitoso",
            tokenGenerado: token // esto es una mala practica, por lo que solo lo estamos haciendo para probar
        });




    } catch (error) {

        // cuando no se puedo iniciar sesion por algun error y no se genera token
        return response.status(400).json({
            mensaje: "Hubo un error al iniciar sesion",
            error: error.menssage || error
        });
    }

}