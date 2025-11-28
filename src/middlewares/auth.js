const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Acceso denegado");
  try {
    const payload = jwt.verify(token, process.env.SECRET_TOKEN);
    // Req no tiene dentro payload
    req.payload = payload;
    next();
  } catch (error) {
    try {
      const payload = jwt.verify(token, process.env.SECRET_TOKEN_REFRESH);
      req.payload = payload;
      next();
    } catch (error) {
      res.status(401).send({ status: "Token Expired", error: error.message });
    }
  }
};

const verifyAdmin = (req, res, next) => {
  try {
    const { role } = req.payload;
    if (role !== "admin") {
      return res
        .status(401)
        .send({ status: "Failed", message: "You don't have admin privileges" });
    }
    next();
  } catch (error) {
    return res
      .status(401)
      .send({ status: "Error Endpoint", error: error.message });
  }
};

const verifyUserPermissions = (req, res, next) => {
  try {
    const { _id: idUserAuthenticated, role: roleAdmin } = req.payload;
    const { idUser } = req.params;
    if (idUserAuthenticated === idUser || roleAdmin === "admin") {
      next();
    } else {
      return res
        .status(403)
        .send({
          status: "Failed",
          message: "No tienes permisos para realizar esta acción.",
        });
    }
  } catch (error) {
    return res
      .status(401)
      .send({ status: "Error Endpoint", error: error.message });
  }
};

module.exports = {
  verifyToken,
  verifyAdmin,
  verifyUserPermissions,
};
