//import mongoose from "mongoose";
const mongoose = require ("mongoose")

// Definir el esquema de la reserva
const ReservaSchema = new mongoose.Schema({
  nombreCliente: { type: String, required: true },
  cantidadDePersonas: { type: Number, required: true },
  idMesa: { type: String, required: true },
  fecha: { type: Date, required: true },
  turno: { type: String, required: true },

 
});

// Crear el modelo a partir del esquema
const Reserva = mongoose.model("Reserva", ReservaSchema);

module.exports= Reserva;
