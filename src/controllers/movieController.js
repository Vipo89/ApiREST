const movieModel = require("../models/movieModel");

const getAllMovies = async (req, res) => {
  try {
    const movies = await movieModel.find();
    if (movies.length === 0)
      return res.status(200).send("No se han encontrado peliculas");
    res.status(200).send({ status: "Success", data: movies });
  } catch (error) {
    res.status(500).send({ status: "Failed", message: error.message });
  }
};

const getMovieById = async (req, res) => {
  try {
    const { idMovie } = req.params;
    const movie = await movieModel.findById(idMovie);
    if (!movie) return res.status(200).send("No existe pelicula con ese id");
    res.status(200).send({ status: "Success", data: movie });
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};

const insertNewMovie = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      director,
      rating,
      posterURL,
      trailerURL,
      year,
    } = req.body;

    if (
      !title ||
      !description ||
      !category ||
      !director ||
      !rating ||
      !posterURL ||
      !trailerURL ||
      !year
    ) {
      return res
        .status(400)
        .send({ status: "Failed", message: "Falta algun campo obligatorio" });
    }

    const newMovie = {
      title,
      description,
      category,
      director,
      rating,
      posterURL,
      trailerURL,
      year,
    };
    const movie = await movieModel.create(newMovie);
    if (!movie) {
      return res.status(400).send({
        status: "Failed",
        message: "No se ha podido crear la pelicula",
      });
    }
    res.status(200).send({
      status: "Success",
      message: "La película se ha creado correctamente",
    });
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};

const deleteMovieById = async (req, res) => {
  try {
    const { idMovie } = req.params;
    const movie = await movieModel.findByIdAndDelete(idMovie);
    if (!movie) return res.status(200).send("No existe usuario con ese id");
    res
      .status(200)
      .send({ status: "Success", message: "Película eliminada correctamente" });
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};

const editMovieById = async (req, res) => {
  try {
    const { idMovie } = req.params;
    const newMovie = req.body;
    const updatedMovie = await movieModel.findByIdAndUpdate(idMovie, newMovie, {
      new: true,
      runValidators: true,
    });
    if (!updatedMovie)
      return res.status(200).send("No existe película con ese id");
    res.status(200).send({ status: "Success", data: updatedMovie });
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};

const searchMovieByTitle = async (req, res) => {
  try {
    const { movieTitle } = req.params;
    const movies = await movieModel.find({
      title: { $regex: movieTitle, $options: "i" },
    });
    if (movies.length === 0)
      return res.status(200).send("No se han encontrado películas");
    res.status(200).send({ status: "success", data: movies });
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};

const setCommentToMovie = async (req, res) => {
  try {
    const { idMovie } = req.params;
    const movie = await movieModel.findById(idMovie);
    if (!movie) return res.status(200).send("No existe pelicula con ese id");
    // Rescato el comentario que vendrá enviado en el body
    const { comment } = req.body;
    // Si he llegado aqui, si o si tiene que estar payload dentro del req, sino verifyToken hubiese fallado
    const idUser = req.payload._id;
    // Me construyo mi comentario tipo objeto como el que tengo en mi modelo (movieModel)
    const commentObject = {
      userId: idUser,
      comment: comment,
    };
    movie.comments.push(commentObject);
    movie.save();
    res.status(200).send({ status: "Success", data: movie });
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};

const removeCommentToMovie = async (req, res) => {
  try {
    const { idMovie, idComment  } = req.params;
    const movie = await movieModel.findById(idMovie);
    if (!movie) return res.status(200).send("No existe pelicula con ese id");

    // (!movie.comments.includes(idComment)) No funciona ya que compara un String contra un objeto, de forma que es false siempre
    // Vamos a comparar por la propia propiedad _id de cada comment y si se encuetra es que existe 
    const comment = movie.comments.id(idComment);    
    if (!comment) {
      return res.status(200).send("La pelicula no tiene ese comentario");
    }
    // Marcamos ese comentario apra eliminarse del array antes de guardar el movie
    comment.deleteOne();
    // Guardamos los cambios en la base de datos
    movie.save();
    res.status(200).send({ status: "Success", data: movie });
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};

module.exports = {
  getAllMovies,
  getMovieById,
  insertNewMovie,
  deleteMovieById,
  editMovieById,
  searchMovieByTitle,
  setCommentToMovie,
  removeCommentToMovie,
};
