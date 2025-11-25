const userModel = require("../models/userModel");
const movieModel = require("../models/movieModel");

const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    if (users.length === 0) return res.status(200).send("No hay usuarios");

    res.status(200).send({ status: "Success", data: users });
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const { idUser } = req.params;
    console.log(idUser);
    const user = await userModel.findById(idUser);
    if (!user) return res.status(200).send("No existe usuario con ese id");
    res.status(200).send({ status: "Success", data: user });
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};

const insertNewUser = async (req, res) => {
  try {
    const { name, lastName, email, password } = req.body;

    if (!name || !lastName || !email || !password) {
      return res
        .status(400)
        .send({ status: "Failed", message: "Falta algun campo obligatorio" });
    }

    const newUser = {
      name,
      lastName,
      email,
      password,
    };
    const user = await userModel.create(newUser);
    if (!user) {
      return res.status(400).send({
        status: "Failed",
        message: "No se ha podido crear el usuario",
      });
    }
    res.status(200).send({
      status: "Success",
      message: "El usuario se ha creado correctamente",
    });
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};

const deleteUserById = async (req, res) => {
  try {
    const { idUser } = req.params;
    console.log(idUser);
    const user = await userModel.findByIdAndDelete(idUser);
    if (!user) return res.status(200).send("No existe usuario con ese id");
    res
      .status(200)
      .send({ status: "Success", message: "Usuario elimnado correctamente" });
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};

const editUserById = async (req, res) => {
  try {
    const { idUser } = req.params;
    const newUser = req.body;
    const updatedUser = await userModel.findByIdAndUpdate(idUser, newUser, {
      new: true,
      runValidators: true,
    });
    if (!updatedUser)
      return res.status(200).send("No existe usuario con ese id");
    res.status(200).send({ status: "Success", data: updatedUser });
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};

const addFavoriteMovie = async (req, res) => {
  try {
    const { idUser, idMovie } = req.params;

    const user = await userModel.findById(idUser);

    if (!user) return res.status(200).send("No se ha encontrado el usuario");
    const movie = await movieModel.findById(idMovie);
    if (!movie) return res.status(200).send("No se ha encontrado esa película");
    if (user.favorites.includes(idMovie))
      return res.status(200).send("La película ya está en favoritos");
    user.favorites.push(idMovie);
    user.save();
    res.status(200).send({ status: "Success", data: user });
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};
const removeFavoriteMovie = async (req, res) => {
  try {
    const { idUser, idMovie } = req.params;

    const user = await userModel.findById(idUser);

    if (!user) return res.status(200).send("No se ha encontrado el usuario");
    const movie = await movieModel.findById(idMovie);
    if (!movie) return res.status(200).send("No se ha encontrado esa película");
    if (!user.favorites.includes(idMovie))
      return res.status(200).send("La película no está en favoritos");

    user.favorites.pull(idMovie);

    user.save();

    res.status(200).send({ status: "Success", data: user });
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};

const searchUserByName = async (req, res) => {
  try {
    const { userName } = req.params;
    const users = await userModel.find({
      name: { $regex: userName, $options: "i" },
    });
    console.log(users);

    if (users.length === 0)
      return res.status(200).send("No se han encontrado usuarios");
    res.status(200).send({ status: "Success", data: users });
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  insertNewUser,
  deleteUserById,
  editUserById,
  addFavoriteMovie,
  removeFavoriteMovie,
  searchUserByName,
};
