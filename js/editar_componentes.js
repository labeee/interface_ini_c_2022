/// VIDROS
function listar_vidros_editaveis(){
    var vidros_editaveis = document.getElementById('lista_vidros');
    vidros_editaveis.innerHTML = "";
    vidros.forEach(vidro =>{
    var vid = document.createElement("tr");
    var td_button = vid.insertCell(0);
    var button_id = 'edit_'+vidro.nome
    td_button.innerHTML = '<a class="btn-editar" id="'+button_id+'" onclick="editar_vidro(this.id)"><img src="img/pencil.svg" class="pencil"></a>'
    var vidro_name = vid.insertCell(1); 
    vidro_name.innerHTML = vidro.nome;
    vidros_editaveis.appendChild(vid);
    });
    document.getElementById('edit_vidro_tab').style.display = 'none';
    document.getElementById('add_vidro_tab').click()
}

function editar_vidro(id_botao){
    var vidro_a_editar = vidros.filter(vidro => vidro.nome == id_botao.substr(5,))[0];
    document.getElementById('edit_vidro_tab').style.display = 'block'
    document.getElementById('edit_vidro_tab').click();
    document.getElementById('name_vidro_to_edit').innerHTML = vidro_a_editar.nome;
    document.getElementById('nome_vidro_edit').value = vidro_a_editar.nome;
    document.getElementById('u_vidro_edit').value = vidro_a_editar.u_vid;
    document.getElementById('valor_fs_edit').value = vidro_a_editar.fs_vid;
}

function atualizar_vidros(){
    var index = vidros.findIndex(({nome}) => nome == document.getElementById('name_vidro_to_edit').innerHTML);
    vidros[index].nome = document.getElementById('nome_vidro_edit').value
    vidros[index].u_vid = document.getElementById('u_vidro_edit').value
    vidros[index].fs_vid = document.getElementById('valor_fs_edit').value

    //codigo para atualizar os nomes nas listas e linhas já inseridas
    var rowCount = $('#myTable tr').length;
    var rowCount = rowCount - 1

    for (var i = 0; i < rowCount; i++) {
        var vid = document.getElementById("lista_vidros"+(i));
        var valor_atual = vid.value;
        array_vidro = []
        for (j = 0; j < vid.length; j++) {
            array_vidro.push(vid.options[j].innerText)
        }
        vid.innerHTML = "";
        vidros.forEach(vidro =>{
        var optionInc = document.createElement("OPTION");
        optionInc.innerHTML = vidro.nome;
        vid.appendChild(optionInc);
        });
        
        if (valor_atual == document.getElementById('name_vidro_to_edit').innerHTML){
            vid.value = document.getElementById('nome_vidro_edit').value
        }
        else{
            vid.value = valor_atual
        }
    }
}



/// VIDROS  ABERTURA ZENITAL

function listar_vidros_az_editaveis(){
    var vidros_editaveis = document.getElementById('lista_vidro_az');
    vidros_editaveis.innerHTML = "";
    vidros_az.forEach(vidro =>{
    var vid = document.createElement("tr");
    var td_button = vid.insertCell(0);
    var button_id = 'edit_'+vidro.nome
    td_button.innerHTML = '<a class="btn-editar" id="'+button_id+'" onclick="editar_vidro_az(this.id)"><img src="img/pencil.svg" class="pencil"></a>'
    var vidro_name = vid.insertCell(1); 
    vidro_name.innerHTML = vidro.nome;
    vidros_editaveis.appendChild(vid);
    });
    document.getElementById('edit_vidro_az_tab').style.display = 'none';
    document.getElementById('add_vidro_az_tab').click()
}

function editar_vidro_az(id_botao){
    var vidro_a_editar = vidros_az.filter(vidro => vidro.nome == id_botao.substr(5,))[0];
    document.getElementById('edit_vidro_az_tab').style.display = 'block'
    document.getElementById('edit_vidro_az_tab').click();
    document.getElementById('name_vidro_az_to_edit').innerHTML = vidro_a_editar.nome;
    document.getElementById('nome_vidro_az_edit').value = vidro_a_editar.nome;
    document.getElementById('u_vidro_az_edit').value = vidro_a_editar.u_vid;
    document.getElementById('valor_fs_az_edit').value = vidro_a_editar.fs_vid;
}

