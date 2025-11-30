const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");
const generateToken = require("../utils/authToken");
const { sendEmail } = require("../services/emailServices");

const BCRYPT_ROUNDS = Number(process.env.BCRYPT_ROUNDS || 10);

const signup = async (req, res) => {
  try {
    const { name, lastName, email, password } = req.body;
    const newUser = {
      name,
      lastName,
      email,
      password: await bcrypt.hash(password, BCRYPT_ROUNDS),
    };
    const user = await userModel.create(newUser);
    if (!user) {
      return res
        .status(400)
        .send({ status: "Failed", message: "No se ha creado el usuario" });
    }
    //Realizo el envío del email
    const to = email;
    const subject = "Bienvenido a nuestra App";
    const html = `<h2>Bienvenido ${name}</h2>
    
                      <p> Gracias por registrarte en nuestra aplicación </p>`;

    await sendEmail(to,subject,html);
    res.status(200).send({
      status: "Success",
      message: "El usuario se ha creado correctamente",
    });
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};

const signupMultiple = async (req, res) => {
  // Voy a recibir en el body un array de objetos de usuario
  try {
    const usersArray = req.body;
    const cantidadUsers = usersArray.length;
    if (cantidadUsers === 0)
      return res.status(200).send("No has enviado usuarios");
    usersArray.forEach(async (userSelected) => {
      const { name, lastName, email, password } = userSelected;
      const newUser = {
        name,
        lastName,
        email,
        password: await bcrypt.hash(password, BCRYPT_ROUNDS),
      };
      const user = await userModel.create(newUser);
      if (!user) {
        return res
          .status(400)
          .send({ status: "Failed", message: "No se ha creado el usuario" });
      }
    });
    res
      .status(200)
      .send(`Se han introducido correctamente ${cantidadUsers} usuarios`);
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel
      .findOne({ email: email })
      .select("name lastName email password role isActive"); // Para no motrar mi _id, tendría qque añadir dentro del select -_id - >.select("name lastName email password role -_id")
    if (!user) {
      return res.status(404).send({
        status: "Failed",
        message: "Credenciales introducidas incorrectas",
      });
    }
    const validatePassword = await bcrypt.compare(password, user.password);
    if (!validatePassword) {
      return res.status(404).send({
        status: "Failed",
        message: "Credenciales introducidas incorrectas",
      });
    }
    if (!user.isActive) {
      return res.status(404).send({
        status: "Failed",
        message: "El usuario esta deshabilitado temporalmente.",
      });
    }
    const returnUser = {
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    };

    // Zona para la creación del token
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
    res.status(500).send({ status: "Failed", error: error.message });
  }
};

const updatePrincipalToken = (req, res) => {
  try {
    const payload = {
      _id: req.payload._id,
      name: req.payload.name,
      role: req.payload.role,
    };

    const token = generateToken(payload, false);
    // Refreshtoken se regenera habitualmente si el usuario marca que nunca caduque la sesión
    //const token_refresh = generateToken(payload, true);
    res.status(200).send({ status: "Success", token });
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};

const loginWithToken = async (req, res) => {
  try {
    const idUser = req.payload._id;
    const user = await userModel
      .findById(idUser)
      .select("name lastName email role -_id");
    if (!user)
      return res
        .status(401)
        .send({ status: "Failed", message: "No se ha encontrado ese usuario" });
    res.status(200).send({ status: "Success", data: user });
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};

const makeAdmin = async (req, res) => {
  try {
    ///makeAdmin/:idUser
    const { idUser } = req.params;
    const userToAdmin = await userModel.findById(idUser);
    if (!userToAdmin) {
      return res.status(401).send({
        status: "Failed",
        message: "No se ha encontrado usuario con ese ID",
      });
    }
    if (userToAdmin.role === "admin") {
      return res.status(200).send({
        status: "Failed",
        message: "Este usuario ya es administrador",
      });
    }

    // console.log(userToAdmin);

    userToAdmin.role = "admin";
    userToAdmin.save();

    // console.log(userToAdmin);

    res.status(200).send({ status: "Success", data: userToAdmin });
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};

module.exports = {
  signup,
  login,
  updatePrincipalToken,
  loginWithToken,
  signupMultiple,
  makeAdmin,
};
