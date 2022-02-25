 //  Alteracao de menu ao verificar se o Usuario
// efetuou o login

    // Menu Mobile
    var MobaPerfil = document.createElement('a');
    var MobaLogout = document.createElement('a');
    var MobaSobre = document.createElement('a');
    var MobaLogin = document.createElement('a');
    
    const MobliLogin = document.createElement('li');
    MobaLogin.innerText = "Login";
    MobaLogin.href="View/Login/index.html";
    MobliLogin.appendChild(MobaLogin);
    
    const MobliPerfil = document.createElement('li');
    MobaPerfil.innerText = "Perfil";
    MobaPerfil.href="";
    MobliPerfil.appendChild(MobaPerfil);
    
    const MobliSobre = document.createElement('li');
    MobaSobre.innerText = "Sobre";
    MobaSobre.href="Sobre/index.html";
    MobliSobre.appendChild(MobaSobre);
    
    const MobliLLogout = document.createElement('li');
    MobaLogout.innerText ="Sair";
    MobaLogout.onclick =function (){
        console.log("Amigo oliver")
    };
    MobliLLogout.appendChild(MobaLogout);
    
    
        // Menu DeskTop
    var aPerfil = document.createElement('a');
    var aLogout = document.createElement('a');
    var aSobre = document.createElement('a');
    var aLogin = document.createElement('a');
    
    const liLogin = document.createElement('li');
    aLogin.innerText = "Login";
    aLogin.href='Login/index.html';
    aLogin.className='lia';
    liLogin.appendChild(aLogin);
    
    const liPerfil = document.createElement('li');
    aPerfil.innerText = "Perfil";
    aPerfil.href="";
    aPerfil.className ='lia';
    liPerfil.appendChild(aPerfil);
    
    const liSobre = document.createElement('li');
    aSobre.innerText = 'Sobre';
    aSobre.href = 'Sobre/index.html';
    aSobre.className ='lia';
    liSobre.appendChild(aSobre);
    
    const liLLogout = document.createElement('li');
    aLogout.innerText ="Sair";
    aLogout.className ='lia';
    aLogout.onclick =function (){
        console.log("Amigo oliver")
    };
    liLLogout.appendChild(aLogout);
    
    //  Exibindo opcoes de perfil e logout para usuario 
    // que ja efetuarao o login
    
    if(localStorage.getItem('email')!=null){
        
        document.getElementById('nav').appendChild(liLLogout);
        document.getElementById('nav').appendChild(liPerfil);
    
        document.getElementById('navMob').appendChild(MobliPerfil);   
        document.getElementById('navMob').appendChild(MobliLLogout);
    }
    //Exibicao para o usuario nao efetuou o Login
    else{
        document.getElementById('nav').appendChild(liLogin);
        document.getElementById('navMob').appendChild(MobliLogin);
    }
    
    document.getElementById('nav').appendChild(liSobre);
    document.getElementById('navMob').appendChild(MobliSobre);


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