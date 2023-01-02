import "../config/db.js"
import { userModel } from "./user.models.js"

const user = {
    name: "milanesa@mail.com",
    message: "Hola, buenas tardes"
}

const newUser = new userModel(user);
newUser.save();
console.log(newUser) 