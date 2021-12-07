function goMapa() {window.location.assign("mapa_principal/index.html");}
function goSobre() {window.location.assign("Sobre/index.html");}
function gologin() {window.location.assign("Login/index.html");}
function goCadastro() {window.location.assign("Cadastro/index.html");}
function goHome(){window.location.assign("../index.html")}


function showMenu(){

    if(document.getElementById('navMob').style.display=="none")
        document.getElementById('navMob').style.display="initial";
    else
        document.getElementById('navMob').style.display="none";
}   