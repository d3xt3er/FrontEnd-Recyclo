// Codigo JS Front-End
var frmEmpresa = document.getElementById("formEmpresa");
var frmUsuario = document.getElementById("formUsuario");

frmEmpresa.style.display = "none";

document.getElementById("changeE").style.background = "white";

document.getElementById("changeU").style.background = "#35d786";
// Troca o form a de cadastro entre
function SwitchForm(op) {

    // Usuario
    if (op == false) {
        frmEmpresa.style.display = "none";
        frmUsuario.style.display = "flex";
        document.getElementById("changeE").style.background = "white";
        document.getElementById("changeU").style.background = "#35d786";
    }

    // Empresa
    else if (op == true) {
        frmUsuario.style.display = "none";
        frmEmpresa.style.display = "flex";
        document.getElementById("changeE").style.background = "#35d786";
        document.getElementById("changeU").style.background = "white";
    }
}



// Login - Usuario
$(document).ready(() => {
    $("#formUsuario").submit((event) => {
        Swal.fire({
            title: 'Aguarde...',
            html: '<img src="./Gif-Recyclo.gif" alt="description of gif" style="display: block;  margin-left: auto;margin-right: auto;" width="200" height="200" /> ',
            //lembrar que tira o click do fundo 
            allowOutsideClick: false,
            showCancelButton: false,
            showConfirmButton: false,
            onBeforeOpen: () => {
                Swal.showLoading()
            },
        });
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
                    window.location.replace("../mapa_usuario/index.html");

                    // Utilizando localStorage para setar nome e senha
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


// Login - Empresa
$(document).ready(() => {
    $("#formCompany").submit((event) => {
        Swal.fire({
            title: 'Aguarde...',
            html: '<img src="./Gif-Recyclo.gif" alt="description of gif" style="display: block;  margin-left: auto;margin-right: auto;" width="200" height="200" /> ',
            //lembrar que tira o click do fundo 
            allowOutsideClick: false,
            showCancelButton: false,
            showConfirmButton: false,
            onBeforeOpen: () => {
                Swal.showLoading()
            },
        });
        event.preventDefault();

        var razao = document.getElementById("razao").value;
        var senha = document.getElementById("senhaEmpresa").value;

        var request = new XMLHttpRequest();
        // var url = "http://localhost:8080/empresa/login/" + razao + "/" + senha + "";
        var url = "https://backend-recyclo.herokuapp.com/empresa/login/" + razao + "/" + senha + "";

        request.open("GET", url, true);
        request.setRequestHeader("Content-Type", "application/json");
        request.setRequestHeader('Access-Control-Allow-Origin', '*');

        request.onreadystatechange = function() {

            if (request.readyState === 4 && request.status === 200) {
                var json = (request.responseText);

                if (json == 'Usuario encontrado!') {
                    window.location.replace("../mapa_empresa/index.html");

                    // Utilizando localStorage para setar nome e senha
                    localStorage.setItem('nome', razao);
                    localStorage.setItem('senha', senha);

                    localStorage['nome'] = razao;
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