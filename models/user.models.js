import { Schema, model } from "mongoose";

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
},
{timestamp: true,
},
);

export const userModel = model(`Users`, schema)