let formPlato = document.getElementById("formPlato")

/* const template = Handlebars.compile(`
    <ul>
        <li>{{nomber}}</li>
        <li>{{apellido}}</li>
        <li>{{edad}}</li>
        <li>{{mail}}</li>
        <li>{{teléfono}}</li>
    </ul>
`)

const html = template({
    nomber: "Eliana",
    apellido: "Cristaldo",
    edad: 24,
    mail: "jajaja@gmail.com",
    teléfono: "123456"
}) */

const handelrSubmit = (evt, form, route) => {
    evt.preventDefault();
    let formData = new FormData(form);
    let obj = {};
    formData.forEach((value, key) => obj[key]= value)
    fetch(route, {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
            "Content-type": "application/json"
        }
    })
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.log(err))
}

formPlato.addEventListener("submit", (e) => handelrSubmit(e, e.target, "/api/productos"))
/* document.getElementById('Data').innerHTML = html */