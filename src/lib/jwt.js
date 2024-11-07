// ACA VAMOS A CONFIGURAR LOS METODOS NECESARIOS PARA GENERAR Y VERIFICAR NUESTRO TOKEN DE AUTENTICACION

// 1. INSTALAR LA LIBRERIA -> npm i jsonwebtoken
// 2. crearnos una clave secreta


// -----------------------------------------------------------------------------

// Importar modulos y dependencias que necesitamos
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const key = process.env.SECRET_KEY;