const supertest = require("supertest");
const app = require("../app");

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const reserva = require("../models/reserva.model");

const { connect, getUri, closeDb } = require("../db/db");

//const { Builder } = require('../builders/product-builder.js');

beforeAll(async () => {
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    }
});

describe('Pruebas de reservas', () => {
    let token;

    beforeAll(() => {
       
        token = jwt.sign(
            { id: 1, nombre: 'Usuario de Prueba' },
            'your-secret-key', // Clave utilizada en el middleware
            { expiresIn: '1h' })
    });

    test('nueva reserva', async () => {
        const reservaData = {
            nombreCliente: 'Marcela',
            cantidadDePersonas: 4,
            idMesa: '1',
            fecha: '2024-11-18T12:00:00.000Z',
            turno: 'noche',
        };

        const response = await supertest(app)
            .post('/api/reservas')
            .set('Authorization', `Bearer ${token}`) 
            .set('Accept', 'application/json')
            .send(reservaData)
            .expect('Content-Type', /json/)
            .expect(201); 

        expect(response.body).toEqual(expect.objectContaining({
            nombreCliente: reservaData.nombreCliente,
            cantidadDePersonas: reservaData.cantidadDePersonas,
            idMesa: reservaData.idMesa,
            fecha: reservaData.fecha,
            turno: reservaData.turno,
            _id: expect.any(String)
        }));

        const reservaGuardada = await reserva.findById(response.body._id);
        expect(reservaGuardada).toBeTruthy();
        expect(reservaGuardada.nombreCliente).toBe(reservaData.nombreCliente);
        expect(reservaGuardada.cantidadDePersonas).toBe(reservaData.cantidadDePersonas);
        expect(reservaGuardada.idMesa).toBe(reservaData.idMesa);
        expect(reservaGuardada.fecha.toISOString()).toBe(reservaData.fecha);
        expect(reservaGuardada.turno).toBe(reservaData.turno);
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });
});


    /*test('Nueva reserva', async () => {
        const response =  await supertest(app) 
        .post('/api/reservas')
        .send({
          nombreCliente: 'Marcela',
          cantidadDePersonas: 4,
          idMesa: "1",
          fecha: "1970-01-01T00:00:01.995Z",
          turno: "mediodia"
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201);
   
        expect(response.body).toEqual(expect.objectContaining({
            nombreCliente: 'Marcela',
            cantidadDePersonas: 4,
            idMesa: "1",
            fecha: '1970-01-01T00:00:01.995Z',
            turno: "mediodia",
        }));
        expect(response.body._id).toBeDefined();
    });
});*/
   