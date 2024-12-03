const express = require('express');
 const router = express.Router();
 const User = require('../models/usuario.model');
 const bcrypt = require('bcrypt');
 const jwt = require('jsonwebtoken');

// Nuevo usuario
 router.post('/api/register', async (req, res) => {
 try {
 const { username, password } = req.body;
 const hashedPassword = await bcrypt.hash(password, 10);
 const user = new User({ username, password: hashedPassword });
 await user.save();
 res.status(201).json({ message: 'Usuario registrado' });
 } catch (error) {
 res.status(500).json({ error: 'Error al registrar usuario' });
 }
 });

// Login
 router.post('/api/login', async (req, res) => {
 try {
 const { username, password } = req.body;
 const user = await User.findOne({ username });
 if (!user) {
 return res.status(401).json({ error: 'Autenticación fallida' });
 }
 const passwordMatch = await bcrypt.compare(password, user.password);
 if (!passwordMatch) {
 return res.status(401).json({ error: 'Autenticación fallida' });
 }
 //console.log("User id es: " + user._id);
 const token = jwt.sign({ userId: user._id }, 'your-secret-key', {
 expiresIn: '1h',
 });

 res.status(200).json({ token });
 } catch (error) {
 res.status(500).json({ error: 'Login fallido' });
 }
 });

module.exports = router;