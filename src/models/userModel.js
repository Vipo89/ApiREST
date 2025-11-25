// Importamos mongoose
const mongoose = require("mongoose");
// Instanciamos la calse Schema de mongoose
const Schema = mongoose.Schema;

//Creamos el esquema con la clase anteriormente creada
const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "El nombre es obligatorio"],
        minlength: [3, "El nombre debe tener al menos 3 caracteres"],
        maxlength: 30
    },
    lastName: {
        type: String,
        required: [true, "El apellido es obligatorio"],
    },
    email: {
        type: String,
        required: [true, "El email es obligatorio"],
        unique: [true, "Ese email ya existe"],
        trim: true,
    },
    password: {
        type: String,
        required: [true, "La contraseña es obligatorio"]
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    favorites: {
        type: [mongoose.Schema.Types.ObjectId],
        ref:"Movie"
    }
});

/* Creamos la constante para exportarla y poder usarla
Se compone de :
Primer termino: Id que le damos apra podert usarla o referenciarla en otro modelo
Segundo termino: El esquema creado anteriormente
Tercer termino: El nombre de la colección que usará en la bbdd.
*/
const userModel = mongoose.model("User", userSchema, "users")

// Exportamos el modelo
module.exports = userModel;