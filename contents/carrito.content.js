import { CartModel } from "../models/carrito.models.js";

let archivo = {
/*     nombre: "Milanesa Napolitana",
    descripción: [
      "milanesa",
      "salsa",
      "queso",
      "papas fritas"
    ],
    foto: "https://lachimenearestaurante.com.ar/wp-content/uploads/2020/05/Milanesa-a-la-Napolitana-2048x1367.jpg",
    precio: 1800,
    stock: 10 */
}

class Contenedor {
    Save = async(archivo) => {
        const newMensaje = new CartModel(archivo)
        newMensaje.save()
        console.log(newMensaje)
    }
    
    getAll = async() => {
        const get = await CartModel.find()
        console.log(get) 
    }  
    
    getById = async(id) => {
        const getById = await CartModel.findById(id)
        console.log(getById)
    }
    
    update = async(id, archivo) => {
        const actualiza = await CartModel.findByIdAndUpdate(id, {
            mensaje: archivo.mensaje
        })
        console.log(actualiza)
    }
    
    delete = async(id) => {
        await UserModel.findByIdAndDelete(id)
        const get = await CartModel.find()
        console.log(get)
    }
}

export const CartContent = ("CartContent", Contenedor)