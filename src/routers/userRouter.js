// Estas dos lineas siempre
const express = require("express");
const router = express.Router();

// Aqui las llamadas a las rutas que creemos usando su controlador.
const {
  getAllUsers,
  getUserById,
  insertNewUser,
  deleteUserById,
  editUserById,
  addFavoriteMovie,
  removeFavoriteMovie,
  searchUserByName
} = require("../controllers/userController");
const { verifyToken, verifyAdmin } = require("../middlewares/auth");



// Ruta para obtener todos los usuarios
router.get("/",verifyToken, verifyAdmin,getAllUsers);
// Ruta para obtener usuario por id
router.get("/:idUser", getUserById);
// Ruta para crear usuario
router.post("/", insertNewUser);
// Ruta para editar un usuario
router.patch("/edit/:idUser", editUserById)
// Ruta para eliminar un usuario
router.delete("/delete/:idUser", deleteUserById);

//Ruta para buscar un usuario por su nombre
router.get("/searchName/:userName",searchUserByName)

//Ruta para añadir una pelicula favorita
router.patch("/:idUser/favorites/:idMovie",addFavoriteMovie)
//Ruta para coger pelicula por ids
router.delete("/:idUser/favorites/:idMovie",removeFavoriteMovie)

// Esta linea siempre.Exportamos el router
module.exports = router;
