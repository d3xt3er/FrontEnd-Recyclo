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

function home() { window.location.assign("../index.html"); }

// Código JS Back-End - Cadastro Usuario

$(document).ready(() => {

    $("#cpf").mask("999.999.999-99");

    $("#formUser").submit((event) => {


        event.preventDefault();

        var nome = document.getElementById("nome").value;
        var email = document.getElementById("email").value;
        var celular = document.getElementById("celular").value;
        var cpf = document.getElementById("cpf").value;
        var senha = document.getElementById("senha").value;
        var ConfirmSenha = document.getElementById("ConfirmarSsenha").value;

        if (senha != ConfirmSenha) {
            Swal.fire({
                icon: 'error',
                title: 'Desculpe,',
                text: 'Senhas são diferentes!',
            })
            return false;
        } else {
            $.ajax({
                    method: "POST",

                    url: "https://backend-recyclo.herokuapp.com/usuario/criar/",
                    data: { nome: nome, email: email, celular: celular, cpf: cpf, senha: senha, confSenha: ConfirmSenha },
                    beforeSend: function() {
                        Swal.fire({
                            title: 'Aguarde...',
                            html: '<img src="../img/Gif-Recyclo.gif" alt="description of gif" style="display: block;  margin-left: auto;margin-right: auto;" width="600" height="600" /> ',
                            //lembrar que tira o click do fundo 
                            allowOutsideClick: false,
                            showCancelButton: false,
                            showConfirmButton: false,
                            onBeforeOpen: () => {
                                Swal.showLoading()
                            },
                        });
                    }
                }).done(function(msg) {
                    Swal.fire(
                        'Parabéns!',
                        'Cadastrado com sucesso!',
                        'success'
                    ).then(() => {
                        window.location.assign("../Login/index.html");
                    })


                })
                .fail(function(msg) {
                    if (msg.responseText == 'Usuário já cadastrado') {
                        Swal.fire({
                            icon: 'error',
                            title: 'Desculpe,',
                            text: 'Este E-mail ou CPF de usuário ja existe!',
                        })
                    }
                });
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


        if (senha != ConfirmaSenha) {
            Swal.fire({
                icon: 'error',
                title: 'Desculpe,',
                text: 'Senhas são diferentes!',
            })
            return false;
        } else {
            $.ajax({
                    method: "POST",
                    url: "https://backend-recyclo.herokuapp.com/empresa/criar/",
                    data: { nome: razao, email: email, telefone: telefone, cnpj: cnpj, senha: senha, confSenha: ConfirmaSenha },
                    beforeSend: function() {
                        Swal.fire({
                            title: 'Aguarde...',
                            html: '<img src="../img/Gif-Recyclo.gif" alt="description of gif" style="display: block;  margin-left: auto;margin-right: auto;" width="600" height="600" /> ',
                            //lembrar que tira o click do fundo 
                            allowOutsideClick: false,
                            showCancelButton: false,
                            showConfirmButton: false,
                            onBeforeOpen: () => {
                                Swal.showLoading()
                            },
                        });
                    }
                }).done(function(msg) {
                    Swal.fire(
                        'Parabéns!',
                        'Cadastrado com sucesso!',
                        'success',

                    ).then(() => {
                        window.location.assign("../Login/index.html");
                    })

                })
                .fail(function(msg) {
                    if (msg.responseText == 'Empresa já cadastrada') {
                        Swal.fire({
                            icon: 'error',
                            title: 'Desculpe,',
                            text: 'Este E-mail ou CNPJ de usuário ja existe!',
                        })
                    }
                });
        }

    });
});