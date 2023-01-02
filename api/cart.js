const express = require("express");
const router = express.Router();
const app = express()
const fecha = new Date()

const Content = require('../Contents/ContentCart.js')
const content = new Content()

let cart = {
/*     timestamp: `${fecha}`,
    productos:[
{
    nombre: "Hamburguesa",
    timestamp: "Wed Dec 07 2022 14:35:05 GMT-0300 (hora estándar de Argentina)",
    descripción: [
      "pan",
      "carne",
      "queso",
      "lechuga",
      "tomate"
    ],
    foto: "https://th.bing.com/th/id/R.f9bb03c6cca539df7b4a0c943c3e87cf?rik=xNZbflDfnYOfmQ&pid=ImgRaw&r=0",
    precio: 1400,
    stock: 33,
    id: 3
},
{
    nombre: "Milanesa Napolitana",
    timestamp: "Wed Dec 07 2022 14:35:05 GMT-0300 (hora estándar de Argentina)",
    descripción: [
      "milanesa",
      "salsa",
      "queso",
      "papas fritas"
    ],
    foto: "https://lachimenearestaurante.com.ar/wp-content/uploads/2020/05/Milanesa-a-la-Napolitana-2048x1367.jpg",
    precio: 1800,
    stock: 10,
    id: 4
}
    ] */
}

router.post('/', (req, res)=> {
    if(!cart.timestamp && !cart.productos){
        res.json({message: "por favor, rellene los campos timestamp y productos"})
    }else{
        let body = req.body;
        let create = content.CreateCart(cart);
        create ? res.json({message: `${cart}`, producto: body}) : res.json({message: `No se ha ecreado el producto`})
    }
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    if(!id){
        res.json({message: 'Producto no encontrado'})
    }else{
        let contentenedor = content.deleteCart(parseInt(id));
        contentenedor ? res.json({message: `${id} eliminado`}) : res.json({message: `No se encuentra el producto`})
    }
})

router.get('/:id/productos', (req, res)=> {
        const number = req.params.id;
        if(!number){
            res.json({message: "Producto no encontrado"})
        }else{
            content.getCartById(parseInt(number))
            .then(result => 
                res.send(result))
            .catch(err => console.log(err))
        }
})

router.post('/:id/productos', (req, res)=> {
        const number = req.params.id;
        if(!number){
            res.json({message: "Producto no encontrado"})
        }else{
            content.postById(parseInt(number), cart)
            .then(result => 
                res.send(result))
            .catch(err => console.log(err))
        }
})

router.delete(`/:id/productos/:id_prod`, (req,res) => {
    const number = req.params.id;
    const idProd = req.params.id_prod;
    if(!number){
        res.json({message: "Producto no encontrado"})
    }else{
        let contentenedor = content.deleteElement(parseInt(number), parseInt(idProd));
        contentenedor ? res.json({message: `el producto ${idProd} del carrito ${number} fué eliminado`}) : res.json({message: `No se encuentra el producto`})
    }
})

module.exports = router