const userModel = require("../models/userModel");
const movieModel = require("../models/movieModel");

/**
 *
 * @param {Request} req Esta es la request lanzada desde el frontEnd
 * @param {Response} res Esta el la respuesta que da el backEnd al frontEnd
 * @returns Un objeto con la propiedad status, que puede ser Success o Failed, y otra propiedad, que peudes ser data o error, dependiendo del status
 */
const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find().select("name lastName email");
    if (users.length === 0) return res.status(200).send("No hay usuarios");
    res.status(200).send({ status: "Success", data: users });
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};

/**
 *
 * @param {Request} req Esta es la request lanzada desde el frontEnd
 * @param {Response} res Esta el la respuesta que da el backEnd al frontEnd
 * @returns Un objeto con los datos de usuario encontrado
 */
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

/**
 *
 * @param {Request} req Esta es la request lanzada desde el frontEnd
 * @param {Response} res Esta el la respuesta que da el backEnd al frontEnd
 * @returns Confirmacion de usuario insertado correctamente. En desuso, se realiza en /api/auth/signup
 */
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

/**
 *
 * @param {Request} req Esta es la request lanzada desde el frontEnd
 * @param {Response} res Esta el la respuesta que da el backEnd al frontEnd
 * @returns Confirmacion de usuario eliminado correctamente.
 */
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

/**
 *
 * @param {Request} req Esta es la request lanzada desde el frontEnd
 * @param {Response} res Esta el la respuesta que da el backEnd al frontEnd
 * @returns Un objeto con la propiedad status, que puede ser Success o Failed, y otra propiedad, que puedes ser data(del usuario actualizado) o error, dependiendo del status
 */
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

/**
 *
 * @param {Request} req Esta es la request lanzada desde el frontEnd
 * @param {Response} res Esta el la respuesta que da el backEnd al frontEnd
 * @returns Un objeto con la propiedad status, que puede ser Success o Failed, y otra propiedad, que puedes ser data(del usuario con favoritos actualizados) o error, dependiendo del status
 */
const addFavoriteMovie = async (req, res) => {
  try {
    const { idUser, idMovie } = req.params;
    const user = await userModel.findById(idUser);
    if (!user) return res.status(200).send("No se ha encontrado ese usuario");
    const movie = await movieModel.findById(idMovie);
    if (!movie) return res.status(200).send("No se ha encontrado esa pelicula");
    if (user.favorites.includes(idMovie))
      return res.status(200).send("La pelicula ya está en favoritos");
    user.favorites.push(idMovie);
    user.save();
    res.status(200).send({ status: "Success", data: user });
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};

/**
 *
 * @param {Request} req Esta es la request lanzada desde el frontEnd
 * @param {Response} res Esta el la respuesta que da el backEnd al frontEnd
 * @returns Un objeto con la propiedad status, que puede ser Success o Failed, y otra propiedad, que puedes ser data(del usuario con favoritos actualizados) o error, dependiendo del status
 */
const removeFavoriteMovie = async (req, res) => {
  try {
    const { idUser, idMovie } = req.params;
    const user = await userModel.findById(idUser);
    if (!user) return res.status(200).send("No se ha encontrado ese usuario");
    const movie = await movieModel.findById(idMovie);
    if (!movie) return res.status(200).send("No se ha encontrado esa pelicula");
    if (!user.favorites.includes(idMovie))
      return res.status(200).send("La pelicula no está en favoritos");
    user.favorites.pull(idMovie);
    user.save();
    res.status(200).send({ status: "Success", data: user });
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};

/**
 *
 * @param {Request} req Esta es la request lanzada desde el frontEnd
 * @param {Response} res Esta el la respuesta que da el backEnd al frontEnd
 * @returns Un objeto con la propiedad status, que puede ser Success o Failed, y otra propiedad, que puedes ser data(con los usuarios encontrados) o error, dependiendo del status
 */
const searchUserByName = async (req, res) => {
  try {
    const { userName } = req.params;
    const users = await userModel.find({
      name: { $regex: userName, $options: "i" },
    });
    if (users.length === 0)
      return res.status(200).send("No se han encontrado usuarios");
    res.status(200).send({ status: "success", data: users });
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
