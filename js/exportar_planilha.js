function pegar(){
    var rowCount = $('#myTable tr').length;
    var rowCount = rowCount - 1
    lista_ids = ['lista_pavimentos', 'nome_zona', 'area_zona','pd_zona', 'tipo_zona', 'orientacoes', 'zona_adjacente', 'lista_usos', 'lista_paredes_ext', 'lista_paredes_int', 'lista_coberturas', 'lista_pisos', 'lista_vidros','paf_zona', 'fachada', 'avs_zona', 'ahs_zona', 'aov_zona', 'paz_zona', 'lista_vidros_az', 'dpi_zona', 'ac_zona', 'cgtt_zona', 'cgtt_ref' ]
    lista_total = []
    for (var i = 0; i < rowCount; i++) {
        var lista_linha = []
        for (id of lista_ids){
            var valor = document.getElementById(id+i).value
            if (valor.includes('/') ){
                var valor = valor.replace('/','|') // tem que substituir a / pois cajo ela existe abre um endereço inexistente 
            }
            lista_linha.push(valor)
           
        }
        // dados de uso que vão para a planilha
        var tipo = document.getElementById('tipo_predominante').value
        // a convenção é tomar o consumo dos equipamentos usando a tipologia predominante e toda a área construída
        if(tipo.includes('Educacional')){ //existem 3 educacionais, com mudança apenas de pessoas/m², que não é relevante nos equipamentos
            uso_total = dados_uso = uso_zonas.filter(uso => uso.nome == 'Educacional - Infantil')[0]
        }
        else{
            uso_total = dados_uso = uso_zonas.filter(uso => uso.nome == tipo)[0]
        }
    
        //checar se é o valor detalhado de DPE ou o padrão
        if (document.getElementById('dpe_detalhado').value == 'Sim'){
            dpe_total = document.getElementById('dpe_levantada').value
        }
        else{
            dpe_total = uso_total.dpe_ref;
        }
        
        lista_linha.splice(-3, 0, dpe_total);
        //densidade de ocupacao
        ocupacao = uso_total.densidade_ocupacao;
        lista_linha.splice(-3, 0, ocupacao);
        //horas de uso
        var horas_total = uso_total.horas_ocupacao;
        lista_linha.splice(-3, 0, horas_total);
        //depois inserir uma linha em branco pq existe um espaço antes das infos do AC
        lista_linha.splice(-3, 0, '');
        lista_linha.splice(-2, 0, document.getElementById('cond_a_ac').value);
        lista_total = lista_total + (lista_linha+'_')
    }

    //informaçoes iniciais
    var lista_iniciais_ids = ['nome_projeto', 'estados', 'cidades', 'tipo_predominante', 'area_construida', 'fator_de_forma', 'tipo_condicionamento', 'phoct', 'sistema_eletricidade', 'dpe_detalhado', 'dpe_levantada']
    lista_iniciais = []
    for (item of lista_iniciais_ids){
        var valor = document.getElementById(item).value
        if (valor.includes('/') ){
            var valor = valor.replace('/','|') // tem que substituir a / pois cajo ela existe abre um endereço inexistente 
        }
        lista_iniciais.push(valor)
    }

    lista_iniciais.push(document.getElementById('numero_zb').innerHTML) // adicionar a zb separada por é innerHTML e não value
    lista_iniciais.push(document.getElementById('cond_a_ac').value) //adicionar info de atendimento às condições A, o restante de AC vem dos componentes
    lista_total = lista_total + '--' + lista_iniciais


    //componentes
    var lista_par_ext = []
    paredes_externas.forEach(parede =>{
        var nome_par_ext = parede.nome
        var u_par_ext = parede.u_par
        var ct_par_ext = parede.ct_par
        var ars_par_ext = parede.ars_par
        lista_par_ext.push([nome_par_ext, u_par_ext, ct_par_ext, ars_par_ext])
    });
    // par ext tem indice 2 na lista
    lista_total = lista_total + '--' + lista_par_ext 

    var lista_par_int = []
    paredes_internas.forEach(parede =>{
        var nome_par_int = parede.nome
        var u_par_int = parede.u_par
        var ct_par_int = parede.ct_par
        lista_par_int.push([nome_par_int, u_par_int, ct_par_int])
    });
    // par int tem indice 3 na lista
    lista_total = lista_total + '--' + lista_par_int

    var lista_cob = []
    coberturas.forEach(cobertura =>{
        var nome_cob = cobertura.nome
        var u_cob = cobertura.u_cob
        var ct_cob = cobertura.ct_cob  
        var ars_cob = cobertura.ars_cob
        lista_cob.push([nome_cob, u_cob, ct_cob, ars_cob])
    });
    // cobertura tem indice 4 na lista
    lista_total = lista_total + '--' + lista_cob 

    var lista_pisos = []
    pisos.forEach(piso =>{
        var nome_pis = piso.nome
        var u_pis = piso.u_piso
        var ct_pis = piso.ct_piso
        lista_pisos.push([nome_pis, u_pis, ct_pis])
    });
    // pisos tem indice 5 na lista
    lista_total = lista_total + '--' + lista_pisos
    
    var lista_vidros_jan = []
    vidros.forEach(vidro =>{
        var nome_vid = vidro.nome
        var u_vid = vidro.u_vid
        var fs_vid = vidro.fs_vid
        lista_vidros_jan.push([nome_vid, u_vid, fs_vid])
    });
    // vidros tem indice 6 na lista
    lista_total = lista_total + '--' + lista_vidros_jan

    var lista_vidros_zen = []
    vidros_az.forEach(vidro =>{
        var nome_vid = vidro.nome
        var u_vid = vidro.u_vid
        var fs_vid = vidro.fs_vid
        lista_vidros_zen.push([nome_vid, u_vid, fs_vid])
    });
    // vidros az tem indice 7 na lista
    lista_total = lista_total + '--' + lista_vidros_zen

    //Equipamentos de AC

    var lista_equip_ac = []

    sistemas_ac .forEach(sistema =>{
        var nome_sistema = sistema.nome;
        if (nome_sistema.includes('/') ){
            var nome_sistema = nome_sistema.replace('/','|') // tem que substituir a / pois cajo ela existe abre um endereço inexistente 
        }
        var tipo_sistema = sistema.tipo;
        var capacidade_sistema = sistema.capacidade;
        var tipo_cee_sistema = sistema.tipo_cee;
        var valor_cee_sistema = sistema.valor_cee;
        var pot_renovacao_sistema = sistema.potencia_renovacao;
        lista_equip_ac.push([nome_sistema, tipo_sistema, capacidade_sistema, tipo_cee_sistema, valor_cee_sistema, pot_renovacao_sistema])
    });
    // sistemas ac tem indice 8 na lista
    lista_total = lista_total + '--' + lista_equip_ac


    return lista_total
}