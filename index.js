const express = require("express")
const app = express()
const productos = './productos.txt'

const Contenedor = require('./Content.js')
const contenedor = new Contenedor()

const servidor = app.listen(8080, ()=> console.log("hola"))

app.use(express.json())

let archivo = {
    nombre: "Tarta",
    ingredientes: ["pascualina", "tomate", "queso", "jamón", "huevo", "cebolla"],
    precio: 800
}

app.get('/api/productos', (req, res)=> {
    contenedor.getAll()
    .then(result => 
        res.send(result)
    )})

app.get('/api/productos/:id', (req, res)=> {
    let Number = 2;
    contenedor.getById(Number)
    .then(result => 
        res.send(result)
    )})

app.post('/api/productos', (req, res)=> {
    let { nombre, ingredientes, precio } = req.body
    productos = productos.concat(`{${ nombre, ingredientes, precio }}`)
    console.log(productos)
/*     res.send(req.body)
    console.log({ nombre, ingredientes, precio }) */
    })  
