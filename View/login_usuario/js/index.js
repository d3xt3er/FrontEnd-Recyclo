$(document).ready(function() {
    $("#form").submit(function(event) {
        // Swal.fire({
        //     title: 'Aguarde',
        //     html: '<img src="./Gif-Recyclo.gif" alt="description of gif" style="display: block;  margin-left: auto;margin-right: auto;" width="600" height="600" /> ',
        //     //lembrar que tira o click do fundo 
        //     allowOutsideClick: false,
        //     showCancelButton: false,
        //     showConfirmButton: false,
        //     onBeforeOpen: () => {
        //         Swal.showLoading()
        //     },
        // });
        event.preventDefault();

        var nome = document.getElementById("nome").value;
        var senha = document.getElementById("senha").value;

        var request = new XMLHttpRequest();
        // var url = "http://localhost:8080/usuario/login/" + nome + "/" + senha + "";
        var url = "https://backend-recyclo.herokuapp.com/usuario/login/" + nome + "/" + senha + "";

        request.open("GET", url, true);
        request.setRequestHeader("Content-Type", "application/json");
        request.setRequestHeader('Access-Control-Allow-Origin', '*');

        request.onreadystatechange = function() {

            if (request.readyState === 4 && request.status === 200) {
                var json = (request.responseText);

                if (json == 'Usuario encontrado!') {
                    window.location.replace("../mapa/index.html");
                    console.log(json);
                    // Utilizando localStorage capturando nome
                    localStorage.setItem('nome', nome);
                    localStorage.setItem('senha', senha);

                    localStorage['nome'] = nome;
                    localStorage['senha'] = senha;


                } else if (json == 'Usuario não existente') {
                    Swal.fire({
                        icon: 'error',
                        title: 'Desculpe,',
                        text: 'Não te encontramos em nosso sistema!',
                    })
                }
            }
        };
        request.send();
    });
});