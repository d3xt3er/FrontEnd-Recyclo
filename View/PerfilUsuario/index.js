function alterarConta() {
    Swal.fire({
        title: "Editar informações",
        html: '<form id="EditarInformacao">' +
            '<input id="FormNome" placeholder="Nome:" class="txtEditar" type="text">' +
            '<input id="formCpf" placeholder="CPF:"class="txtEditar" type="text">' +
            '<input id="formTelefone" placeholder="Telefone:" class="txtEditar" type="text">' +
            '<input id="formSenha" placeholder="Senha:" type="password"class="txtEditar" type="text">' +
            '<input id="formConfirmar"placeholder="Confirmar nova senha:" type="password" class="txtEditar" type="text">' +
            '</form>',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: `Salvar`,
        denyButtonText: `Don't save`,
    });
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
            //funcao deletar
            Swal.fire(
                'Conta excluida com sucesso',
                '',
                'success'
            )
        }
    })
}




var nome = localStorage.getItem('nome');
var senha = localStorage.getItem('senha');

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