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
            entradas = ['lista_pavimentos','nome_zona','area_zona', 'pd_zona', 'tipo_zona','orientacoes', 'lista_usos',   'cond_piso_zona', 'cond_cob_zona', 'lista_paredes', 'lista_coberturas', 'paf_zona', 'fachada', 'lista_vidros', 'avs_zona', 'ahs_zona', 'aov_zona', 'dpi_zona', 'dpe_zona', 'cgtt_zona', 'cgtt_ref','rem',] // deve mudar o id de todas as entradas e também do botão remover, pois os ids são usados nos cálculos e na próxima vez o id do botão será usado para excluir a linha correspondente. cgtt_ref é uma coluna oculta
            for (nome of entradas){
                document.getElementById(nome+id_atual).id = nome+novo_id
            }        
        }
    }
}

//função de inserção dos dados na tabela 
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

    //inserir os conteúdos capturando as informações do modal das zonas
    //pode entrar aqui o condicional para os limites e valores não preenchidos
    //alterações na forma, nomes dos ids e posições também devem ser alteradas em importar_planilha.js

    cell1.innerHTML = '<input id="lista_pavimentos'+(rowCount)+'" type="text">'; //colocar como select?
    cell2.innerHTML = '<input id="nome_zona'+rowCount+'" type="text" value="zona '+rowCount+'">';
    cell3.innerHTML = '<input id="area_zona'+rowCount+'" type="number" min="0" max="10000">';
    cell4.innerHTML = '<input id="pd_zona'+rowCount+'" type="number" min="2.6" max="6.6">';
    cell5.innerHTML = '<select id="tipo_zona'+rowCount+'"><option value="Perimetral">Perimetral</option><option value="Interna">Interna</option></select>';
    cell6.innerHTML = '<select id="orientacoes'+rowCount+'"type="text"><option value="N">N</option><option value="NE">NE</option><option value="L">L</option><option value="SE">SE</option><option value="S">S</option><option value="SO">SO</option><option value="O">O</option><option value="NO">NO</option></select>';
    cell7.innerHTML = '<select id="lista_usos'+rowCount+'"></select>';
    cell8.innerHTML = '<select id="cond_piso_zona'+rowCount+'"></select>';
    cell9.innerHTML = '<select id="cond_cob_zona'+rowCount+'"><option value="Exposta">Exposta</option><option value="Não exposta">Não exposta</option></select>';
    cell10.innerHTML = '<select id="lista_paredes'+(rowCount)+'"></select>'
    cell11.innerHTML = '<select id="lista_coberturas'+(rowCount)+'"></select>'
    cell12.innerHTML = '<select id="lista_vidros'+(rowCount)+'"></select>'
    cell13.innerHTML = '<input id="paf_zona'+(rowCount)+'" type="number" min="0" max="90">';
    cell14.innerHTML = '<select id="fachada'+rowCount+'"><option value="Sim">Sim</option><option value="Não">Não</option></select>';
    cell15.innerHTML = '<input id="avs_zona'+(rowCount)+'" type="number" min="0" max="90">';
    cell16.innerHTML = '<input id="ahs_zona'+(rowCount)+'" type="number" min="0" max="90">';
    cell17.innerHTML = '<input id="aov_zona'+(rowCount)+'" type="number" min="0" max="90">';
    cell18.innerHTML = '<input id="dpi_zona'+rowCount+'" type="number" min="4" max="40">';
    cell19.innerHTML = '<input id="dpe_zona'+rowCount+'" type="number" min="4" max="40">';
    cell20.innerHTML = '<select id="ac_zona'+rowCount+'"></select>';
    cell21.innerHTML = '<input id="cgtt_zona'+rowCount+'" type="number" disabled="disabled">';
    cell22.innerHTML = '<input id="cgtt_ref'+rowCount+'" type="number" disabled>';
    cell23.innerHTML = '<button class="btn btn-danger" id="rem'+rowCount+'" onclick="remover_zona(this.id)"><i class="fa fa-trash"></i></button>'



    //função para listar as paredes
    var selparedes = document.getElementById("lista_paredes"+(rowCount));
    selparedes.innerHTML = "";
    paredes.forEach(parede =>{
    var optionInc = document.createElement("OPTION");
    optionInc.innerHTML = parede.nome;
    selparedes.appendChild(optionInc);
    });


    //função para listar as coberturas:
    var selcobs = document.getElementById("lista_coberturas"+(rowCount));
    selcobs.innerHTML = "";
    coberturas.forEach(cobertura =>{
    var optionInc2 = document.createElement("OPTION");
    optionInc2.innerHTML = cobertura.nome;
    selcobs.appendChild(optionInc2);
    });

    //função para listar os pavimentos:
    /*var selpavs = document.getElementById("lista_pavimentos"+(rowCount));
    selpavs.innerHTML = "";
    pavimentos.forEach(pavimento =>{
    var optionInc4 = document.createElement("OPTION");
    optionInc4.innerHTML = pavimento.nome;
    selpavs.appendChild(optionInc4);
    });*/ //desativado por enquanto

    //função para listar as os vidros:
    var selvidros = document.getElementById("lista_vidros"+(rowCount));
    selvidros.innerHTML = "";
    vidros.forEach(vidro =>{
    var optionInc5 = document.createElement("OPTION");
    optionInc5.innerHTML = vidro.nome;
    selvidros.appendChild(optionInc5);
    });

    //sistemas de AC

    var sel_ac = document.getElementById("ac_zona"+(rowCount));
    sel_ac.innerHTML = "";
    sistemas_ac.forEach(sistema => {
    var optionInc51 = document.createElement("OPTION");
    optionInc51.innerHTML = sistema.nome
    sel_ac.appendChild(optionInc51);
    })

}





                     

