

function alterarConta(){
    Swal.fire({
        title:"Editar informações",
        html:'<form id="EditarInformacao">'+
        '<input id="FormNome" placeholder="Nome:" class="txtEditar" type="text">'+
        '<input id="formCpf" placeholder="Cpf:"class="txtEditar" type="text">'+
        '<input id="formTelefone" placeholder="Telefone:" class="txtEditar" type="text">'+
        '<input id="formSenha" placeholder="Senha:" type="password"class="txtEditar" type="text">'+
        '<input id="formConfirmar"placeholder="Confirmar nova senha:" type="password" class="txtEditar" type="text">'+
        '</form>',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: `Save`,
        denyButtonText: `Don't save`,
    });
}

function excluirConta(){
    Swal.fire({
        text: "Você realmente deseja deletar esta conta?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText:'Não',
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

