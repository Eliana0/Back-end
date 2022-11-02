const express = require("express")
const menu = './menu.json'
const app = express()
const fs = require('fs')

const Contenedor = require('./Cont.js')
const contenedor = new Contenedor()

const servidor = app.listen(8080, ()=> console.log("hola"))

contenedor.getAll()
    .then(result => 
        app.get('/productos', (request, response)=> {
        response.send(result)
    }))

contenedor.productoRandom()
    .then(result => 
        app.get('/productoRandom', (request, response)=> {
            response.send(result)})
)


