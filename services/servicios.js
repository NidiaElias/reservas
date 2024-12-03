//import Reserva from "../models/reserva.model.js";
const Reserva =require("../models/reserva.model")
// Función para crear una reserva
const crearReserva = async (
  nombreCliente,
  cantidadDePersonas,
  idMesa,
  fecha,
  turno
) => {
  try {
    const nuevaReserva = new Reserva({
      nombreCliente,
      cantidadDePersonas,
      idMesa,
      fecha,
      turno,
    });
    await nuevaReserva.save();
    console.log("Reserva creada y guardada en la base de datos:", nuevaReserva);
    return nuevaReserva;
  } catch (error) {
    console.error("Error al crear la reserva:", error);
    throw error;
  }
};

// Función para listar reservas
const listarReservas = async () => {
  try {
    return await Reserva.find(); // Obtener todas las reservas
  } catch (error) {
    console.error("Error al listar reservas:", error);
    throw error;
  }
};

// Función para obtener una reserva por ID
const obtenerReservaPorId = async (id) => {
  try {
    return await Reserva.findById(id);
  } catch (error) {
    console.error("Error al obtener la reserva por ID:", error);
    throw error;
  }
};

// Función para actualizar una reserva
const actualizarReserva = async (id, datosActualizados) => {
  try {
    return await Reserva.findByIdAndUpdate(id, datosActualizados, {
      new: true,
    });
  } catch (error) {
    console.error("Error al actualizar la reserva:", error);
    throw error;
  }
};

// Función para eliminar una reserva
const eliminarReserva = async (id) => {
  try {
    const result = await Reserva.findByIdAndDelete(id);
    return result != null;
  } catch (error) {
    console.error("Error al eliminar la reserva:", error);
    throw error;
  }
};

module.exports = {
  crearReserva,
  listarReservas,
  obtenerReservaPorId,
  actualizarReserva,
  eliminarReserva,
};
