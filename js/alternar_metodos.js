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
        document.getElementById('capacidade_ac_cond').disabled = false;  
        document.getElementById('consumo_ac_real_cond').disabled = false; 
        document.getElementById('consumo_ac_ref_cond').disabled = false;
        document.getElementById('capacidade_ac_cond').style.background = '#FFFFFF';  
        document.getElementById('consumo_ac_real_cond').style.background = '#FFFFFF';  
        document.getElementById('consumo_ac_ref_cond').style.background = '#FFFFFF';  

    }
};
document.getElementById('check_simplificado').onchange = function() {
    if(this.checked==true){
        document.getElementById('div_simulacao').style.display = 'none';
        document.getElementById('div_simplificado').style.display = 'block';  
        document.getElementById('capacidade_ac_cond').disabled = true;  
        document.getElementById('consumo_ac_real_cond').disabled = true; 
        document.getElementById('consumo_ac_ref_cond').disabled = true;
        document.getElementById('capacidade_ac_cond').style.background = '#F5F5F5';  
        document.getElementById('consumo_ac_real_cond').style.background = '#F5F5F5';   
        document.getElementById('consumo_ac_ref_cond').style.background = '#F5F5F5';    
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

//mostrar ou não div do PHOCT
document.getElementById('tipo_condicionamento').onchange = function teste() {
    if(this.value=='AC'){
        document.getElementById('phoct').value = 0;
        document.getElementById('phoct').disabled = true;
        document.getElementById('div_check_env').style.display = 'block';
        document.getElementById('div_simplificado').style.display = 'block';
        document.getElementById('div_condicionado').style.display = 'block';
    }
    else if (this.value=='HB') {
        document.getElementById('phoct').value = '';
        document.getElementById('phoct').disabled = false;
        document.getElementById('div_check_env').style.display = 'block';
        document.getElementById('div_simplificado').style.display = 'block';
        document.getElementById('div_condicionado').style.display = 'block';
    }
    else if (this.value=='VN') {
        document.getElementById('phoct').value = '';
        document.getElementById('phoct').disabled = false;
        document.getElementById('div_check_env').style.display = 'none';
        document.getElementById('div_simplificado').style.display = 'none';
        document.getElementById('div_condicionado').style.display = 'none';
        window.alert('Atenção! Lembre-se que as edificações apenas ventiladas naturalmente devem comprovar os requitos mínimos de PHOCT!')
    }
    
};

