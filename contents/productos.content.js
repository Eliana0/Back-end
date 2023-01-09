import { query } from "express";
import admin from "firebase-admin"
import fs from "fs"
const date = new Date()
const serviceAccount = JSON.parse(fs.readFileSync("./firebase_productos.json", `utf-8`))

admin.initializeApp({credential: admin.credential.cert(serviceAccount)});
console.log("Conectado Fire")

const db = admin.firestore()
const productos = db.collection("productos")

let id = "GZcawrwKtL2dUFJRy71F"

const archivo = {
    /*     nombre: "Flan",
    timestamp: date,
    descripción: [
        "azucar",
        "leche",
        "huevo",
        "caramelo",
        "crema"
    ],
    foto: "https://th.bing.com/th/id/R.1528ec1e2d18e1ecd13df4d855e15124?rik=cyJxqLiod1zz4g&pid=ImgRaw&r=0",
    precio: 900,
    stock: 18 */
}


class ProductContent {
    Save = async(archivo) => {
        await productos.add(archivo)
    }
    getAll = async() => {
        const getProducts = await productos.get()
        getProducts.forEach(e => console.log( { id: e.id, ...e.data() } ))
    }
    getById = async(id) => {
        const doc = productos.doc(`${id}`);
        const item = await doc.get();
        const response = item.data();
        console.log(response)
    }
    update = async(id, archivo) => {
        await productos.doc(`${id}`).update(archivo)
    }
    delete = async(id) => { 
    await productos.doc(`${id}`).delete()
    }
}

export const ContentProduct = ("ProductContent", ProductContent)