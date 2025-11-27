// Estas dos lineas siempre
const express = require("express");
const { signup, login, getTokens, signupMultiple } = require("../controllers/authController");
const { verifyToken } = require("../middlewares/auth");
const router = express.Router();

router.post("/signup",signup)
router.post("/login",login)


//EndPoint para el refresh_token

//Refresca el token normal con el token refresh 
router.get("/refresh_token",verifyToken,getTokens)

//Endpoit para Admin: Create many Users

router.post("/multipleSignup",signupMultiple)

//Exportamos el router
module.exports = router