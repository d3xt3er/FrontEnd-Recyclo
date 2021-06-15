function login(e) {
    e.preventDefault();

    var nome = document.getElementById("nome").value;
    var senha = document.getElementById("senha").value;

    var request = new Request(`https://backend-recyclo.herokuapp.com/usuario/usuarios/login/${nome}/${senha}`, {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        data: nome,
        senha
    });

    fetch(request)
        .then((response) => {
            return response.json();
        }).then((data) => {
            console.log(data);

        })
        .catch(err => {
            console.log(err);
        });



}