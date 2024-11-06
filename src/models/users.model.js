// 1. importar las depencias

import mongoose from "mongoose";


// 2. crearnos el esquema de datos
const userSchema = new mongoose.Schema({
    fullName: {type: String, required:true},
    email: {type: String, required:true, unique:true},
    password: {type: String, required:true},
    role: {type: String, default: "cliente"}
});

// 3. Definir nuestro modelo

export const userModel = mongoose.model("user", userSchema);