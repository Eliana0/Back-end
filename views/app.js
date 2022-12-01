const socket = io()

let usuario = prompt("Escriba el nombre de usuario")

while(usuario === ""){
    alert("Debe escribir su nombre de usuario")
    usuario = prompt("Escriba el nombre de usuario")

}

let nombre = document.getElementById("nombre")
let enviar = document.getElementById("enviar")

nombre.addEventListener(`keyup`, (e) => {
    if(e.key === "Enter"){
        if(nombre.value.trim().length>0){
            socket.emit(`c`, { usuario, mensaje: nombre.value.trim() })
            nombre.value = ""
        }
    }
})
socket.on("elemento", (data) => alert(`${data} ha ingresado`)); socket.emit(`usuario registrado`, usuario)

socket.on(`mensaje`, data => {
    let mensaje = document.getElementById(`mensaje`)
    let chats = ""
    data.forEach(chat => {
        chats +=  `${chat.usuario}: ${chat.mensaje}</br>`
    });
    mensaje.innerHTML = chats
})
