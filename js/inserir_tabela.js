//função para remover a zona e resetar os índices
function remover_zona(clicked_id) { 

    let confirm_action = confirm('Tem certeza que deseja excluir esta zona térmica?') //mensagem de confirmação antes de excluir, se ok, exclui, se cancelar nada acontece
    if (confirm_action){
        zona_id = clicked_id.substr(3,) //tomar o id da linha removida
        document.getElementById('zona'+zona_id).remove() // remover a linha selecionada

        //depois de remover a linha, é preciso resetar os índices, para que as funções que tomam os dados funcionem
        var table = document.getElementById("myTable");
        var rowCount = $('#myTable tr').length;
        var rowCount = rowCount - 1
        linhas_tabela = (table.rows)
        var conjunto_linhas = Array.prototype.slice.call(linhas_tabela).slice(1) //transformar html objects em array e remover a primeira linha que é o cabeçalho

        for (lin of conjunto_linhas) {
            id_atual = lin.id.substr(4,) //tira o zona e fica somente o número
            novo_id = conjunto_linhas.indexOf(lin) //posição da linha atualmente dentro do array
            lin.id = 'zona'+novo_id
            entradas = ['lista_pavimentos','nome_zona','area_zona', 'pd_zona', 'tipo_zona','orientacoes','zona_adjacente', 'lista_usos','lista_paredes_ext','lista_paredes_int', 'lista_coberturas','lista_pisos', 'lista_vidros', 'paf_zona', 'fachada', 'avs_zona', 'ahs_zona', 'aov_zona','paz_zona', 'lista_vidros_az','dpi_zona', 'cgtt_zona', 'cgtt_ref','rem',] // deve mudar o id de todas as entradas e também do botão remover, pois os ids são usados nos cálculos e na próxima vez o id do botão será usado para excluir a linha correspondente. cgtt_ref é uma coluna oculta
            for (nome of entradas){
                document.getElementById(nome+id_atual).id = nome+novo_id
            }        
        }
    }
}

