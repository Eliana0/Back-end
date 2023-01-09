import { Schema, model } from "mongoose";

const schema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    descripción: {
        type: Object,
        required: true
    },
    foto: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        required: true
    }
},{
    timestamps: true
})

export const CartModel = model(`Carrito`, schema)