require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectToDatabase = require("./src/db/connectDb");
const userRouter = require("./src/routers/userRouter");
const movieRouter = require("./src/routers/movieRouter");
const authRouter = require("./src/routers/authRouter");

const PORT = Number(process.env.PORT || 3000);

const server = express();
server.use(express.json());

connectToDatabase();

server.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

// Router for users
server.use("/api/users", userRouter);
// Router for movies
server.use("/api/movies", movieRouter);
// Router for auth petitions
server.use("/api/auth", authRouter);

server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