//função de inserção dos dados na tabela p
//inserir as td e seus ids dentro de cada nova linha 
function inserir_tabela() {
    var table = document.getElementById("myTable");
    var rowCount = $('#myTable tr').length;
    var rowCount = rowCount - 1
    var row = table.insertRow(rowCount+1);
    row.id = 'zona'+rowCount
    var cell1 = row.insertCell(0);
    var cell2= row.insertCell(1);
    var cell3= row.insertCell(2);
    var cell4= row.insertCell(3);
    var cell5= row.insertCell(4);
    var cell6= row.insertCell(5);
    var cell7= row.insertCell(6);
    var cell8= row.insertCell(7);
    var cell9= row.insertCell(8);
    var cell10= row.insertCell(9);
    var cell11= row.insertCell(10);
    var cell12= row.insertCell(11);
    var cell13= row.insertCell(12);
    var cell14= row.insertCell(13);
    var cell15= row.insertCell(14);
    var cell16= row.insertCell(15);
    var cell17= row.insertCell(16);
    var cell18= row.insertCell(17);
    var cell19= row.insertCell(18);
    var cell20 = row.insertCell(19);
    var cell21 = row.insertCell(20);
    var cell22 = row.insertCell(21);
    var cell23 = row.insertCell(22);
    var cell24 = row.insertCell(23);
    var cell25 = row.insertCell(24);
    var cell26 = row.insertCell(25);

    //inserir os conteúdos capturando as informações do modal das zonas
    //pode entrar aqui o condicional para os limites e valores não preenchidos
    //alterações na forma, nomes dos ids e posições também devem ser alteradas em importar_planilha.js

    cell1.innerHTML = '<select id="lista_pavimentos'+rowCount+'"type="text"></select>'; 
    cell2.innerHTML = '<input id="nome_zona'+rowCount+'" type="text" value="zona'+(rowCount+1)+'">';
    cell3.innerHTML = '<input id="area_zona'+rowCount+'" type="number" min="0" step="0.01" max="10000">';
    cell4.innerHTML = '<input id="pd_zona'+rowCount+'" type="number" min="2.6" step="0.01" max="6.6">';
    cell5.innerHTML = '<select id="tipo_zona'+rowCount+'"><option value="Perimetral">Perimetral</option><option value="Interna">Interna</option></select>';
    cell6.innerHTML = '<select id="orientacoes'+rowCount+'"type="text"><option value="N">N</option><option value="NE">NE</option><option value="L">L</option><option value="SE">SE</option><option value="S">S</option><option value="SO">SO</option><option value="O">O</option><option value="NO">NO</option><option value="Interna">Interna</option></select>';
    cell7.innerHTML = '<select id="zona_adjacente'+rowCount+'"><option value="Zona adjacente condicionada">Zona adjacente condicionada</option><option value="Zona adjacente não-condicionada">Zona adjacente não-condicionada</option></select>';
    cell8.innerHTML = '<select id="lista_usos'+rowCount+'"></select>';
    cell9.innerHTML = '<select id="lista_paredes_ext'+(rowCount)+'"></select>'
    cell10.innerHTML = '<select id="lista_paredes_int'+(rowCount)+'"></select>'
    cell11.innerHTML = '<select id="lista_coberturas'+(rowCount)+'"></select>'
    cell12.innerHTML = '<select id="lista_pisos'+(rowCount)+'"></select>'
    cell13.innerHTML = '<select id="lista_vidros'+(rowCount)+'"></select>'
    cell14.innerHTML = '<input id="paf_zona' +(rowCount)+'" type="number" min="0" step="0.01" max="90">';
    cell15.innerHTML = '<select style="background-color:#F5F5F5" disabled id="fachada'+rowCount+'"><option value="Sim">Sim</option><option value="Não">Não</option></select>';
    cell16.innerHTML = '<input id="avs_zona'+(rowCount)+'" type="number" min="0" step="0.01" max="90">';
    cell17.innerHTML = '<input id="ahs_zona'+(rowCount)+'" type="number" min="0" step="0.01" max="90">';
    cell18.innerHTML = '<input id="aov_zona'+(rowCount)+'" type="number" min="0" step="0.01" max="90">';
    cell19.innerHTML = '<input id="paz_zona'+rowCount+'" type="number" min="0" step="0.01" max="5">';
    cell20.innerHTML = '<select id="lista_vidros_az'+(rowCount)+'"></select>'
    cell21.innerHTML = '<input id="dpi_zona'+rowCount+'" type="number" min="4" step="0.01" max="40">';
    cell22.innerHTML = '<select id="ac_zona'+rowCount+'"></select>';
    cell23.innerHTML = '<input id="cgtt_zona'+rowCount+'" type="number" disabled>';
    cell24.innerHTML = '<input id="cgtt_ref'+rowCount+'" type="number" disabled>';
    cell25.innerHTML = '<button class="btn btn-danger" id="rem'+rowCount+'" onclick="remover_zona(this.id)"><img src="img/trash.svg" class="icone_trash"></button>'
    cell26.innerHTML = '<button class="btn btn-secondary" id="sem'+rowCount+'" onclick="cloneRow(this.id);adicionar_limites()">Duplicar</button>'


    //função para listar as paredes externas
    var selparedes = document.getElementById("lista_paredes_ext"+(rowCount));
    selparedes.innerHTML = "";
    paredes_externas.forEach(parede =>{
    var optionInc = document.createElement("OPTION");
    optionInc.innerHTML = parede.nome;
    selparedes.appendChild(optionInc);
    });

    //função para listar as paredes internas
    var selparedes = document.getElementById("lista_paredes_int"+(rowCount));
    selparedes.innerHTML = "";
    paredes_internas.forEach(parede =>{
    var optionInc = document.createElement("OPTION");
    optionInc.innerHTML = parede.nome;
    selparedes.appendChild(optionInc);
    });

    //função para listar as coberturas:
    var selcobs = document.getElementById("lista_coberturas"+(rowCount));
    selcobs.innerHTML = "";
    coberturas.forEach(cobertura =>{
    var optionInc = document.createElement("OPTION");
    optionInc.innerHTML = cobertura.nome;
    selcobs.appendChild(optionInc);
    });

    //função para listar os pisos:
    var selpisos = document.getElementById("lista_pisos"+(rowCount));
    selpisos.innerHTML = "";
    pisos.forEach(piso =>{
    var optionInc = document.createElement("OPTION");
    optionInc.innerHTML = piso.nome;
    selpisos.appendChild(optionInc);
    });

    //função para listar as os vidros:
    var selvidros = document.getElementById("lista_vidros"+(rowCount));
    selvidros.innerHTML = "";
    vidros.forEach(vidro =>{
    var optionInc = document.createElement("OPTION");
    optionInc.innerHTML = vidro.nome;
    selvidros.appendChild(optionInc);
    });

    var selvidrosaz = document.getElementById("lista_vidros_az"+(rowCount));
    selvidrosaz.innerHTML = "";
    vidros_az.forEach(vidro =>{
    var optionInc = document.createElement("OPTION");
    optionInc.innerHTML = vidro.nome;
    selvidrosaz.appendChild(optionInc);
    });

    //sistemas de AC

    var sel_ac = document.getElementById("ac_zona"+(rowCount));
    sel_ac.innerHTML = "";
    sistemas_ac.forEach(sistema => {
    var optionInc = document.createElement("OPTION");
    optionInc.innerHTML = sistema.nome
    sel_ac.appendChild(optionInc);
    })

}


function cloneRow(clicked_id) {
    zona_id = clicked_id.substr(3,) //tomar o id da linha removida
    var row = document.getElementById('zona'+zona_id); // find row to copy
    var table = document.getElementById("myTable"); // find table to append to
    var clone = row.cloneNode(true); // copy children too
    var rowCount = $('#myTable tr').length - 1;
    clone.id = 'zona'+rowCount; // change id or other attributes/contents
    for (inp of clone.getElementsByTagName('input')){
        old_id = inp.id.slice(0,-1);
        inp.value = document.getElementById(inp.id).value
        inp.id = old_id+rowCount;
    }
    for (sel of clone.getElementsByTagName('select')){
        old_id = sel.id.slice(0,-1);
        sel.value = document.getElementById(sel.id).value
        sel.id = old_id+rowCount;
    }
    table.appendChild(clone); // add new row to end of table
}


                     

