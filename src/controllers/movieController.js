const movieModel = require("../models/movieModel");

const getAllMovies = async (req, res) => {
  try {
    const movies = await movieModel.find();
    if (movies.length === 0) {
      return res.status(200).send("No hay películas para mostrar");
    }
    res.status(200).send({ status: "Success", data: movies });
  } catch (error) {
    res.status(500).send({ status: "Failed", message: error });
  }
};

const getMovieById = async (req, res) => {
  try {
    const { idMovie } = req.params;
    console.log(idMovie);
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

const editMovieById = async (req, res) => {
  try {
    const { idMovie } = req.params;
    const newMovie = req.body;
    const updatedMovie = await movieModel.findByIdAndUpdate(idMovie, newMovie, {
      new: true,
      runValidators: true,
    });
    if (!updatedMovie)
      return res.status(200).send("No existe pelicula con ese id");
    res.status(200).send({ status: "Success", data: updatedMovie });
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};


const searchMovieByName = async (req, res) => {
  try {
    const { movieName } = req.params;
    const movies = await movieModel.find({
      title: { $regex: movieName, $options: "i" },
    });
    if (movies.length === 0)
      return res.status(200).send("No se han encontrado películas");
    res.status(200).send({ status: "Success", data: movies });
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};

module.exports = { getAllMovies, getMovieById, insertNewMovie, editMovieById , searchMovieByName};
