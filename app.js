const express = require("express");
const mongoose = require("mongoose");
const rutasReservas = require("./routes/rutasReservas.js");
const rutasUsuario = require("./routes/rutasUsuario.js");
const rutaProtegida = require("./routes/rutaProtegida.js");
const dotenv = require("dotenv");
const path = require("path");
const app = express();
const PORT = 8000;

//------ Autenticación-------------------///

//------

dotenv.config(); // Cargar las variables de entorno desde el archivo .env

// Conectar a MongoDB utilizando la URI del archivo .env
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Conectado a la base de datos MongoDB"))
  .catch((error) => console.error("Error conectando a MongoDB:", error));

// Middleware para parsear JSON
app.use(express.json());

app.use("/public", express.static(path.join(path.resolve(), "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(path.resolve(), "views", "ingreso.html"));
});

app.use(rutasReservas);
app.use(rutasUsuario);
app.use(rutaProtegida);

// Levantar el servidor
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
  });
}

module.exports = app;
