//funcao para deixar habilitar apenas um checkbox
function check(input){
    var checkboxes = document.getElementsByClassName("envCheck");
    for(var i = 0; i < checkboxes.length; i++)
    {
        if(checkboxes[i].checked == true)
        {
            checkboxes[i].checked = false;
        }
    }
    //set checked of clicked object
    if(input.checked == true)
    {
        input.checked = false;
    }
    else
    {
        input.checked = true;
    }	
}

//funcao para mostrar ou ocultar as divs dos métodos de simulação e simplificado
document.getElementById('check_simulacao').onchange = function() {
    if(this.checked==true){
        document.getElementById('div_simulacao').style.display = 'block';
        document.getElementById('div_simplificado').style.display = 'none';    
    }
};
document.getElementById('check_simplificado').onchange = function() {
    if(this.checked==true){
        document.getElementById('div_simulacao').style.display = 'none';
        document.getElementById('div_simplificado').style.display = 'block';  
    }
};

//mostrar ou não div da DPE detalhada
document.getElementById('dpe_detalhado').onchange = function() {
    if(this.value=='Sim'){
        document.getElementById('dpe_levantada').style.display = 'block';
        document.getElementById('label_detalhado').style.display = 'block';
    }
    else if (this.value=='Não'){
        document.getElementById('dpe_levantada').style.display = 'none';
        document.getElementById('label_detalhado').style.display = 'none';
    }
};