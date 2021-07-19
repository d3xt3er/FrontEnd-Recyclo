
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

let map;
function GetMap() {
    // $(document).ready(() => {
    //     $("body").load(() => {
     map = new Microsoft.Maps.Map('#myMap');

    navigator.geolocation.getCurrentPosition(function(position){
        var loc = new Microsoft.Maps.Location(
            position.coords.latitude,
            position.coords.longitude);
        map.setView({center:loc,zoom:17});
    });
    // teste de icone
    var pushpin = new Microsoft.Maps.Pushpin(map.getCenter());
        map.entities.push(pushpin);

        //Add mouse events to the pushpin.
        Microsoft.Maps.Events.addHandler(pushpin, 'click',pushingClicked);
    
}

/*
function mapClicked(e){
    Microsoft.Maps.Events.addHandler(currentPishing,"click",pushingClicked);
    document.getElementById('infoMaps').style.display=" ";
}
*/

function fecharinfo(){
    document.getElementById('infoMaps').style.display="none";
}

function changeInfo(nome,telefone,dtcriacao,empresa,email){
    document.getElementById("nmEmpresa").innerText = empresa;
    document.getElementById("telefone").innerText = telefone;
    document.getElementById("dCriacao").innerText=dtcriacao;
    document.getElementsById("tituloEmp").innerText =nome; 
    document.getElementById("emailEmpresa").innerText= email;
    console.log(nome+'\n'+telefone+'\n'+dtcriacao+'\n'+empresa+'\n'+email);
}

function pushingClicked(e){
    document.getElementById('infoMaps').style.display="inherit";
}



var nome = localStorage.getItem('nome');
var senha = localStorage.getItem('senha');

fetch(`https://backend-recyclo.herokuapp.com/usuario/user/${nome}/${senha}`, {
        method: 'get'
    })
    .then((resp) => resp.json())
    .then(function(data) {

        // Nome do localstorage
        // var x = localStorage.getItem('nome');
        // document.getElementById("usuario").innerHTML = x;

        // informações vindas da API
        // document.getElementById("cpf").innerHTML = data.cd_cpf;
        // document.getElementById("senha").innerHTML = data.cd_senha;
        // document.getElementById("email").innerHTML = data.ds_email;

    })
    .catch(function(err) {
        console.log(err);
    });