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

// Código JS Back-End - Cadastro Usuario

$(document).ready(() => {

    $("#cpf").mask("999.999.999-99");

    $("#formUser").submit((event) => {


        event.preventDefault();

        var nome = document.getElementById("nome").value;
        var email = document.getElementById("email").value;
        var cpf = document.getElementById("cpf").value;
        var senha = document.getElementById("senha").value;
        var ConfirmSenha = document.getElementById("ConfirmarSsenha").value;

        if (senha != "" && ConfirmSenha != "" && senha === ConfirmSenha) {

            Swal.fire({
                title: 'Aguarde...',
                html: '<img src="./Gif-Recyclo.gif" alt="description of gif" style="display: block;  margin-left: auto;margin-right: auto;" width="600" height="600" /> ',
                //lembrar que tira o click do fundo 
                allowOutsideClick: false,
                showCancelButton: false,
                showConfirmButton: false,
                onBeforeOpen: () => {
                    Swal.showLoading()
                },
            });


            var obj = JSON.stringify({
                "nome": nome,
                "email": email,
                "cpf": cpf,
                "senha": senha,
            })

            // var url = "http://localhost:8080/usuario/criar/";
            var url = "https://backend-recyclo.herokuapp.com/usuario/criar/";

            var request = new XMLHttpRequest();
            request.open("POST", url);

            request.setRequestHeader("Accept", "application/json");
            request.setRequestHeader("Content-Type", "application/json");
            request.setRequestHeader('Access-Control-Allow-Origin', '*');

            request.onreadystatechange = function() {
                if (request.readyState === 4) {
                    console.log(request.status);
                    console.log(request.responseText);
                }
            };

            request.send(obj);

            Swal.fire(
                'Parabéns!',
                'Cadastrado com sucesso!',
                'success'
            )

        } else {
            Swal.fire({
                icon: 'error',
                title: 'Opa,',
                text: 'Revise sua informações!',
            })
        }

    });
});


// Código JS Back-End - Cadastro Empresa

$(document).ready(() => {

    $("#cnpj").mask("99.999.999/9999-99");
    $("#tel").mask("(00) 0000-0000");

    $("#formCompany").submit((event) => {

        event.preventDefault();

        var razao = document.getElementById("razao").value;
        var telefone = document.getElementById("tel").value;
        var email = document.getElementById("Email").value;
        var cnpj = document.getElementById("cnpj").value;
        var senha = document.getElementById("Senha").value;
        var ConfirmaSenha = document.getElementById("ConfirmarSenha").value;

        if (senha != "" && ConfirmaSenha != "" && senha === ConfirmaSenha) {

            Swal.fire({
                title: 'Aguarde...',
                html: '<img src="./Gif-Recyclo.gif" alt="description of gif" style="display: block;  margin-left: auto;margin-right: auto;" width="600" height="600" /> ',
                //lembrar que tira o click do fundo 
                allowOutsideClick: false,
                showCancelButton: false,
                showConfirmButton: false,
                onBeforeOpen: () => {
                    Swal.showLoading()
                },
            });


            var obj = JSON.stringify({
                "nome": razao,
                "email": email,
                "telefone": telefone,
                "cnpj": cnpj,
                "senha": senha,
            })

            console.log(obj);

            // var url = "http://localhost:8080/empresa/criar/";
            var url = "https://backend-recyclo.herokuapp.com/empresa/criar/";


            var request = new XMLHttpRequest();
            request.open("POST", url);

            request.setRequestHeader("Accept", "application/json");
            request.setRequestHeader("Content-Type", "application/json");
            request.setRequestHeader('Access-Control-Allow-Origin', '*');


            request.onreadystatechange = function() {

                if (request.readyState === 4) {
                    console.log(request.status);
                    console.log(request.responseText);
                }
            };

            request.send(obj);

            Swal.fire(
                'Parabéns!',
                'Cadastrado com sucesso!',
                'success'
            )
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Opa,',
                text: 'Revise sua informações!',
            })
        }

    });
});