function atualizar_vidros_az(){
    var index = vidros_az.findIndex(({nome}) => nome == document.getElementById('name_vidro_az_to_edit').innerHTML);
    vidros_az[index].nome = document.getElementById('nome_vidro_az_edit').value
    vidros_az[index].u_vid = document.getElementById('u_vidro_az_edit').value
    vidros_az[index].fs_vid = document.getElementById('valor_fs_az_edit').value

    //codigo para atualizar os nomes nas listas e linhas já inseridas
    var rowCount = $('#myTable tr').length;
    var rowCount = rowCount - 1

    for (var i = 0; i < rowCount; i++) {
        var vid = document.getElementById("lista_vidro_az"+(i));
        var valor_atual = vid.value;
        array_vidro_az = []
        for (j = 0; j < vid.length; j++) {
            array_vidro_az.push(vid.options[j].innerText)
        }
        vid.innerHTML = "";
        vidros.forEach(vidro =>{
        var optionInc = document.createElement("OPTION");
        optionInc.innerHTML = vidro.nome;
        vid.appendChild(optionInc);
        });
        
        if (valor_atual == document.getElementById('name_vidro_az_to_edit').innerHTML){
            vid.value = document.getElementById('nome_vidro_az_edit').value
        }
        else{
            vid.value = valor_atual
        }
    }
}

/// PAREDES

//// PAREDES EXTERNAS
function listar_paredes_ext_editaveis(){
    var paredes_editaveis = document.getElementById('lista_paredes_externas');
    paredes_editaveis.innerHTML = "";
    paredes_externas.forEach(parede =>{
    var par = document.createElement("tr");
    var td_button = par.insertCell(0);
    var button_id = 'edit_'+parede.nome
    td_button.innerHTML = '<a class="btn-editar" id="'+button_id+'" onclick="editar_parede_ext(this.id)"><img src="img/pencil.svg" class="pencil"></a>'
    var par_name = par.insertCell(1); 
    par_name.innerHTML = parede.nome;
    paredes_editaveis.appendChild(par);
    });
    document.getElementById('edit_par_ext_tab').style.display = 'none';
    document.getElementById('add_par_ext_tab').click()
}

function editar_parede_ext(id_botao){
    var parede_a_editar = paredes_externas.filter(parede => parede.nome == id_botao.substr(5,))[0];
    document.getElementById('edit_par_ext_tab').style.display = 'block'
    document.getElementById('edit_par_ext_tab').click();
    document.getElementById('name_par_ext_to_edit').innerHTML = parede_a_editar.nome;
    document.getElementById('nome_parede_ext_edit').value = parede_a_editar.nome;
    document.getElementById('u_parede_ext_edit').value = parede_a_editar.u_par;
    document.getElementById('ct_parede_ext_edit').value = parede_a_editar.ct_par;
    document.getElementById('ars_parede_ext_edit').value = parede_a_editar.ars_par;
}

function atualizar_paredes_ext(){
    var index = paredes_externas.findIndex(({nome}) => nome == document.getElementById('name_par_ext_to_edit').innerHTML);
    paredes_externas[index].nome = document.getElementById('nome_parede_ext_edit').value
    paredes_externas[index].u_par = document.getElementById('u_parede_ext_edit').value
    paredes_externas[index].ct_par = document.getElementById('ct_parede_ext_edit').value
    paredes_externas[index].ars_par = document.getElementById('ars_parede_ext_edit').value

    //codigo para atualizar os nomes nas listas e linhas já inseridas
    var rowCount = $('#myTable tr').length;
    var rowCount = rowCount - 1

    for (var i = 0; i < rowCount; i++) {
        var par = document.getElementById("lista_paredes_ext"+(i));
        var valor_atual = par.value;
        array_par = []
        for (j = 0; j < par.length; j++) {
            array_par.push(par.options[j].innerText)
        }
        par.innerHTML = "";
        paredes_externas.forEach(parede =>{
        var optionInc = document.createElement("OPTION");
        optionInc.innerHTML = parede.nome;
        par.appendChild(optionInc);
        });
        
        if (valor_atual == document.getElementById('name_par_ext_to_edit').innerHTML){
            par.value = document.getElementById('nome_parede_ext_edit').value
        }
        else{
            par.value = valor_atual
        }
    }
}

//// PAREDES INTERNAS
function listar_paredes_int_editaveis(){
    var paredes_editaveis = document.getElementById('lista_paredes_internas');
    paredes_editaveis.innerHTML = "";
    paredes_internas.forEach(parede =>{
    var par = document.createElement("tr");
    var td_button = par.insertCell(0);
    var button_id = 'edit_'+parede.nome
    td_button.innerHTML = '<a class="btn-editar" id="'+button_id+'" onclick="editar_parede_int(this.id)"><img src="img/pencil.svg" class="pencil"></a>'
    var par_name = par.insertCell(1); 
    par_name.innerHTML = parede.nome;
    paredes_editaveis.appendChild(par);
    });
    document.getElementById('edit_par_int_tab').style.display = 'none';
    document.getElementById('add_par_int_tab').click()
}

