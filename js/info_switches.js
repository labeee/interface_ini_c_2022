/// switch de ac - desativa a div 
document.getElementById('sw_ac').onchange = function() {
    if(this.checked==true){
        document.getElementById('div_condicionado').style.display = 'block';
    }
    else{
        document.getElementById('div_condicionado').style.display = 'none';
    }
};

/// switch de iluminação - desativa a div 
document.getElementById('sw_iluminacao').onchange = function() {
    if(this.checked==true){
        document.getElementById('iluminacao_valores').style.display = 'block';
    }
    else{
        document.getElementById('iluminacao_valores').style.display = 'none';
    }
};

/// switch de aq - desativa a div 
document.getElementById('sw_aq').onchange = function() {
    if(this.checked==true){
        document.getElementById('aq_valores').style.display = 'block';
    }
    else{
        document.getElementById('aq_valores').style.display = 'none';
    }
};

/// switch de geracao - desativa a div 
document.getElementById('sw_geracao').onchange = function() {
    if(this.checked==true){
        document.getElementById('geracao_valores').style.display = 'block';
    }
    else{
        document.getElementById('geracao_valores').style.display = 'none';
    }
};
