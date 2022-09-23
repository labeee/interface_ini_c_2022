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

