// mapa
/* proximos passos do mapa
 * -infobox
 * -icones
 */

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

function GetMap() {
    // $(document).ready(() => {
    //     $("body").load(() => {
    var map = new Microsoft.Maps.Map('#myMap');

    navigator.geolocation.getCurrentPosition(function(position){
        var loc = new Microsoft.Maps.Location(
            position.coords.latitude,
            position.coords.longitude);

        map.setView({center:loc,zoom:17});
    });
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