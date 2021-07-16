// invoca form para a edicao das 
// informacoes do estabecimento

function EditarInfo(){
    
    Swal.fire({
        title:"Editar informações",
        html:'<form id="EditarInformacao">'+
        '<input id="FormNome" class="txtEditar" type="text">'+
        '<input id="formCnpj" class="txtEditar" type="text">'+
        '<input id="formTelefone" class="txtEditar" type="text">'+
        '<input id="formSenha" type="password"class="txtEditar" type="text">'+
        '<input id="formConfirmar" type="password" class="txtEditar" type="text">'+
        '</form>',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: `Save`,
        denyButtonText: `Don't save`,
    });
}

// deletar Ponto de coleta
function deletarPonto(){
    Swal.fire({
        text: "Você realmente deseja deletar esta ponto de coleta?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Ponto Deletado',
            '',
            'success'
          )
        }
      })
} 

function adicionarPonto(){
    Swal.fire({
        title:"Adicionar Ponto de Coleta",
        html:'<form id="EditarInformacao">'+
        '<input id="nmPonto" placeholder="Nome do Ponto:" class="txtEditar" type="text">'+
        '<input id="pontoTelefone" placeholder="telefone do Ponto:" class="txtEditar" type="text">'+
        '</form>',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: `Adicionar`,
        denyButtonText: `Cancelar`,
    });
}

function editarPonto(){
  Swal.fire({
    title:"Adicionar Ponto de Coleta",
    html:'<form id="EditarInformacao">'+
    '<input id="nmPonto" placeholder="Nome do Ponto:" class="txtEditar" type="text">'+
    '<input id="pontoTelefone" placeholder="telefone do Ponto:" class="txtEditar" type="text">'+
    '</form>',
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: `Adicionar`,
    denyButtonText: `Cancelar`,
});
}




function a(){
    var novoPonto ='<ul class="ponto">'+
        '<li>nome Ponto</li>'+
        '<li>Telefone ponto</li>'+
        '<li style="float:right;" ><img title="Deletar" onclick="deletarPonto()" class="PontoIcone" src="../img/icones/deletar.png"></li>'+
        '<li style="float:right" ><img title="Editar" class="PontoIcone" src="../img/icones/editar.png"></li>'+
        '</ul> ';
    var d=0;  
    document.getElementById("pontos").innerHTML+=novoPonto;
    
}
