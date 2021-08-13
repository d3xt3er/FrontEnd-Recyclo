function Back() {
    window.location.replace("../index.html");
}

let map;

function GetMap() {

    map = new Microsoft.Maps.Map('#myMap', {
        zoom: 15,
        mapTypeId: Microsoft.Maps.MapTypeId.road
    });

    infobox = new Microsoft.Maps.Infobox(map.getCenter(), {
        visible: false
    });

    infobox.setMap(map);

    navigator.geolocation.getCurrentPosition(function(position) {
        var loc = new Microsoft.Maps.Location(
            position.coords.latitude,
            position.coords.longitude);

        map.setView({ center: loc, zoom: 12 });
        Microsoft.Maps.Events.addHandler(map, 'click');
    });

    fetch(`https://backend-recyclo.herokuapp.com/empresa/ponto/`).then((resp) => resp.json())
        .then(function(data) {

            for (var i = 0, len = data.length; i < len; i++) {
                var pushpin = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(data[i].cd_latitude_ponto, data[i].cd_longitude_ponto));

                map.entities.push(pushpin);


                pushpin.metadata = {
                    title: data[i].nm_ponto,
                    description: '<b>Empresa: </b>' + data[i].nm_empresa + '<br>' + '<img src="../img/homeNext.jpg"  width="50" height="50"/><br>' + '<b>Endereço: </b>' + data[i].nm_logradouro
                };

                Microsoft.Maps.Events.addHandler(pushpin, 'click', pushingClicked);
            }

        })
        .catch(function(err) {
            console.log(err);
        });

}

function pushingClicked(e) {
    // document.getElementById('infoMaps').style.display = "inherit";
    if (e.target.metadata) {
        //Set the infobox options with the metadata of the pushpin.
        infobox.setOptions({
            location: e.target.getLocation(),
            title: e.target.metadata.title,
            description: e.target.metadata.description,
            visible: true
        });
    }
}

// function mapClicked(e) {
//     console.log(e.location); // pegando a localizacao
// }


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