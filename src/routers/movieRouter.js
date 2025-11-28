// Estas dos lineas siempre
const express = require("express");
const { getAllMovies, getMovieById, insertNewMovie, deleteMovieById, editMovieById, searchMovieByTitle, setCommentToMovie, removeCommentToMovie } = require("../controllers/movieController");
const { verifyToken } = require("../middlewares/auth");
const router = express.Router();

// Aqui las llamadas a las rutas que creemos usando su controlador.
router.get("/", getAllMovies)
router.get("/:idMovie",getMovieById)
router.get("/searchTitle/:movieTitle", searchMovieByTitle)
router.post("/",insertNewMovie)
router.delete("/delete/:idMovie", deleteMovieById)
router.patch("/edit/:idMovie", editMovieById)

// Aqui peticiones que interpreto que necesitan de autentificacion
router.post("/comments/:idMovie", verifyToken, setCommentToMovie)
router.delete("/:idMovie/comments/:idComment", verifyToken, removeCommentToMovie)

// Esta linea siempre
module.exports = router