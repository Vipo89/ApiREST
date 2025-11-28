const crypto = require("crypto");

const secret = "Full Stack 18";
let secret2 = "Actualizo con más seguridad";

for(let i = 1; i <= 2; i++){
    if( i === 2 ) secret2 = "Actualizo con aún más seguridad para TOKEN DE REFRESCO";
    const hash = crypto.createHmac("sha256",secret).update(secret2).digest("hex");
    console.log(`Hash${i}:`, hash);
}