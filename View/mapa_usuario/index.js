function Logout() {
    Swal.fire({
        title: 'Tem certeza que deseja sair?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Não',
        confirmButtonText: 'Sim'
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.replace("../Login/index.html");
            window.localStorage.removeItem('nome');
            window.localStorage.removeItem('senha');
        }
    })
}

let map;

function GetMap() {

    // map = new Microsoft.Maps.Map('#myMap');

    map = new Microsoft.Maps.Map('#myMap', {
        zoom: 15,
        mapTypeId: Microsoft.Maps.MapTypeId.road
    });

    navigator.geolocation.getCurrentPosition(function(position) {
        var loc = new Microsoft.Maps.Location(
            position.coords.latitude,
            position.coords.longitude);

        map.setView({ center: loc, zoom: 14 });
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

// function changeInfo(nome, telefone, dtcriacao, empresa, email) {
//     document.getElementById("nmEmpresa").innerText = empresa;
//     document.getElementById("telefone").innerText = telefone;
//     document.getElementById("dCriacao").innerText = dtcriacao;
//     document.getElementsById("tituloEmp").innerText = nome;
//     document.getElementById("emailEmpresa").innerText = email;
//     console.log(nome + '\n' + telefone + '\n' + dtcriacao + '\n' + empresa + '\n' + email);
// }

function pushingClicked(e) {
    document.getElementById('infoMaps').style.display = "inherit";
}