
function check_vent(input){
    var checkboxes = document.getElementsByClassName("ventCheck");
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

document.getElementById('check_condicionada').onchange = function() {
    if(this.checked==true){
        document.getElementById('div_condicionado').style.display = 'block';
        document.getElementById('div_ventilado').style.display = 'none';  
        document.getElementById('div_hibrido').style.display = 'none';  
    }
};

document.getElementById('check_ventilada').onchange = function() {
    if(this.checked==true){
        document.getElementById('div_condicionado').style.display = 'none';
        document.getElementById('div_ventilado').style.display = 'block';  
        document.getElementById('div_hibrido').style.display = 'none';  
    }
};

document.getElementById('check_hibrida').onchange = function() {
    if(this.checked==true){
        document.getElementById('div_condicionado').style.display = 'none';
        document.getElementById('div_ventilado').style.display = 'none';  
        document.getElementById('div_hibrido').style.display = 'block';  
    }
};
