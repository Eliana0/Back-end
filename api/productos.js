const { Router } = require("express");
const express = require("express");
const ruta = express.Router()

let menu = []

ruta.get(`/`, (req, res) => {
    res.send({menu})
})
/* ruta.get(`/:id`, (req, res) => {
    let parametro = req.params.id
    res.send(parametro)
}) */

ruta.post(`/`, (req, res) => {
    let plato = req.body
    if(!nombre || !precio || !ingredientes){
        return res.status(400).send({err: "Por favor, ingrese el precio, nombre e engredientes del plato"})
    }
    menu.push(plato)
    res.send({message: `Plato agregado al menu`, plato, menu})
})


module.exports = ruta