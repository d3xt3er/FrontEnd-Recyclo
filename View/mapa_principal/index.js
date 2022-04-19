function Back() {
    window.location.replace("../index.html");
}
let map;

function GetMap() {
    map = new Microsoft.Maps.Map('#myMap', {
        zoom: 15,
        showMapTypeSelector: false,
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        disableStreetside: true,
        customMapStyle: {//Leve alteracao de cores na vegetacao e ruas
            elements: {
                area: { fillColor: '#72ec89' },
                water: { fillColor: '#2bb5e8' },
                tollRoad: { fillColor: '#a964f4', strokeColor: '#a964f4' },
                arterialRoad: { fillColor: '#ffffff', strokeColor: '#d7dae7' },
                road: { fillColor: '#ffb071', strokeColor: '#ff9c4f' },
                street: { fillColor: '#ffffff', strokeColor: '#ffffff' },
                transit: { fillColor: '#000000' }
            },
            settings: {
                landColor: '#efe9e1'
            }
        }
    });

    // Botao gerar denuncia
    PanningOverlay.prototype = new Microsoft.Maps.CustomOverlay({ beneathLabels : false });
    function PanningOverlay(){
        this.panBtn = document.createElement('button');
        this.panBtn.id ='btnDenuncia';
        this.panBtn.title = 'Fazer Denuncia';
        this.panBtn.onclick = function(){gerarDenuncia();
        }

        this.linkLogin = document.createElement('a');
        this.linkLogin.innerText='Login';
        this.linkLogin.href='../Login/index.html';

        this.Link = document.createElement('a');
        this.Link.innerText='Mapa';
        this.Link.href='../mapa_principal/index.html';
        
        this.index = document.createElement('a');
        this.index.innerText='Home';
        this.index.href='index.html"';

    }
    PanningOverlay.prototype.onAdd = function () {
        const container = document.createElement('div');
        container.appendChild(this.panBtn);
        container.id='divBnt';
        container.style.top = '41vw';
        container.style.left = '50px';
        container.style.position='absolute';

        const menu = document.createElement('ul');
        menu.id='navMobMaps';
        menu.style.display = 'none';

        var liLogin = document.createElement('li');
        liLogin.appendChild(this.linkLogin);

        var li = document.createElement('li');
        li.appendChild(this.index);
        
        menu.appendChild(liLogin);
        menu.appendChild(li);

        this.setHtmlElement(menu);
    }
    const overlay = new PanningOverlay();
    map.layers.insert(overlay);

    var infoboxTemplate ='<div id="infobox">'+
        '<h3 id="ponto">{ponto}</h3>'+
        '<img src="../img/homeNext.jpg">'+
        '<h4>Endereço:</h4>'+
        '<p id="logra">{endereco}</p>'+
        '<button onclick="fecharInfobox()" >X</button>'+
        '</div>';
    infobox = new Microsoft.Maps.Infobox(map.getCenter(), {
        htmlContent: infoboxTemplate.replace(
            '{ponto}', 'nmPonto').replace('{endereco}', 'endereco')
    });

    infobox.setMap(map);
    fecharInfobox();
    
    navigator.geolocation.getCurrentPosition(function(position) {
        var loc = new Microsoft.Maps.Location(
            position.coords.latitude,
            position.coords.longitude);

        map.setView({ center: loc, zoom: 12 });
        Microsoft.Maps.Events.addHandler(map, 'click');
    });

    fetch(`https://backend-recyclo.herokuapp.com/empresa/ponto/`).then((resp) => resp.json())
        .then(function(data) {
            // gerando os pontos do mapa
            for (var i = 0, len = data.length; i < len; i++) {
                var pushpin = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(data[i].cd_latitude_ponto, data[i].cd_longitude_ponto), {
                    icon: '../img/coleta.png',
                    acnchor: new Microsoft.Maps.Point(20, 20)
                });

                map.entities.push(pushpin);

                pushpin.metadata = {
                    nmPonto: data[i].nm_ponto,
                    empresa: data[i].nm_empresa,
                    endereco: data[i].nm_logradouro
                };
                /* pushpin.metadata = {
                     title: data[i].nm_ponto,
                     description: '<b>Empresa: </b>' + data[i].nm_empresa + '<br>' + '<img src="../img/homeNext.jpg"  width="50" height="50"/><br>' + '<b>Endereço: </b>' + data[i].nm_logradouro
                 };
                 */
                Microsoft.Maps.Events.addHandler(pushpin, 'click', pushingClicked);
            }
        })
        .catch(function(err) {
            console.log(err);
        });
}

// Exibe informacoes do ponto clickado 
function pushingClicked(e) {
    var h3 = document.getElementById('ponto');
    var p = document.getElementById('logra');
    if (e.target.metadata) {
        h3.innerText = e.target.metadata.nmPonto;
        p.innerText = e.target.metadata.endereco;
        infobox.setOptions({
            visible:true,
            location:e.location
        });   

    }
}

function fecharInfobox() {
    infobox.setOptions({
        visible: false
    });
}

// denuncia
function gerarDenuncia(){
    // console.log(e.location); 
    Swal.fire({
        title: "Denuniar de discarte ilegal",
        html:'<form id="frmDenuncia">' +
            '<input id="dt" type="date"></input>'+
            '<textarea id="descricao" maxlength="200" required placeholder="Descricao do discarte" type="text" autocomplete="off"></textarea>' +
            '</form>',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: `Gerar Denuncia`,
        denyButtonText: `Cancelar`,
    });
}
function showMenu(){

    if(document.getElementById('navMobMaps').style.display=="none")
        document.getElementById('navMobMaps').style.display="initial";
    else
        document.getElementById('navMobMaps').style.display="none";
}  