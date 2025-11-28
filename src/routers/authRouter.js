// Estas dos lineas siempre
const express = require("express");
const { signup, login, loginWithToken, updatePrincipalToken, signupMultiple } = require("../controllers/authController");
const { verifyToken } = require("../middlewares/auth");
const router = express.Router();

router.post("/signup", signup)
router.post("/login", login)

//EndPoint para el refresh_token
router.get("/refresh_token",verifyToken, updatePrincipalToken)

// EndPoint para logear con Token
router.post("/loginToken",verifyToken, loginWithToken)

//Enpoint para Admin: Create many users
router.post("/multipleSignup", signupMultiple)

// Esta linea siempre.Exportamos el router
module.exports = router;