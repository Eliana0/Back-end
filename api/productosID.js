const { Router } = require("express");
const express = require("express");
const ruta = express.Router()

ruta.get(`/`, (req, res) => {
    res.send(`HOLA ID`)
})

module.exports = ruta