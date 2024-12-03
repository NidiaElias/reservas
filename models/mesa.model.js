//import mongoose from "mongoose";
const mongoose = require ("mongoose")
// Definir el esquema de la mesa
const MesaSchema = new mongoose.Schema({
  id: { type: String, required: true },
  cantidadDePersonas: { type: Number, required: true },
});

// Crear el modelo a partir del esquema
const Mesa = mongoose.model("Mesa", MesaSchema);

module.exports= Mesa;
