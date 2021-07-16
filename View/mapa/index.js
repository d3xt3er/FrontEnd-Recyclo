// mapa
function GetMap() {
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