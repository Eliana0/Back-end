import dotenv from "dotenv"
import mongoose from "mongoose"

dotenv.config()

mongoose.set('strictQuery', true);
mongoose.createConnection(process.env.MONGO_URL, (err) => {
    if(err) {
        console.log(err)
    }else{
        console.log("Conectado")
    }
})