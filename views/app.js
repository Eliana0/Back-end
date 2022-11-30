/* const socket = io()

let nombre = document.getElementById("nombre")
let enviar = document.getElementById("enviar")

nombre.addEventListener(`keyup`, (e) => {
    if(e.key === "Enter"){
        socket.emit(`c`, nombre.value)
    }
})

socket.on(`mensaje`, data => {
    let chat = ""
    data.forEach(text => {
        chat += `${text} </br>`
    });
    document.getElementById(`mensaje`).innerHTML = chat
    nombre.value = ""
}) */

const socket = io()
console.log("Hola Mundo")
let usuario = prompt("Escriba el nombre de usuario")

while(usuario === ""){
    alert("Debe escribir su nombre de usuario")
    usuario = prompt("Escriba el nombre de usuario")
}

socket.on("newUser", alert("new User connected"))

let elemento = document.getElementById("elemento")
elemento.addEventListener(`kayup`, e => {
    if(e.key === "Enter"){
        socket.emit(`message`, {user, message: elemento.value})
    }
})