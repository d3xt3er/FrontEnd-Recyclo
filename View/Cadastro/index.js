 

var frmEmpresa = document.getElementById("formEmpresa");
var frmUsuario =document.getElementById("formUsuario"); 

frmEmpresa.style.display = "none";
document.getElementById("changeE").style.background ="white";
        document.getElementById("changeU").style.background = "#35d786";
// Troca o form a de cadastro entre
function SwitchForm(op){
    
    // Usuario
    if(op==false){
        frmEmpresa.style.display = "none";
        frmUsuario.style.display = "flex";
        document.getElementById("changeE").style.background ="white";
        document.getElementById("changeU").style.background = "#35d786";
    }
    
    // Empresa
    else if(op == true){
        frmUsuario.style.display = "none";
        frmEmpresa.style.display = "flex";
        document.getElementById("changeE").style.background ="#35d786";
        document.getElementById("changeU").style.background = "white";
    }
}
