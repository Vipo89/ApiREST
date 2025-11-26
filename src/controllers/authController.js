const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");
const generateToken = require("../utils/authToken");
const BCRYPT_ROUNDS = Number(process.env.BCRYPT_ROUNDS || 10);

const signup = async (req, res) => {
  try {
    const { name, lastName, email, password } = req.body;
    console.log(req.body);
    const newUser = {
      name,
      lastName,
      email,
      password: await bcrypt.hash(password, BCRYPT_ROUNDS),
    };
    console.log(newUser);
    // res.send(newUser)

    console.log("hola");

    const user = await userModel.create(newUser);
    if (!user)
      return res
        .status(400)
        .send({ status: "Failed", message: "No se ha creado el usuario" });
    res.status(200).send({
      status: "Success",
      message: "El usuario se ha creado correctamente",
    });
  } catch (error) {
    res.status(500).send({ status: "Failed", message: error });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel
      .findOne({ email: email })
      .select("name lastName email password role isActive"); //Para no mostrar el id es -_id
    if (!user) {
      return res.status(400).send({
        status: "Failed",
        message: "Credenciales introducidas incorrectas",
      });
    }
    console.log("Recibido:", { email, password });

    //                                            No crypt//Crypted password
    const validatePassword = await bcrypt.compare(password, user.password);

    if (!validatePassword)
      return res.status(400).send({
        status: "Failed",
        message: "Credenciales introducidas incorrectas",
      });

    if (!user.isActive) {
      return res.status(400).send({
        status: "Failed",
        message: "El usuario está deshabilitado temporalmente",
      });
    }
    const returnUser = {
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    };

    //Zona para la creación del token

    const payload = {
      _id: user._id,
      name: user.name,
      role: user.role,
    };

    const token = generateToken(payload, false);
    const token_refresh = generateToken(payload, true);

    res
      .status(200)
      .send({ status: "Success", data: returnUser, token, token_refresh });
  } catch (error) {
    res.status(500).send({ status: "Failed", message: error });
  }
};

module.exports = { signup, login };
