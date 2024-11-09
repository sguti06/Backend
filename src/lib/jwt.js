// ACA VAMOS A CONFIGURAR LOS METODOS NECESARIOS PARA GENERAR Y VERIFICAR NUESTRO TOKEN DE AUTENTICACION

// 1. INSTALAR LA LIBRERIA -> npm i jsonwebtoken
// 2. crearnos una clave secreta


// -----------------------------------------------------------------------------

// 3. Importar modulos y dependencias que necesitamos
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// 4. configurar el uso de la clave secreta creada en el archivo .env
const key = process.env.SECRET_KEY;

// 5. crear las funciones para generar y verificar el token
export function generateToken(payload) {
    // nos estamos creando una funcion que promete devolver una respuesta despues de cierto tiempo
    // Estamos utilizando una funcion que se llama "callback" -> ()=>{} -> la cual devuelve algo

    return new Promise((resolve, reject)=>{
        jwt.sign(payload, key, {expiresIn:"1h"}, (error, token)=>{

            if(error){
                // si sale mal, que me responda con un error
              reject(new Error("Error generating JWT" + error.message));
            }else{
                // si sale bien, que me responda con el Token
                resolve(token);
            }

        });
    });
}

// funcion para verificar que el token sea el generado por nuestro servidor y no fue alterado
// El token corresponde al codigo del token que queremos verificar
export const verifyToken = (token)=>{

    // los constructores se escriben de la siguiente manrea = "new" + el constructor (con la primera letra en mayusculas)
    return new Promise ((resolve, reject)=>{
        jwt.verify(token, key, (error, decoded)=>{

            if(error){
                reject(new Error("Error verifying JWT" + error.message));
            }else{
                resolve(decoded);
            }
        });
    });
}

