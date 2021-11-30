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
            window.localStorage.removeItem('email');
            window.localStorage.removeItem('senha');
        }
    })
}

let map;

function GetMap() {

    map = new Microsoft.Maps.Map('#myMap', {
        zoom: 15,
        showMapTypeSelector: false,
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        disableStreetside: true,
        customMapStyle: { // mudanca de cores = +identidade
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
    PanningOverlay.prototype = new Microsoft.Maps.CustomOverlay({ beneathLabels: false });

    function PanningOverlay() {
        this.panBtn = document.createElement('button');
        this.panBtn.id = 'btnDenuncia';
        this.panBtn.title = 'Fazer Denuncia';
        this.panBtn.onclick = function() { gerarDenuncia(); }
    }
    PanningOverlay.prototype.onAdd = function() {
        const container = document.createElement('div');
        container.appendChild(this.panBtn);
        container.id = 'divBnt';
        container.style.top = '41vw';
        container.style.left = '50px';
        container.style.position = 'absolute';
        this.setHtmlElement(container);
    }
    const overlay = new PanningOverlay();
    map.layers.insert(overlay);

    var infoboxTemplate = '<div id="infobox">' +
        '<h3 id="ponto">{ponto}</h3>' +
        '<img src="../img/homeNext.jpg">' +
        '<h4>Endereço:</h4>' +
        '<p id="logra">{endereco}</p>' +
        '<button onclick="fecharInfobox()" >X</button>' +
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

function pushingClicked(e) {
    var h3 = document.getElementById('ponto');
    var p = document.getElementById('logra');
    if (e.target.metadata) {
        h3.innerText = e.target.metadata.nmPonto;
        p.innerText = e.target.metadata.endereco;
        infobox.setOptions({

            visible: true,
            location: e.location
        });

    }
}

function fecharInfobox() {
    infobox.setOptions({
        visible: false
    });
}

var email = localStorage.getItem('email');
var senha = localStorage.getItem('senha');



// denuncia
function gerarDenuncia(e) {
    var id_usuario

    fetch(`https://backend-recyclo.herokuapp.com/usuario/user/${email}/${senha}`, {
            method: 'get'
        })
        .then((resp) => resp.json())
        .then(function(data) {

            id_usuario = data.cd_usuario;

        })
        .catch(function(err) {
            console.log(err);
        });
    // console.log(e.location); 
    Swal.fire({
        title: "Gerar Denuncia",
        html: '<form id="frmDenuncia">' +
            `<input type="hidden" value="${id_usuario}" ></input>` +
            '<label>Local para denunciar</label>' +
            '<br>' +
            '<input id="logradouro" type="text"></input>' +
            '<br>' +
            // '<input id="dt" type="date"></input>' +
            '<textarea id="descricao" required placeholder="Descricao do discarte" type="text" autocomplete="off"></textarea>' +
            '</form>',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: `Gerar Denuncia`,
        denyButtonText: `Cancelar`,
    }).then((result) => {
        if (result.isConfirmed) {

            var logradouro = document.getElementById("logradouro").value;
            // var dataDenun = document.getElementById("dt").value;
            var denuncia = document.getElementById("descricao").value;


            $.ajax({
                    method: "POST",
                    // https://backend-recyclo.herokuapp.com/usuario/criar/
                    url: "http://localhost:8080/usuario/criar/denuncia",
                    data: { id: id_usuario, nm_logradouro: logradouro, ds_comentario: denuncia, cd_localizacao: "-23.968 -46.3864825" },
                    beforeSend: function() {
                        Swal.fire({
                            title: 'Aguarde...',
                            html: '<img src="../img/Gif-Recyclo.gif" alt="description of gif" style="display: block;  margin-left: auto;margin-right: auto;" width="600" height="600" /> ',
                            //lembrar que tira o click do fundo 
                            allowOutsideClick: false,
                            showCancelButton: false,
                            showConfirmButton: false,
                            onBeforeOpen: () => {
                                Swal.showLoading()
                            },
                        });
                    }
                }).done(function(msg) {
                    Swal.fire(
                        'Parabéns!',
                        'Cadastrado com sucesso!',
                        'success'
                    )

                })
                .fail(function(msg) {
                    if (msg.responseText == 'Usuário já cadastrado') {
                        Swal.fire({
                            icon: 'error',
                            title: 'Desculpe,',
                            text: 'Este E-mail ou CPF de usuário ja existe!',
                        })
                    }
                });

        }
    })
}