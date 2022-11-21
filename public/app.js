let formPlato = document.getElementById("formPlato")

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