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


// Função de pesquisa - mapa empresa
let map, searchManager;

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

        map.setView({ center: loc, zoom: 14 });
        Microsoft.Maps.Events.addHandler(map, 'click', mapClicked);
    });
    // teste de icone

    fetch(`https://backend-recyclo.herokuapp.com/empresa/ponto/${nome}/${senha}`).then((resp) => resp.json())
        .then(function(data) {

            for (var i = 0, len = data.length; i < len; i++) {
                var pushpin = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(data[i].cd_latitude_ponto, data[i].cd_longitude_ponto));

                map.entities.push(pushpin);

                pushpin.metadata = {
                    title: data[i].nm_ponto,
                    description: '<img src="../img/homeNext.jpg"  width="50" height="50"/>'
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

// pegando a localizacao, latitude e longitude
function mapClicked(e) {

    var locations = JSON.stringify({
        "latitude": e.location.latitude,
        "longitude": e.location.longitude,
    })

    console.log(locations);
}



// Função pesquisa do mapa
function Search() {
    if (!searchManager) {
        //Create an instance of the search manager and perform the search.
        Microsoft.Maps.loadModule('Microsoft.Maps.Search', function() {
            searchManager = new Microsoft.Maps.Search.SearchManager(map);
            Search()
        });
    } else {
        //Remove any previous results from the map.
        map.entities.clear();
        //Get the users query and geocode it.
        let query = document.getElementById('from').value;
        geocodeQuery(query);
    }
}

function geocodeQuery(query) {
    let searchRequest = {
        where: query,
        callback: function(r) {
            if (r && r.results && r.results.length > 0) {
                let pin, pins = [],
                    locs = [],
                    output = 'Resultado: ';
                for (let i = 0; i < r.results.length; i++) {
                    //Cria um marker por resultado.
                    pin = new Microsoft.Maps.Pushpin(r.results[i].location, {
                        text: i + ''
                    });
                    pins.push(pin);
                    locs.push(r.results[i].location);
                    output += i + ') ' + r.results[i].name + '<br/>';
                }
                //Adiciona o marker no mapa
                map.entities.push(pins);

                //Mostra o resultado em texto
                // document.getElementById('output').innerHTML = output;

                //Determine a bounding box to best view the results.
                let bounds;
                if (r.results.length == 1) {
                    bounds = r.results[0].bestView;
                } else {
                    //Use the locations from the results to calculate a bounding box.
                    bounds = Microsoft.Maps.LocationRect.fromLocations(locs);
                }
                map.setView({
                    bounds: bounds
                });
            }
        },
        errorCallback: function(e) {
            alert("Nenhum resultado encontrado.");
        }
    };
    //Make the geocode request.
    searchManager.geocode(searchRequest);
}

//Botão de pesquisa
function pesquisa() {
    var button = document.getElementById("get");
    button.addEventListener("click", Search());
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





var nome = localStorage.getItem('nome');
var senha = localStorage.getItem('senha');
//http://localhost:8080/empresa/ponto/${nome}/${senha} || https://backend-recyclo.herokuapp.com/empresa/ponto/${nome}/${senha}
fetch(`https://backend-recyclo.herokuapp.com/empresa/ponto/${nome}/${senha}`, {
        method: 'get'
    })
    .then((resp) => resp.json())
    .then(function(data) {
        // data.forEach(location => {
        //     document.getElementById("tituloEmp").innerHTML = location.nm_ponto;
        //     document.getElementById("nmEmpresa").innerHTML = location.nm_empresa;

        // });

    })
    .catch(function(err) {
        console.log(err);
    });