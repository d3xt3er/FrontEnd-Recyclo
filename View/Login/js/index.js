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
        frmUsuario.style.display = "initial";
        document.getElementById("changeE").style.background = "white";
        document.getElementById("changeU").style.background = "#35d786";
    }

    // Empresa
    else if (op == true) {
        frmUsuario.style.display = "none";
        frmEmpresa.style.display = "initial";
        document.getElementById("changeE").style.background = "#35d786";
        document.getElementById("changeU").style.background = "white";
    }
}

function home(){window.location.assign("../index.html");}

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

        var email = document.getElementById("email").value;
        var senha = document.getElementById("senha").value;

        var request = new XMLHttpRequest();
        var url = "http://localhost:8080/usuario/login/" + email + "/" + senha + "";
        // var url = "https://backend-recyclo.herokuapp.com/usuario/login/" + email + "/" + senha + "";

        request.open("GET", url, true);
        request.setRequestHeader("Content-Type", "application/json");
        request.setRequestHeader('Access-Control-Allow-Origin', '*');

        request.onreadystatechange = function() {

            if (request.readyState === 4 && request.status === 200) {
                var json = (request.responseText);

                if (json == 'Usuario encontrado!') {
                    window.location.replace("../mapa_usuario/index.html");

                    // Utilizando localStorage para setar email e senha
                    localStorage.setItem('email', email);
                    localStorage.setItem('senha', senha);

                    localStorage['email'] = email;
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
                    localStorage.setItem('email', razao);
                    localStorage.setItem('senha', senha);

                    localStorage['email'] = razao;
                    localStorage['senha'] = senha;
                    /*
                        localStorage['Tipo'] = 'usuario' || empresa
                        Facilitar a manipulacao da navbar 
                    */
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