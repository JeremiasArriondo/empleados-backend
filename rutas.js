//Importaciones

const express = require("express");
const Empleado = require("./models/Usuario");
const router = express.Router();


// GET - Devuelvo el listado de empleados
router.get("/usuarios", async (req, res) => {
    const empleados = await Empleado.find();
    res.send(empleados);
});

// POST - Puedo dar de alta una persona
router.post("/usuarios", async (req, res) => {
    const empleadoNuevo = new Empleado({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        edad: req.body.edad,
        fechaAlta: req.body.fechaAlta,
        email: req.body.email,
        password: req.body.password
    });
    await empleadoNuevo.save();
    res.send(empleadoNuevo);
});