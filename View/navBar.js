// Troca de background da navbar
window.addEventListener('scroll', function() {
   
    var nav = document.getElementById('nav');
    var navMob = document.getElementById('navMob');
    
    if(nav.style.display!= "none" && this.window.scrollY > 150)
        nav.style.background ="#5ABE41";
    else
        nav.style.background = "transparent";

    if(navMob.style.display!= "none" && this.window.scrollY > 150)
        navMob.style.background ="#5ABE41";
    else
        navMob.style.background = "transparent";
    
});

