/* proximos passos do mapa
 * -infobox
 * -icones
 */

function GetMap() {
    var map = new Microsoft.Maps.Map('#myMap');


    var center = map.getCenter();

    //Create custom Pushpin
    var pin = new Microsoft.Maps.Pushpin(center, {
        icon: 'LogoRecycloV1-mapa-icon.png',
        anchor: new Microsoft.Maps.Point(12, 39)
    });

    //Add the pushpin to the map
    map.entities.push(pin);
    //Add your post map load code here.
}



function alert() {

}


var nome = localStorage.getItem('nome');
var senha = localStorage.getItem('senha');


fetch(`https://backend-recyclo.herokuapp.com/usuario/user/${nome}/${senha}`, {
        method: 'get'
    })
    .then((resp) => resp.json())
    .then(function(data) {

        // informações vindas da API
        // document.getElementById("cpf").innerHTML = data.cd_cpf;
        // document.getElementById("senha").innerHTML = data.cd_senha;
        // document.getElementById("email").innerHTML = data.ds_email;

        // Nomo do localstorage
        // var x = localStorage.getItem('nome');
        // document.getElementById("usuario").innerHTML = x;
    })
    .catch(function(err) {
        console.error(err);
    });