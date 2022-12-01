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
socket.on("elemento", () => alert("nuevo usuario conectado"))

socket.on(`mensaje`, data => {
    let mensaje = document.getElementById(`mensaje`)
    let chats = ""
    data.forEach(chat => {
        chats += JSON.stringify(chat)
    });
    mensaje.innerHTML = chats
})