function editar_parede_int(id_botao){
    var parede_a_editar = paredes_internas.filter(parede => parede.nome == id_botao.substr(5,))[0];
    document.getElementById('edit_par_int_tab').style.display = 'block'
    document.getElementById('edit_par_int_tab').click();
    document.getElementById('name_par_int_to_edit').innerHTML = parede_a_editar.nome;
    document.getElementById('nome_parede_int_edit').value = parede_a_editar.nome;
    document.getElementById('u_parede_int_edit').value = parede_a_editar.u_par;
    document.getElementById('ct_parede_int_edit').value = parede_a_editar.ct_par;
}

function atualizar_paredes_int(){
    var index = paredes_internas.findIndex(({nome}) => nome == document.getElementById('name_par_int_to_edit').innerHTML);
    paredes_internas[index].nome = document.getElementById('nome_parede_int_edit').value
    paredes_internas[index].u_par = document.getElementById('u_parede_int_edit').value
    paredes_internas[index].ct_par = document.getElementById('ct_parede_int_edit').value

    //codigo para atualizar os nomes nas listas e linhas já inseridas
    var rowCount = $('#myTable tr').length;
    var rowCount = rowCount - 1

    for (var i = 0; i < rowCount; i++) {
        var par = document.getElementById("lista_paredes_int"+(i));
        var valor_atual = par.value;
        array_par = []
        for (j = 0; j < par.length; j++) {
            array_par.push(par.options[j].innerText)
        }
        par.innerHTML = "";
        paredes_internas.forEach(parede =>{
        var optionInc = document.createElement("OPTION");
        optionInc.innerHTML = parede.nome;
        par.appendChild(optionInc);
        });
        
        if (valor_atual == document.getElementById('name_par_int_to_edit').innerHTML){
            par.value = document.getElementById('nome_parede_int_edit').value
        }
        else{
            par.value = valor_atual
        }
    }
}

///COBERTURAS
function listar_coberturas_editaveis(){
    var coberturas_editaveis = document.getElementById('lista_coberturas');
    coberturas_editaveis.innerHTML = "";
    coberturas.forEach(cobertura =>{
    var cob = document.createElement("tr");
    var td_button = cob.insertCell(0);
    var button_id = 'edit_'+cobertura.nome
    td_button.innerHTML = '<a class="btn-editar" id="'+button_id+'" onclick="editar_cobertura(this.id)"><img src="img/pencil.svg" class="pencil"></a>'
    var cob_name = cob.insertCell(1); 
    cob_name.innerHTML = cobertura.nome;
    coberturas_editaveis.appendChild(cob);
    });
    document.getElementById('edit_cob_tab').style.display = 'none';
    document.getElementById('add_cob_tab').click()
}

function editar_cobertura(id_botao){
    var cobertura_a_editar = coberturas.filter(cobertura => cobertura.nome == id_botao.substr(5,))[0];
    document.getElementById('edit_cob_tab').style.display = 'block'
    document.getElementById('edit_cob_tab').click();
    document.getElementById('name_cob_to_edit').innerHTML = cobertura_a_editar.nome;
    document.getElementById('nome_cob_edit').value = cobertura_a_editar.nome;
    document.getElementById('u_cob_edit').value = cobertura_a_editar.u_cob;
    document.getElementById('ct_cob_edit').value = cobertura_a_editar.ct_cob;
    document.getElementById('ars_cob_edit').value = cobertura_a_editar.ars_cob;
}

function atualizar_coberturas(){
    var index = coberturas.findIndex(({nome}) => nome == document.getElementById('name_cob_to_edit').innerHTML);
    coberturas[index].nome = document.getElementById('nome_cob_edit').value
    coberturas[index].u_cob = document.getElementById('u_cob_edit').value
    coberturas[index].ct_cob = document.getElementById('ct_cob_edit').value
    coberturas[index].ars_cob = document.getElementById('ars_cob_edit').value

    //codigo para atualizar os nomes nas listas e linhas já inseridas
    var rowCount = $('#myTable tr').length;
    var rowCount = rowCount - 1

    for (var i = 0; i < rowCount; i++) {
        var cob = document.getElementById("lista_coberturas"+(i));
        var valor_atual = cob.value;
        array_cobs = []
        for (j = 0; j < cob.length; j++) {
            array_cobs.push(cob.options[j].innerText)
        }
        cob.innerHTML = "";
        coberturas.forEach(cobertura =>{
        var optionInc = document.createElement("OPTION");
        optionInc.innerHTML = cobertura.nome;
        cob.appendChild(optionInc);
        });
        
        if (valor_atual == document.getElementById('name_cob_to_edit').innerHTML){
            cob.value = document.getElementById('nome_cob_edit').value
        }
        else{
            cob.value = valor_atual
        }
    }
}

/// PISOS

