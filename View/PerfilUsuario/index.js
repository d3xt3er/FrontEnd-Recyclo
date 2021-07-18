function alterarConta() {
    Swal.fire({
        title: "Editar informações",
        html: '<form id="EditarInformacao" method="PUT">' +
            '<input id="FormNome" placeholder="Nome:" class="txtEditar" type="text">' +
            '<input id="formCpf" placeholder="CPF:"class="txtEditar" type="text">' +
            '<input id="formTelefone" placeholder="Telefone:" class="txtEditar" type="text">' +
            '<input id="formSenha" placeholder="Senha:" type="password"class="txtEditar" type="text">' +
            '<input id="formConfirmar"placeholder="Confirmar nova senha:" type="password" class="txtEditar" type="text">' +
            '</form>',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: `Salvar`,
        denyButtonText: `Cancelar`,
    }).then((result) => {
        if (result.isConfirmed) {

            //ALTERAR - Usuario
            var id = document.getElementById("id_usuario").textContent;
            var nome = document.getElementById("FormNome").value;
            var telefone = document.getElementById("formTelefone").value;
            var cpf = document.getElementById("formCpf").value;
            var senha = document.getElementById("formSenha").value;

            var user = JSON.stringify({
                "id": id,
                "nome": nome,
                "telefone": telefone,
                "cpf": cpf,
                "senha": senha,
            })

            var url = "https://backend-recyclo.herokuapp.com/usuario/alterar";

            var request = new XMLHttpRequest();
            request.open("PUT", url);

            request.setRequestHeader("Accept", "application/json");
            request.setRequestHeader("Content-Type", "application/json");

            request.onreadystatechange = function() {
                if (request.readyState === 4) {
                    console.log(request.status);
                    console.log(request.responseText);
                }
            };

            request.send(user);


            Swal.fire(
                'Alterado com sucesso!',
                '',
                'success'
            )
        }
    })
}

function excluirConta() {
    Swal.fire({
        text: "Você realmente deseja deletar esta conta?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Não',
        confirmButtonText: 'Sim'
    }).then((result) => {
        if (result.isConfirmed) {
            //DELETAR - Usuario

            var _id = document.getElementById("id_usuario").textContent;

            var usuario = JSON.stringify({
                "id": _id
            })

            var url = "https://backend-recyclo.herokuapp.com/usuario/deletar";

            var request = new XMLHttpRequest();
            request.open("DELETE", url);

            request.setRequestHeader("Accept", "application/json");
            request.setRequestHeader("Content-Type", "application/json");

            request.onreadystatechange = function() {
                if (request.readyState === 4) {
                    console.log(request.status);
                    console.log(request.responseText);
                }
            };

            request.send(usuario);

            Swal.fire(
                'Conta excluida com sucesso',
                '',
                'success'
            )

            // location.replace("../../View/index.html")
        }
    })
}


var nome = localStorage.getItem('nome');
var senha = localStorage.getItem('senha');
var id = localStorage.getItem('id');

fetch(`https://backend-recyclo.herokuapp.com/usuario/user/${nome}/${senha}`, {
        method: 'get'
    })
    .then((resp) => resp.json())
    .then(function(data) {

        // Nome do localstorage
        var name = localStorage.getItem('nome');
        document.getElementById("title").innerHTML = name;

        // informações vindas da API
        document.getElementById("id_usuario").innerHTML = data.cd_usuario;
        document.getElementById("nome").innerHTML = data.nm_usuario;
        document.getElementById("cpf").innerHTML = data.cd_cpf;
        document.getElementById("email").innerHTML = data.ds_email;
        // document.getElementById("senha").innerHTML = data.cd_senha;

    })
    .catch(function(err) {
        console.log(err);
    });


function Logout() {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: 'Tem certeza que deseja sair?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.replace("../login_usuario/index.html");
            window.localStorage.removeItem('nome');
            window.localStorage.removeItem('senha');

        }
    })
}