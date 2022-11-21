const express = require("express");
const router = express.Router();
const app = express()
const productos = './productos.txt'

const Contenedor = require('../Content.js')
const contenedor = new Contenedor()

let archivo = {
/*     nombre:"Cheescake",
    foto: "https://th.bing.com/th/id/OIP.HpIhsZagu3bqCVvbtKMclQHaE8?pid=ImgDet&w=4608&h=3072&rs=1",
    precio: 800 */
}

router.get('/', (req, res)=> {
    contenedor.getAll()
    .then(result => 
        res.send(result)
)})

router.post('/', (req, res)=> {
    let body = req.body;
    if (!body.nombre || !body.foto || !body.precio){
        res.json({message: "Rellene los campos solicitados"})
    } else{
        contenedor.Save(archivo);
        res.json({message: "Producto guardado", producto: body}) 
    }
})

router.get('/:id', (req, res)=> {
    const Number = req.params.id;
    if(!Number){
        res.json({message: "Producto no encontrado"})
    }else{
        contenedor.getById(parseInt(Number))
        .then(result => 
            res.send(result))
    }
})

router.put('/:id', (req, res) => {
    const Number  = req.params.id;
    const body = req.body;
    if(!body){
        res.json({message: 'Producto no encontrado'})
    }else{
        contenedor.actualizaById(Number ,body, productos) 
        res.json({message: 'Producto actualizado', producto: body});
    }
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    if(!id){
        res.json({message: 'Producto no encontrado'})
    }else{
        let content = contenedor.deleteById(parseInt(id), productos);
        content ? res.json({message: `${id} eliminado`}) : res.json({message: `No se encuentra el producto`})
    }
})


module.exports = router