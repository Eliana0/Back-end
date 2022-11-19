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
    const Number = req.params.id;
    contenedor.getById(parseInt(Number))
    .then(result => 
        res.send(result))
})

app.post('/api/productos', (req, res)=> {
    const body = req.body;
    contenedor.Save(archivo);
    res.json({message: "Producto guardado", producto: body})
})

app.put('/api/productos/:id', (req, res) => {
    const Number  = req.params.id;
    const body = req.body;
   /*  contenedor.getById(parseInt(Number), productos); */
    contenedor.actualizaById(Number ,body, productos) 
    res.json({message: 'Producto actualizado', producto: body});
})

app.delete('/api/productos/:id', (req, res) => {
    const id = req.params.id;
    let content = contenedor.deleteById(parseInt(id), productos);
    content ? res.json({message: `${id} eliminado`}) : res.json({message: `No se encuentra el producto`})
})