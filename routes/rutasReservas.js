const express = require("express");
const servicioReservas = require("../services/servicios.js");
const verifyToken = require("../middleware/usuarioMiddleware");

const router = express.Router();

// Ruta para listar reservas
router.get("/api/reservas", async (req, res) => {
  try {
    const reservas = await servicioReservas.listarReservas();
    res.json(reservas);
  } catch (error) {
    res.status(500).json({ error: "Error al listar las reservas" });
  }
});

// Ruta para crear una nueva reserva
router.post("/api/reservas", verifyToken, async (req, res) => {
  try {
    const { nombreCliente, cantidadDePersonas, idMesa, fecha, turno } =
      req.body;
    const nuevaReserva = await servicioReservas.crearReserva(
      nombreCliente,
      cantidadDePersonas,
      idMesa,
      fecha,
      turno
    );
    res.status(201).json(nuevaReserva);
  } catch (error) {
    res.status(500).json({ error: "Error al crear la reserva" });
  }
});

// Ruta para obtener una reserva por ID
router.get("/api/reservas/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const reserva = await servicioReservas.obtenerReservaPorId(id);
    if (reserva) {
      res.json(reserva);
    } else {
      res.status(404).json({ error: "Reserva no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la reserva" });
  }
});

// Ruta para actualizar una reserva
router.put("/api/reservas/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const datosActualizados = req.body;
    const reservaActualizada = await servicioReservas.actualizarReserva(
      id,
      datosActualizados
    );
    if (reservaActualizada) {
      res.json(reservaActualizada);
    } else {
      res.status(404).json({ error: "Reserva no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la reserva" });
  }
});

// Ruta para eliminar una reserva
router.delete("/api/reservas/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const eliminado = await servicioReservas.eliminarReserva(id);
    if (eliminado) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: "Reserva no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la reserva" });
  }
});

// Nueva ruta para chequear la disponibilidad de una mesa
router.post(
  "/api/reservas/check-availability",
  verifyToken,
  async (req, res) => {
    try {
      const { fecha, turno, cantidadDePersonas } = req.body;

      const reservasExistentes =
        await servicioReservas.buscarReservasPorFechaYTurno(fecha, turno);

      const totalMesasDisponibles = 10;

      if (reservasExistentes.length >= totalMesasDisponibles) {
        return res.status(200).json({ disponible: false });
      }

      return res.status(200).json({ disponible: true });
    } catch (error) {
      res.status(500).json({ error: "Error al verificar la disponibilidad" });
    }
  }
);

router.delete("/api/reservas/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const eliminado = await servicioReservas.eliminarReserva(id);
    if (eliminado) {
      res.status(200).json({ message: "Reserva eliminada" });
    } else {
      res.status(404).json({ error: "Reserva no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la reserva" });
  }
});

module.exports = router;
