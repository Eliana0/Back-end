const express = require("express");
const router = express.Router();
const app = express()
const productos = './productos.txt'
const fecha = new Date()

const Contenedor = require('../Contents/Content.js')
const contenedor = new Contenedor()

let administrador = true;
let archivo = {
        nombre: "Tacos",
        timestamp: `${fecha}`,
        descripción: [
          "tortilla",
          "carne",
          "cebolla",
          "morrón",
          "queso",
          "salsa"
        ],
        foto: "https://th.bing.com/th/id/R.b9e921aeea76c1f79e4633e40543e0ee?rik=6rz2nNSRd7t3Ew&pid=ImgRaw&r=0",
        precio: 2400,
        stock: 4
}

router.get('/', (req, res)=> {
        contenedor.getAll()
        .then(result => 
            res.send(result))
        .catch(err => console.log(err))
})

router.post('/', (req, res)=> {
    if (administrador){
        let body = req.body;
            contenedor.Save(archivo);
            res.json({message: "Producto guardado", producto: body}) 
    }else{
        return {message: "Esta función sólo está disponible para administradores"}
    }
})

router.get('/:id', (req, res)=> {
    const number = req.params.id;
    if(!number){
        res.json({message: "Producto no encontrado"})
    }else{
        contenedor.getById(parseInt(number))
        .then(result => 
            res.send(result))
        .catch(err => console.log(err))
    }
})

router.put('/:id', (req, res) => {
    if (administrador){
    const Number  = req.params.id;
    const body = req.body;
    if(!body){
        res.json({message: 'Producto no encontrado'})
    }else{
        contenedor.actualizaById(Number ,body, productos) 
        res.json({message: 'Producto actualizado', producto: body});
    }
    }else{
        return {message: "Esta función sólo está disponible para administradores"}
    }
})

router.delete('/:id', (req, res) => {
    if (administrador){
    const id = req.params.id;
    if(!id){
        res.json({message: 'Producto no encontrado'})
    }else{
        let content = contenedor.deleteById(parseInt(id), productos);
        content ? res.json({message: `${id} eliminado`}) : res.json({message: `No se encuentra el producto`})
    }}else{
        return {message: "Esta función sólo está disponible para administradores"}
    }
})


module.exports = router