function listar_pisos_editaveis(){
    var pisos_editaveis = document.getElementById('lista_pisos');
    pisos_editaveis.innerHTML = "";
    pisos.forEach(piso =>{
    var pis = document.createElement("tr");
    var td_button = pis.insertCell(0);
    var button_id = 'edit_'+piso.nome
    td_button.innerHTML = '<a class="btn-editar" id="'+button_id+'" onclick="editar_piso(this.id)"><img src="img/pencil.svg" class="pencil"></a>'
    var piso_name = pis.insertCell(1); 
    piso_name.innerHTML = piso.nome;
    pisos_editaveis.appendChild(pis);
    });
    document.getElementById('edit_piso_tab').style.display = 'none';
    document.getElementById('add_piso_tab').click()
}

function editar_piso(id_botao){
    var piso_a_editar = pisos.filter(piso => piso.nome == id_botao.substr(5,))[0];
    document.getElementById('edit_piso_tab').style.display = 'block'
    document.getElementById('edit_piso_tab').click();
    document.getElementById('name_piso_to_edit').innerHTML = piso_a_editar.nome;
    document.getElementById('nome_piso_edit').value = piso_a_editar.nome;
    document.getElementById('u_piso_edit').value = piso_a_editar.u_piso;
    document.getElementById('ct_piso_edit').value = piso_a_editar.ct_piso;
}

function atualizar_pisos(){
    var index = pisos.findIndex(({nome}) => nome == document.getElementById('name_piso_to_edit').innerHTML);
    pisos[index].nome = document.getElementById('nome_piso_edit').value
    pisos[index].u_piso = document.getElementById('u_piso_edit').value
    pisos[index].ct_piso = document.getElementById('ct_piso_edit').value

    //codigo para atualizar os nomes nas listas e linhas já inseridas
    var rowCount = $('#myTable tr').length;
    var rowCount = rowCount - 1

    for (var i = 0; i < rowCount; i++) {
        var piso = document.getElementById("lista_pisos"+(i));
        var valor_atual = piso.value;
        array_pisos = []
        for (j = 0; j < piso.length; j++) {
            array_pisos.push(piso.options[j].innerText)
        }
        piso.innerHTML = "";
        pisos.forEach(pis =>{
        var optionInc = document.createElement("OPTION");
        optionInc.innerHTML = pis.nome;
        piso.appendChild(optionInc);
        });
        
        if (valor_atual == document.getElementById('name_piso_to_edit').innerHTML){
            piso.value = document.getElementById('nome_piso_edit').value
        }
        else{
            piso.value = valor_atual
        }
    }
}

///AR CONDICIONADO
function listar_ac_editaveis(){
    var ac_editaveis = document.getElementById('lista_ac');
    ac_editaveis.innerHTML = "";
    sistemas_ac.forEach(sistema =>{
    var ac = document.createElement("tr");
    var td_button = ac.insertCell(0);
    var button_id = 'edit_'+sistema.nome
    td_button.innerHTML = '<a class="btn-editar" id="'+button_id+'" onclick="editar_ac(this.id)"><img src="img/pencil.svg" class="pencil"></a>'
    var ac_name = ac.insertCell(1); 
    ac_name.innerHTML = sistema.nome;
    ac_editaveis.appendChild(ac);
    });
    document.getElementById('edit_ac_tab').style.display = 'none';
    document.getElementById('add_ac_tab').click()
}

function editar_ac(id_botao){
    var ac_a_editar = sistemas_ac.filter(sistema => sistema.nome == id_botao.substr(5,))[0];
    document.getElementById('edit_ac_tab').style.display = 'block'
    document.getElementById('edit_ac_tab').click();
    document.getElementById('name_ac_to_edit').innerHTML = ac_a_editar.nome;
    document.getElementById('nome_sistema_ac_edit').value = ac_a_editar.nome;
    document.getElementById('tipo_sistema_edit').value = ac_a_editar.tipo;
    document.getElementById('capacidade_ac_edit').value = ac_a_editar.capacidade;
    document.getElementById('tipo_cee_edit').value = ac_a_editar.tipo_cee;
    document.getElementById('valor_cee_edit').value = ac_a_editar.valor_cee;
    document.getElementById('renovacao_ac_edit').value = ac_a_editar.potencia_renovacao;
}

function atualizar_ac(){
    var index = sistemas_ac.findIndex(({nome}) => nome == document.getElementById('name_ac_to_edit').innerHTML);
    sistemas_ac[index].nome = document.getElementById('nome_sistema_ac_edit').value
    sistemas_ac[index].tipo = document.getElementById('tipo_sistema_edit').value
    sistemas_ac[index].capacidade = document.getElementById('capacidade_ac_edit').value
    sistemas_ac[index].tipo_cee = document.getElementById('tipo_cee_edit').value
    sistemas_ac[index].valor_cee = document.getElementById('valor_cee_edit').value
    sistemas_ac[index].potencia_renovacao = document.getElementById('renovacao_ac_edit').value
}