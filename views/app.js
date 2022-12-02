const socket = io()
const fecha = new Date()

let usuario = prompt("Escriba su mail")

while(usuario === ""){
    alert("Debe escribir su main")
    usuario = prompt("Escriba su mail")   
}
    
let nombre = document.getElementById("nombre")
let precio = document.getElementById("precio")
let foto = document.getElementById("foto")
let enviar = document.getElementById("enviar")
let chatInput = document.getElementById("chatInput")

chatInput.addEventListener(`keyup`, (e) => {
    if(e.key === "Enter"){
        if(chatInput.value.trim().length>0){
            socket.emit(`c`, { usuario, mensaje: chatInput.value.trim() })
            chatInput.value = ""
        }
    }
})

enviar.addEventListener(`click`, () => {
    if(nombre.value.trim().length && precio.value.trim().length && foto.value.trim().length > 0){
        socket.emit("objeto" , { nombre: nombre.value.trim(), precio: precio.value.trim(), foto: foto.value.trim() })
        nombre.value = ""
        foto.value = ""
        precio.value = ""
    }else{
        alert("Debe ingresar todos los campos")
    }
})

socket.on("elemento", (data) => alert(`${data} ha ingresado`)); socket.emit(`usuario registrado`, usuario)

socket.on(`mensaje`, data => {
    let mensaje = document.getElementById(`mensaje`)
    let chats = ""
    data.forEach(chat => {
        chats +=  `<p style=color:blue>${fecha} <br> ${chat.usuario}:</p> <p style=color:green>${chat.mensaje}</p>`
    });
    mensaje.innerHTML = chats
})

socket.on("menu", elemento => {
    let menu = document.getElementById("menu")
    let platos = ""
    elemento.forEach(plato => {
        platos +=  `
        <div class="container text-center">
        <div class="row">
        <div class="col">
        ${plato.nombre}     
        </div>
        <div class="col order-5">
        <img src="${plato.foto}" alt="" class="imagen" style: width="80px">
        </div>
        <div class="col order-1">
        $ ${plato.precio} 
        </div>
        </div>
        </div>`
        menu.innerHTML = platos
    })
})
