function GetTableFromExcel(data) {

    let confirmacao = confirm('Ao realizar o upload de sua planilha, você perderá todos os dados previamente preenchidos nesta página. Deseja continuar?') //mensagem de confirmação antes de excluir, se ok, exclui, se cancelar nada acontece
    if (confirmacao){
        var workbook = XLSX.read(data, {
            type: 'binary'
        });

        //importação das informações iniciais
            var linhas_gerais = XLSX.utils.sheet_to_row_object_array(workbook.Sheets['Geral']).slice(2,);
            //nome do projeto
            document.getElementById('nome_projeto').value = linhas_gerais[0].__EMPTY_2
            //tipologia predominante
            document.getElementById('tipo_predominante').value = linhas_gerais[9].__EMPTY_2
            //tomar e inserir o nome do estado
            var nome_estado = linhas_gerais[4].__EMPTY_2
            document.getElementById('estados').value = nome_estado
            //listar as cidades
            var selCidades = document.getElementById("cidades");
            selCidades.innerHTML = "";
            var cidadesFiltradas = arrayDeCidades.filter(cidade => cidade.estado == nome_estado);
            cidadesFiltradas.forEach(cidade =>{
            var optionInc20 = document.createElement("OPTION");
            optionInc20.innerHTML = cidade.nome;
            selCidades.appendChild(optionInc20);
            });
            var nome_cidade = linhas_gerais[5].__EMPTY_2
            selCidades.value = nome_cidade
            //dados climáticos da cidade selecionada
            var dados_cidade = arrayDeCidades.filter(cidade =>{
                return cidade.nome == nome_cidade ;
            })
            //dados tomados do arquivo climático, se existente, senão daquele mais próximo, por distância euclidiana
            lat = parseFloat(dados_cidade[0].lat);
            alt = parseFloat(dados_cidade[0].alt);
            dbt_mean = parseFloat(dados_cidade[0].dbt_mean)
            dbt_25p	= parseFloat(dados_cidade[0].dbt_25p)
            dbt_75p	= parseFloat(dados_cidade[0].dbt_75p)
            ws_mean	= parseFloat(dados_cidade[0].ws_mean)
            ws_25p = parseFloat(dados_cidade[0].ws_25p)
            ws_75p = parseFloat(dados_cidade[0].ws_75p)
            ghr_mean = parseFloat(dados_cidade[0].ghr_mean)
            ghr_25p	= parseFloat(dados_cidade[0].ghr_25p)
            ghr_75p	= parseFloat(dados_cidade[0].ghr_75p)
            dpt_mean = parseFloat(dados_cidade[0].dpt_mean)
            dpt_25p	= parseFloat(dados_cidade[0].dpt_25p)
            dpt_75p	= parseFloat(dados_cidade[0].dpt_75p)
            ZB = dados_cidade[0].zb

        
            zona_nome = document.getElementById('numero_zb')
            zona_nome.innerHTML = '0'+ZB;
            
            //tipo de sistema de geracao de eletricidade
            document.getElementById('sistema_eletricidade').value = linhas_gerais[6].__EMPTY_2

            //fator de forma
            var ff = linhas_gerais[10].__EMPTY_2
            document.getElementById('fator_de_forma').value = ff 
            
            //área construída 
            document.getElementById('area_construida').value = linhas_gerais[8].__EMPTY_2;

            //dpe_detalhada
            document.getElementById('dpe_detalhado').value = linhas_gerais[11].__EMPTY_2;
            if(linhas_gerais[11].__EMPTY_2=='Sim'){
                document.getElementById('dpe_levantada').style.display = 'block';
                document.getElementById('label_detalhado').style.display = 'block';
                document.getElementById('dpe_levantada').value = linhas_gerais[14].__EMPTY_2
            }
            else if (linhas_gerais[11].__EMPTY_2=='Não'){
                document.getElementById('dpe_levantada').style.display = 'none';
                document.getElementById('label_detalhado').style.display = 'none';
            }


        //tomar dados de iluminação 
            var info_ilum = XLSX.utils.sheet_to_row_object_array(workbook.Sheets['Iluminação']).slice(4,15); 
            if (info_ilum[0].__EMPTY_2 == 'Método de simulação'){
                document.getElementById('iluminacao_referencia').value = info_ilum[2].__EMPTY_27
                document.getElementById('iluminacao_real').value = info_ilum[3].__EMPTY_27
                document.getElementById('iluminacao_i').value = info_ilum[10].__EMPTY_2.slice(0,-1)
            }

            else if (info_ilum[0].__EMPTY_2 == 'Método das atividades do edifício'){
                document.getElementById('iluminacao_referencia').value = info_ilum[1].__EMPTY_2
                document.getElementById('iluminacao_real').value = info_ilum[2].__EMPTY_2
                document.getElementById('iluminacao_i').value = info_ilum[10].__EMPTY_27.slice(0,-1)
            }
            else{
                document.getElementById('iluminacao_referencia').value = info_ilum[1].__EMPTY_2
                document.getElementById('iluminacao_real').value = info_ilum[2].__EMPTY_2
                document.getElementById('iluminacao_i').value = info_ilum[10].__EMPTY_2.slice(0,-1)
            }

        //tomar dados de aquecimento de água
            var info_aq = XLSX.utils.sheet_to_row_object_array(workbook.Sheets['AquecimentoÁgua']).slice(4,26); 
            document.getElementById('sistema_aq').value  = info_aq[0].__EMPTY_2
            document.getElementById('apoio_aq').value = info_aq[21].__EMPTY_2
            document.getElementById('aq_referencia').value = info_aq[11].__EMPTY_19
            document.getElementById('aq_real_eletrica').value = info_aq[11].__EMPTY_20
            document.getElementById('aq_real_termica').value = info_aq[11].__EMPTY_21

        //tomar dados de geração
            var info_ge = XLSX.utils.sheet_to_row_object_array(workbook.Sheets['Opc_Geração']).slice(3,5);
            document.getElementById('sistema_geracao').value = info_ge[0].__EMPTY_2
            document.getElementById('geracao').value = info_ge[1].__EMPTY_2

        //tomar dados dos sistemas de ar condicionado
            var info_ac = XLSX.utils.sheet_to_row_object_array(workbook.Sheets['ArCondicionado']).slice(4,18); 
            var tipo_simulacao = info_ac[0].__EMPTY_2 
            
            if (tipo_simulacao == 'Método Simplificado'){
                var consumo_ac_real_importado = 0 // inicia com zero pois ainda não foram calculados, isso é feito na planilha
                var consumo_ac_ref_importado = 0
            }
            else if (tipo_simulacao == 'Método de Simulação'){ //somente toma os valores se por simulação, senão usa os valores a serem calculados pela planilha
                var consumo_ac_real_importado = info_ac[2].__EMPTY_2;
                var consumo_ac_ref_importado = info_ac[1].__EMPTY_2;
            }

            var tipo_de_condicionamento = info_ac[6].__EMPTY_2
            if (tipo_de_condicionamento == 'Naturalmente ventilada'){
                document.getElementById('tipo_condicionamento').value = 'VN'
                document.getElementById('phoct').disable= false
                //se naturalmente ventilada, atribuir valor ao PHOCT
                document.getElementById('phoct').value = info_ac[10].__EMPTY_2
                //desabilitar as divs de AC
                document.getElementById('div_check_env').style.display = 'none';
                document.getElementById('div_simplificado').style.display = 'none';
                document.getElementById('div_sistema_ac').style.display = 'none';
                window.alert('Atenção! Lembre-se que as edificações apenas ventiladas naturalmente devem comprovar os requitos mínimos de PHOCT!')
            }
            
            else if (tipo_de_condicionamento == 'Híbrida'){
                document.getElementById('tipo_condicionamento').value = 'HB'
                document.getElementById('phoct').disable= false
                //atribuir os valores de consumo e capacidade
                document.getElementById('consumo_ac_real_cond').value = consumo_ac_real_importado
                document.getElementById('consumo_ac_ref_cond').value = consumo_ac_ref_importado 
                document.getElementById('capacidade_ac_cond').value = info_ac[7].__EMPTY_2
                //se hibrida, atribuir valor ao PHOCT
                document.getElementById('phoct').value = parseFloat(info_ac[10].__EMPTY_2)
                //se os requisitos A são atendidos
                document.getElementById('cond_a_ac').value = info_ac[13].__EMPTY_2

            }
            else if (tipo_de_condicionamento == 'Condicionada artificialmente'){
                document.getElementById('tipo_condicionamento').value = 'AC';
                document.getElementById('phoct').disable= true;
                //atribuir os valores de consumo e capacidade
                document.getElementById('consumo_ac_real_cond').value = consumo_ac_real_importado
                document.getElementById('consumo_ac_ref_cond').value = consumo_ac_ref_importado  
                document.getElementById('capacidade_ac_cond').value = info_ac[7].__EMPTY_2
                document.getElementById('phoct').value = 0
                //se os requisitos A são atendidos
                document.getElementById('cond_a_ac').value = info_ac[13].__EMPTY_2
            }

        //pegar os componentes construtivos preenchidos na tabela, para que sejam inseridos como uma lista na opção de envoltória
        var excelRows2 = XLSX.utils.sheet_to_row_object_array(workbook.Sheets['Componentes']).slice(6,); //as 6 primeiras são as linhas antes das informações dos componentes

        for (row of excelRows2){
            //como as primeiras colunas não tem nome, elas são nomeadas como __EMPTY_número da coluna, assim, para a verificação se existe valores preenchidos, foram usados os valores de row.EMPTY_número; se houvesse nome nas colunas, seria pelo nome das colunas
            //verificação para as paredes (se não estiver em branco alguma informação, toma os valores) -
            if ([row.__EMPTY_1, row.__EMPTY_2, row.__EMPTY_3, row.__EMPTY_4].includes(undefined)){}
            else{
                nome_parede = row.__EMPTY_1;
                u_parede = row.__EMPTY_2;
                ct_parede = row.__EMPTY_3;
                ars_parede = row.__EMPTY_4;
                var dict = {nome: nome_parede, u_par: u_parede, ct_par: ct_parede, ars_par: ars_parede}
                paredes_externas.push(dict)
            }

            if ([row.__EMPTY_6, row.__EMPTY_7, row.__EMPTY_8].includes(undefined)){}
            else{
                nome_parede = row.__EMPTY_6;
                u_parede = row.__EMPTY_7;
                ct_parede = row.__EMPTY_8;
                var dict = {nome: nome_parede, u_par: u_parede, ct_par: ct_parede}
                paredes_internas.push(dict)
            }

            //verificação para as coberturas
            if ([row.__EMPTY_10, row.__EMPTY_11, row.__EMPTY_12, row.__EMPTY_13].includes(undefined)){} 
            else{
                nome_cob = row.__EMPTY_10;
                u_cobertura = row.__EMPTY_11;
                ct_cobertura = row.__EMPTY_12;
                ars_cobertura = row.__EMPTY_13;
                var dict = {nome: nome_cob, u_cob: u_cobertura, ct_cob: ct_cobertura, ars_cob: ars_cobertura}
                coberturas.push(dict)
            }

            //verificação para os pisos
            if ([row.__EMPTY_15, row.__EMPTY_16, row.__EMPTY_17].includes(undefined)){}
            else{
                
                nome_pis = row.__EMPTY_15;
                u_pis = row.__EMPTY_16;
                ct_pis = row.__EMPTY_17;
                var dict = {nome: nome_pis, u_piso: u_pis, ct_piso: ct_pis}
                pisos.push(dict)
            }


            //verificação para os vidros
            if ([row.__EMPTY_19, row.__EMPTY_20, row.__EMPTY_21].includes(undefined)){}
            else{
                nome_vidro = row.__EMPTY_19;
                u_vidro = row.__EMPTY_20;
                fs_vidro = row.__EMPTY_21;
                var dict = {nome: nome_vidro, u_vid: u_vidro, fs_vid: fs_vidro}
                vidros.push(dict)
            }

            //verificação para os vidros az
            if ([row.__EMPTY_23, row.__EMPTY_24, row.__EMPTY_25].includes(undefined)){}
            else{
                nome_vidro = row.__EMPTY_23;
                u_vidro = row.__EMPTY_24;
                fs_vidro = row.__EMPTY_25;
                var dict = {nome: nome_vidro, u_vid: u_vidro, fs_vid: fs_vidro}
                vidros_az.push(dict)
            }
            
            //verificação para os sistemas de AC 
            if ([row.__EMPTY_27, row.__EMPTY_28, row.__EMPTY_29,row.__EMPTY_30, row.__EMPTY_31].includes(undefined)){console.log('erro_ac')} // a row.__EMPTY_20 é a potência dos equipamentos de renovação. Seu valor pode estar em branco porque os equipamentos com capacidade >17,6 não precisam desses sistemas de renovação associados
            else{
                nome_sistema = row.__EMPTY_27;
                tipo_ac = row.__EMPTY_28;
                capacidade_ac = row.__EMPTY_29;
                tipo_coeficiente = row.__EMPTY_30;
                valor_coeficiente = row.__EMPTY_31;
                pot_renovacao = row.__EMPTY_32;
                var dict = {nome: nome_sistema, tipo:tipo_ac, capacidade: capacidade_ac, tipo_cee: tipo_coeficiente, valor_cee: valor_coeficiente, potencia_renovacao:pot_renovacao}
                sistemas_ac.push(dict)
            }

            
        }

        //pegar dados preenchidos para a envoltória
        var excelRows_puro = XLSX.utils.sheet_to_row_object_array(workbook.Sheets['Envoltória']);
        
        // tomar as cargas térmicas pelo método de simulação se ele for o selecionado

        
        if (excelRows_puro[4].__EMPTY_2 == 'Método de Simulação'){
            //primeiro tomar o nome do software de simulação
            document.getElementById('software').value = XLSX.utils.sheet_to_row_object_array(workbook.Sheets['Opc_Simulação'])[7].__EMPTY_1;
            document.getElementById('check_simulacao').checked = true;
            document.getElementById('check_simplificado').checked = false;
            document.getElementById('div_simulacao').style.display = 'block';
            document.getElementById('div_simplificado').style.display = 'none'; 
            document.getElementById('carga_sim_real').value = excelRows_puro[6].__EMPTY_2;
            document.getElementById('carga_sim_ref').value = excelRows_puro[5].__EMPTY_2;  
            document.getElementById('equipamentos_simulacao').value = XLSX.utils.sheet_to_row_object_array(workbook.Sheets['Opc_Simulação'])[7].__EMPTY_29;
        }

        //se for pelo método simplificado, tomar as informações da planilha
        else{
            
            excelRows = excelRows_puro.map(Object.values)
            excelRows.push(excelRows_puro.map(Object.keys)[0])
            excelRows = Object.values(excelRows)
            excelRows = excelRows.slice(11,-1)      
            var table = document.getElementById("myTable");

            //código que remove todas as linhas existentes e reinsere o cabeçalho
            //pode ser opcional?
            linhas_tabela = (table.rows)[0]
            $("#myTable tr").remove(); 
            $("#myTable").find('thead').prepend(linhas_tabela);

            pavimento_preencher = []
            orientacoes_preencher = []
            usos_preencher = []
            tipos_preencher = []
            adjacente_preencher = []
            paredes_ext_preencher = []
            paredes_int_preencher = []
            coberturas_preencher = []
            pisos_preencher = []
            vidros_preencher = []
            vidros_az_preencher = []
            cond_fachada = []
            sistemas_preencher = []
            valores_paf = []
            valores_paz = []

            
            for (linha of excelRows){


                //fazer condicional para 26 linhas e afins (quando não houver os preenchimentos)(verificar o que é interna, PAZ 0 e reposicionar as linhas)
                index_linha = linha.slice(0,1)
                linha = linha.slice(1,-2) // remove o primeiro valor, que é o índice, e os dois últimos, de preenchimento opcional
                
                if ((linha.length < 21 && linha.length > 4)){ //2 é o número mínimo de caracteres capturados se estiver tudo em branco, pois há 2 campos com fórmulas (dpi e dpe), 20 é o número de valores preenchidos se tudo estiver correto
                    if (numero == undefined){numero = ''}
                    var numero =  numero + ' ' + String(index_linha)
                    
                }
   
                else if (linha.length == 4){} // se não houver nada preenchido ignora
                else {
                    //indice_linha = excelRows.indexOf(linha)
                    indice_linha = $('#myTable tr').length;
                    indice_linha = indice_linha - 1 
                    var row = table.insertRow(indice_linha+1); //aqui seria + o que já existe para apenas adicionar
                    row.id = 'zona'+indice_linha
                    //fazer ifs confome o tamanho da linha dentro do else
                    if (linha.length == 25 && linha[5] == 'Interna'){
                        var ss = linha;
                        // splice(position, numberOfItemsToRemove, item)
                        ss.splice(2, 0, "three");
                        console.log(ss);
                    }

                    var cell1= row.insertCell(0);
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
                    //inserir em cada um a linha necessária
                    //nos que tem select aplicar o filtro   
                    cell1.innerHTML = '<select id="lista_pavimentos'+indice_linha+'"type="text"></select>'; 
                    pavimento_preencher.push(linha[0])
                    cell2.innerHTML = '<input id="nome_zona'+indice_linha+'" type="text" value='+linha[1]+'>';
                    cell3.innerHTML = '<input id="area_zona'+indice_linha+'" type="number" value='+linha[2]+' min="0" max="10000">';
                    cell4.innerHTML = '<input id="pd_zona'+indice_linha+'" type="number" value='+linha[3]+' min="2.6" max="6.6">';
                    cell5.innerHTML = '<select id="tipo_zona'+indice_linha+'"><option value="Interna">Interna</option><option value="Perimetral">Perimetral</option></select>'
                    tipos_preencher.push(linha[4])
                    cell6.innerHTML = '<select id="orientacoes'+(indice_linha)+'"><option value="N">N</option><option value="NE">NE</option><option value="L">L</option><option value="SE">SE</option><option value="S">S</option><option value="SO">SO</option><option value="O">O</option><option value="NO">NO</option></select>'
                    orientacoes_preencher.push(linha[5])
                    cell7.innerHTML = '<select id="zona_adjacente'+indice_linha+'"><option value="Zona adjacente condicionada">Zona adjacente condicionada</option><option value="Zona adjacente não-condicionada">Zona adjacente não-condicionada</option></select>';
                    adjacente_preencher.push(linha[6])
                    cell8.innerHTML = '<select id="lista_usos'+indice_linha+'"></select>'
                    usos_preencher.push(linha[7])
                    cell9.innerHTML = '<select id="lista_paredes_ext'+(indice_linha)+'"></select>'
                    paredes_ext_preencher.push(linha[8]) 
                    cell10.innerHTML = '<select id="lista_paredes_int'+(indice_linha)+'"></select>'
                    paredes_int_preencher.push(linha[9]) 
                    cell11.innerHTML = '<select id="lista_coberturas'+(indice_linha)+'"></select>'
                    coberturas_preencher.push(linha[10])
                    cell12.innerHTML = '<select id="lista_pisos'+(indice_linha)+'"></select>'
                    pisos_preencher.push(linha[11])  
                    cell13.innerHTML = '<select id="lista_vidros'+(indice_linha)+'"></select>'
                    vidros_preencher.push(linha[12])                   
                    cell14.innerHTML = '<input id="paf_zona'+indice_linha+'" type="number" value="'+linha[13]+'"min="0" max="90">';
                    valores_paf.push(linha[13])
                    cell15.innerHTML = '<select id="fachada'+indice_linha+'"><option value="Sim">Sim</option><option value="Não">Não</option></select>';
                    cond_fachada.push(linha[14])
                    cell16.innerHTML = '<input id="avs_zona'+indice_linha+'" type="number" value="'+linha[15]+'"min="0" max="90">';
                    cell17.innerHTML = '<input id="ahs_zona'+indice_linha+'" type="number"value="'+linha[16]+'"min="0" max="90">';
                    cell18.innerHTML = '<input id="aov_zona'+indice_linha+'" type="number" value="'+linha[17]+'"min="0" max="90">';
                    cell19.innerHTML = '<input id="paz_zona'+indice_linha+'" type="number" value="'+linha[18]+'"min="0" step="0.01" max="5">';
                    valores_paz.push(linha[18])
                    cell20.innerHTML = '<select id="lista_vidros_az'+(indice_linha)+'"></select>'
                    vidros_az_preencher.push(linha[19])
                    cell21.innerHTML = '<input id="dpi_zona'+indice_linha+'" type="number" value="'+linha[20]+'"min="0" max="90">';
                    cell22.innerHTML = '<select id="ac_zona'+indice_linha+'"></select>';
                    sistemas_preencher.push($.trim(linha[24]))
                    cell23.innerHTML = '<input id="cgtt_zona'+indice_linha+'" disabled>';
                    cell24.innerHTML = '<input  id="cgtt_ref'+indice_linha+'" type="number" disabled>';
                    cell25.innerHTML = '<button class="btn btn-danger" id="rem'+indice_linha+'" onclick="remover_zona(this.id)"><img src="img/trash.svg" class="icone_trash"></button>'
                    cell26.innerHTML = '<button class="btn btn-secondary" id="sem'+indice_linha+'" onclick="cloneRow(this.id); adicionar_limites()">Duplicar</button>'
                }
            }
            
            //uma vez inseridos os componentes nas células, escolher os valores dentro dessas listas para cada elemento
            var rowCount = $('#myTable tr').length;
            var rowCount = rowCount - 1
            for (var i = 0; i < rowCount; i++) {

                //carregar tipos de uso das zonas
                var uso_zona_lista = document.getElementById('lista_usos'+(i));
                uso_zona_lista.innerHTML = "";
                uso_zonas.forEach(uso =>{
                var optionInc6 = document.createElement("OPTION");
                optionInc6.innerHTML = uso.nome;
                uso_zona_lista.appendChild(optionInc6);
                });
                uso_zona_lista.value = usos_preencher[i]

                //carregar condições de exposição do piso
                var cond_pav = document.getElementById('lista_pavimentos'+(i));
                cond_pav.innerHTML = "";
                condicoes_pav.forEach(pav => {
                    var optionInc = document.createElement('OPTION');
                    optionInc.innerHTML = pav.nome;
                    cond_pav.appendChild(optionInc)
                })
                cond_pav.value = pavimento_preencher[i]
                
                //tipo de zona    
                sel_tipo = document.getElementById("tipo_zona"+i)
                sel_tipo.value = tipos_preencher[i]

                //orientacoes    
                sel_orientacoes = document.getElementById("orientacoes"+i)
                sel_orientacoes.value = orientacoes_preencher[i]    

                //paredes    
                var selparedes = document.getElementById("lista_paredes_ext"+(i));
                paredes_externas.forEach(parede => { var optionInc = document.createElement("OPTION");
                optionInc.innerHTML = parede.nome
                selparedes.appendChild(optionInc);
                selparedes.value = paredes_ext_preencher[i]
                })

                var selparedesi = document.getElementById("lista_paredes_int"+(i));
                paredes_internas.forEach(parede => { var optionInc33 = document.createElement("OPTION");
                optionInc33.innerHTML = parede.nome
                selparedesi.appendChild(optionInc33);
                selparedesi.value = paredes_int_preencher[i]
                })

                //coberturas    
                var selcobs = document.getElementById("lista_coberturas"+(i));
                coberturas.forEach(cobertura => { var optionInc1 = document.createElement("OPTION");
                optionInc1.innerHTML = cobertura.nome
                selcobs.appendChild(optionInc1);
                selcobs.value = coberturas_preencher[i]
                })

                
                //coberturas    
                var selpisos = document.getElementById("lista_pisos"+(i));
                pisos.forEach(piso => { var optionInc1 = document.createElement("OPTION");
                optionInc1.innerHTML = piso.nome
                selpisos.appendChild(optionInc1);
                selpisos.value = pisos_preencher[i]
                })

                //vidros
                var selvidros = document.getElementById("lista_vidros"+(i));
                vidros.forEach(vidro => { var optionInc2 = document.createElement("OPTION");
                optionInc2.innerHTML = vidro.nome
                selvidros.appendChild(optionInc2);
                selvidros.value = vidros_preencher[i]
                })

                 //vidros az
                 var selvidros = document.getElementById("lista_vidros_az"+(i));
                 vidros_az.forEach(vidro => { var optionInc2 = document.createElement("OPTION");
                 optionInc2.innerHTML = vidro.nome
                 selvidros.appendChild(optionInc2);
                 selvidros.value = vidros_az_preencher[i]
                 })

                //fachada 
                var fachada_zona = document.getElementById('fachada'+i)
                fachada_zona.value = cond_fachada[i]

                //sistemas de AC

                var sel_ac = document.getElementById("ac_zona"+(i));
                sistemas_ac.forEach(sistema => {
                var optionInc51 = document.createElement("OPTION");
                optionInc51.innerHTML = sistema.nome
                sel_ac.appendChild(optionInc51);
                sel_ac.value = (sistemas_preencher[i]) //o trim remove eventuais espaços antes e depois da string
                })

                
                //travar campos se cob não exposta ou zona interna

                travar_array = ['orientacoes', 'lista_vidros', 'lista_paredes_ext', 'avs_zona', 'ahs_zona', 'aov_zona', 'paf_zona']
                
                if (tipos_preencher[i] =='Interna') {
                    //primeiro trava a condição da fachada
                    document.getElementById('fachada'+i).value = 'Não'
                    document.getElementById('fachada'+i).style.background = '#F5F5F5';
                    document.getElementById('fachada'+i).disabled = true;

                    //depois retira os valores e trava as demais condições
                    for (travar of travar_array){                                                       
                    document.getElementById(travar+i).value = '';
                    document.getElementById(travar+i).style.background = '#F5F5F5';
                    document.getElementById(travar+i).disabled = true;
                    }
                    //travar orientacao para interna
                    document.getElementById('orientacoes'+i).value = 'Interna'
                    document.getElementById('orientacoes'+i).disabled = true;
                }
                //cobertura não exposta
                if (['Térreo (com + pvtos acima)', 'Intermediário', 'Pilotis (com + pvtos acima)'].includes(condicoes_pav)[i]) {                               
                    document.getElementById('lista_coberturas'+i).value = '';
                    document.getElementById('lista_coberturas'+i).style.background = '#F5F5F5';
                    document.getElementById('lista_coberturas'+i).disabled = true;
                }

                //travar vidros para PAF 0
                if (valores_paf[i] == 0){
                    document.getElementById('lista_vidros'+i).value = '';
                    document.getElementById('lista_vidros'+i).style.background = '#F5F5F5';
                    document.getElementById('lista_vidros'+i).disabled = true;
                }
                else{
                    document.getElementById('lista_vidros'+i).style.background = '#FFFF';
                    document.getElementById('lista_vidros'+i).disabled = false;
                }        
                
                //travar vidros para PAZ 0
                if (valores_paz[i] == 0){
                    document.getElementById('lista_vidros_az'+i).value = '';
                    document.getElementById('lista_vidros_az'+i).style.background = '#F5F5F5';
                    document.getElementById('lista_vidros_az'+i).disabled = true;
                }
                else{
                    document.getElementById('lista_vidros_az'+i).style.background = '#FFFF';
                    document.getElementById('lista_vidros_az'+i).disabled = false;
                } 

                //travar fachada principal quando não for varejo
                if (usos_preencher[i].includes('Varejo')) {
                    document.getElementById('fachada'+i).style.background = '#FFFFFF';
                    document.getElementById('fachada'+i).disabled = false;               
                }
                else {
                    document.getElementById('fachada'+i).value = 'Não';  
                    document.getElementById('fachada'+i).style.background = '#F5F5F5';
                    document.getElementById('fachada'+i).disabled = true;                             
                }
                    
            }

                
            

            //mostrar mensagem indicando se houve erro ou não
            if (numero != undefined){
                mensagem = 'Atenção, existem erros de preenchimento na planilha. Verifique se todos os campos estão preenchidos ou se os componentes selecionados existem! As linhas referentes a zonas térmicas preenchidas incorretamente não serão importadas! Verifique a(s) linha(s): '
                window.alert(mensagem + numero)
            }

            else {window.alert('Planilha importada com sucesso!')}
        }
    }
    adicionar_limites() //depois de adicionada a planilha, adiciona os limites 
}

//importar lista de materiais e injetar nos que ali existem 
//contar quantos novos e injetar 

function atualizar(){


        var reader = new FileReader();
        reader.onload = (e) => {
            GetTableFromExcel(e.target.result)
            //pode ser capturada da tabela, mas teria que filtrar
        };
        reader.readAsBinaryString(fileUpload.files[0]);
        document.querySelector('#fileUpload').value = null;
    }