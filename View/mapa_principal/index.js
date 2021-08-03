function Back() {
    window.location.replace("../index.html");
}

let map;

function GetMap() {

    // map = new Microsoft.Maps.Map('#myMap');

    map = new Microsoft.Maps.Map('#myMap', {
        zoom: 15,
        mapTypeId: Microsoft.Maps.MapTypeId.aerial
    });

    navigator.geolocation.getCurrentPosition(function(position) {
        var loc = new Microsoft.Maps.Location(
            position.coords.latitude,
            position.coords.longitude);

        // map.setView({ center: loc, zoom: 12 });
        Microsoft.Maps.Events.addHandler(map, 'click', mapClicked);
    });
    // teste de icone
    var pushpin = new Microsoft.Maps.Pushpin(map.getCenter());
    map.entities.push(pushpin);

    //Add mouse events to the pushpin.
    Microsoft.Maps.Events.addHandler(pushpin, 'click', pushingClicked);

}

function mapClicked(e) {
    console.log(e.location); // pegando a localizacao
}


function fecharinfo() {
    document.getElementById('infoMaps').style.display = "none";
}

function changeInfo(nome, telefone, dtcriacao, empresa, email) {
    document.getElementById("nmEmpresa").innerText = empresa;
    document.getElementById("telefone").innerText = telefone;
    document.getElementById("dCriacao").innerText = dtcriacao;
    document.getElementsById("tituloEmp").innerText = nome;
    document.getElementById("emailEmpresa").innerText = email;
    console.log(nome + '\n' + telefone + '\n' + dtcriacao + '\n' + empresa + '\n' + email);
}

function pushingClicked(e) {
    document.getElementById('infoMaps').style.display = "inherit";
}



// fetch(`https://backend-recyclo.herokuapp.com/usuario/user/${nome}/${senha}`, {
//         method: 'get'
//     })
//     .then((resp) => resp.json())
//     .then(function(data) {

//         // informações vindas da API
//         document.getElementById("cpf").innerHTML = data.cd_cpf;
//         document.getElementById("senha").innerHTML = data.cd_senha;
//         document.getElementById("email").innerHTML = data.ds_email;

//     })
//     .catch(function(err) {
//         console.log(err);
//     });