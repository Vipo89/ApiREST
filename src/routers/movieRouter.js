// Estas dos lineas siempre
const express = require("express");
const router = express.Router();

const { getAllMovies, getMovieById, insertNewMovie, editMovieById, searchMovieByName, sentCommentToMovie, removeMovieComment } = require("../controllers/movieController");
const { verifyToken } = require("../middlewares/auth");

// Aqui las llamadas a las rutas que creemos usando su controlador.
router.get("/", getAllMovies)

//Función para recoger película por ID
router.get("/:idMovie",getMovieById)

//Ruta para meter una nueva película
router.post("/", insertNewMovie);

//Ruta para buscar un usuario por su nombre
router.get("/searchMovie/:movieName",searchMovieByName)

// Ruta para editar un usuario
router.patch("/edit/:idMovie", editMovieById)

//Aquí peticiones que interpeto quie necesitan de autentificación
router.post("/comments/:idMovie",verifyToken,sentCommentToMovie)


router.delete("/:idMovie/comments/:idComment",verifyToken,removeMovieComment)

// Esta linea siempre
module.exports = router

