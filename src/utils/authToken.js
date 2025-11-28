const jwt = require("jsonwebtoken");


// Tiempos que se pueden especificar en expiresIn:
/* 
s: segundos
min: minutos
h: horas
d: dias
w: semanas
y: años
*/

const generateToken = (payload, isRefreshToken) => {
  if (isRefreshToken) {
    return jwt.sign(payload, process.env.SECRET_TOKEN_REFRESH, {
      expiresIn: "7d",
    });
  }
  return jwt.sign(payload, process.env.SECRET_TOKEN, {
    expiresIn: "1d",
  });
};

module.exports = generateToken;
