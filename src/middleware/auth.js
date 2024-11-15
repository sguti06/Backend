// 1. importar dependencias y modulos
import { verifyToken } from "../lib/jwt.js";

// 2. crearnos el MIDDLEWARE que nos permita usar la funcion para verificar el token
//      2.1 Verificar que existe un token
//      2.2 Verificar que el token sea permitido
//      2.3 Validar el rol -> osea verificar los permisos

function auth(requiredRole) {

}

// 3. Exportarlo
export default auth;