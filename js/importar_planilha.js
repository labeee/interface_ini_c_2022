function GetTableFromExcel(data) {

    let confirmacao = confirm('Ao realizar o upload de sua planilha, você perderá todos os dados previamente preenchidos nesta página. Deseja continuar?') //mensagem de confirmação antes de excluir, se ok, exclui, se cancelar nada acontece
    if (confirmacao){
        var workbook = XLSX.read(data, {
            type: 'binary'
        });


        //importação das informações iniciais
            var linhas_gerais = XLSX.utils.sheet_to_row_object_array(workbook.Sheets['Resumo']).slice(2,);
            //nome do projeto
            document.getElementById('nome_projeto').value = linhas_gerais[0].__EMPTY_2
            //tipologia predominante
            document.getElementById('tipo_predominante').value = linhas_gerais[8].__EMPTY_2
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
            TMA = dados_cidade[0].tma;
            AMA = dados_cidade[0].ama;
            DPT = dados_cidade[0].dpt;
            DPA = dados_cidade[0].dpa;
            LAT = dados_cidade[0].lat;
            LON = dados_cidade[0].lon;
            VVENTO = dados_cidade[0].vvento;
            RAD = dados_cidade[0].radiacao;
            ZB = dados_cidade[0].zb;
            Altitude = dados_cidade[0].Altitude;
        
            zona_nome = document.getElementById('numero_zb')
            zona_nome.innerHTML = '0'+ZB;
        

            //fator de forma
            var ff = linhas_gerais[9].__EMPTY_2
            document.getElementById('fator_de_forma').value = ff 
            
            //área construída 
            document.getElementById('area_construida').value = linhas_gerais[7].__EMPTY_2;


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
            var info_aq = XLSX.utils.sheet_to_row_object_array(workbook.Sheets['AquecimentoÁgua']).slice(4,7); 
            document.getElementById('sistema_aq').value  = info_aq[0].__EMPTY_2
            document.getElementById('aq_referencia').value = info_aq[1].__EMPTY_2
            document.getElementById('aq_real').value = info_aq[2].__EMPTY_2


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
                document.getElementById('check_condicionada').checked= false
                document.getElementById('check_ventilada').checked= true
                document.getElementById('check_hibrida').checked= false
                //alternar as divs
                document.getElementById('div_condicionado').style.display = 'none';
                document.getElementById('div_ventilado').style.display = 'block';  
                document.getElementById('div_hibrido').style.display = 'none'; 
                //se naturalmente ventilada, atribuir valor ao PHOCT
                document.getElementById('PHOCT_ventilado').value = info_ac[10].__EMPTY_2
            }
            
            else if (tipo_de_condicionamento == 'Híbrida'){
                document.getElementById('check_condicionada').checked = false
                document.getElementById('check_ventilada').checked = false
                document.getElementById('check_hibrida').checked = true
                //alternar as divs
                document.getElementById('div_condicionado').style.display = 'none';
                document.getElementById('div_ventilado').style.display = 'none';  
                document.getElementById('div_hibrido').style.display = 'block';
                //atribuir os valores de consumo e capacidade
                document.getElementById('consumo_ac_real_hibrido').value = consumo_ac_real_importado
                document.getElementById('consumo_ac_ref_hibrido').value = consumo_ac_ref_importado 
                document.getElementById('capacidade_ac_hibrido').value = info_ac[7].__EMPTY_2
                //se hibrida, atribuir valor ao PHOCT
                document.getElementById('PHOCT_hibrido').value = parseFloat(info_ac[10].__EMPTY_2)
                //se os requisitos A são atendidos
                document.getElementById('cond_a_hibrido').value = info_ac[13].__EMPTY_2
            }
            else if (tipo_de_condicionamento == 'Condicionada artificialmente'){
                document.getElementById('check_condicionada').checked = true
                document.getElementById('check_ventilada').checked = false
                document.getElementById('check_hibrida').checked = false
                //alternar as divs
                document.getElementById('div_condicionado').style.display = 'block';
                document.getElementById('div_ventilado').style.display = 'none';  
                document.getElementById('div_hibrido').style.display = 'none'; 
                //atribuir os valores de consumo e capacidade
                document.getElementById('consumo_ac_real_cond').value = consumo_ac_real_importado
                document.getElementById('consumo_ac_ref_cond').value = consumo_ac_ref_importado  
                document.getElementById('capacidade_ac_cond').value = info_ac[7].__EMPTY_2
                //se os requisitos A são atendidos
                document.getElementById('cond_a_ac').value = info_ac[13].__EMPTY_2
            }

        //pegar os componentes construtivos preenchidos na tabela, para que sejam inseridos como uma lista na opção de envoltória
        var excelRows2 = XLSX.utils.sheet_to_row_object_array(workbook.Sheets['Aux_Componente']).slice(6,); //as 6 primeiras são as linhas antes das informações dos componentes

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
                paredes.push(dict)
            }

            //verificação para as coberturas
            if ([row.__EMPTY_6, row.__EMPTY_7, row.__EMPTY_8, row.__EMPTY_9].includes(undefined)){} 
            else{
                nome_cob = row.__EMPTY_6;
                u_cobertura = row.__EMPTY_7;
                ct_cobertura = row.__EMPTY_8;
                ars_cobertura = row.__EMPTY_9;
                var dict = {nome: nome_cob, u_cob: u_cobertura, ct_cob: ct_cobertura, ars_cob: ars_cobertura}
                coberturas.push(dict)
                
            }

            //verificação para os vidros
            if ([row.__EMPTY_11, row.__EMPTY_12, row.__EMPTY_13].includes(undefined)){}
            else{
                nome_vidro = row.__EMPTY_11;
                u_vidro = row.__EMPTY_12;
                fs_vidro = row.__EMPTY_13;
                var dict = {nome: nome_vidro, u_vid: u_vidro, fs_vid: fs_vidro}
                vidros.push(dict)
            }
            
            //verificação para os sistemas de AC 
            if ([row.__EMPTY_15, row.__EMPTY_16, row.__EMPTY_17,row.__EMPTY_18, row.__EMPTY_19].includes(undefined)){} // a row.__EMPTY_20 é a potência dos equipamentos de renovação. Seu valor pode estar em branco porque os equipamentos com capacidade >17,6 não precisam desses sistemas de renovação associados
            else{
                nome_sistema = row.__EMPTY_15;
                tipo_ac = row.__EMPTY_16;
                capacidade_ac = row.__EMPTY_17;
                tipo_coeficiente = row.__EMPTY_18;
                valor_coeficiente = row.__EMPTY_19;
                pot_renovacao = row.__EMPTY_20;
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

            orientacoes_preencher = []
            usos_preencher = []
            tipos_preencher = []
            cond_piso_preencher = []
            cond_cob_preencher = []
            paredes_preencher = []
            coberturas_preencher = []
            vidros_preencher = []
            cond_fachada = []
            sistemas_preencher = []

            
            for (linha of excelRows){

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

                    //inserir os conteúdos capturando as informações do modal das zonas
                    //pode entrar aqui o condicional para os limites e valores não preenchidos
                    //inserir em cada um a linha necessária
                    //nos que tem select aplicar o filtro   
                    cell1.innerHTML = '<input id="lista_pavimentos'+indice_linha+'" type="text" value='+linha[0]+'>'; // criar função ? ou deixar como input?
                    cell2.innerHTML = '<input id="nome_zona'+indice_linha+'" type="text" value='+linha[1]+'>';
                    cell3.innerHTML = '<input id="area_zona'+indice_linha+'" type="number" value='+linha[2]+' min="0">';
                    cell4.innerHTML = '<input id="pd_zona'+indice_linha+'" type="number" value='+linha[3]+' min="2.6" max="6.6">';
                    cell5.innerHTML = '<select id="orientacoes'+(indice_linha)+'"><option value="N">N</option><option value="NE">NE</option><option value="L">L</option><option value="SE">SE</option><option value="S">S</option><option value="SO">SO</option><option value="O">O</option><option value="NO">NO</option></select>'
                    orientacoes_preencher.push(linha[4])
                    cell6.innerHTML = '<select id="tipo_zona'+indice_linha+'"><option value="Interna">Interna</option><option value="Perimetral">Perimetral</option></select>'
                    tipos_preencher.push(linha[5])
                    cell7.innerHTML = '<select id="lista_usos'+indice_linha+'"></select>'
                    usos_preencher.push(linha[6])
                    cell8.innerHTML = '<select id="cond_piso_zona'+indice_linha+'"></select>'
                    cond_piso_preencher.push(linha[7])
                    cell9.innerHTML = '<select id="cond_cob_zona'+indice_linha+'"><option value="Exposta">Exposta</option><option value="Não exposta">Não exposta</option></select>'
                    cond_cob_preencher.push(linha[8])
                    cell10.innerHTML = '<select id="lista_paredes'+(indice_linha)+'"></select>'
                    paredes_preencher.push(linha[9]) 
                    cell11.innerHTML = '<select id="lista_coberturas'+(indice_linha)+'"></select>'
                    coberturas_preencher.push(linha[10])
                    cell12.innerHTML = '<select id="lista_vidros'+(indice_linha)+'"></select>'
                    vidros_preencher.push(linha[11])
                    cell13.innerHTML = '<input id="paf_zona'+indice_linha+'" type="number" value="'+linha[12]+'"min="0" max="90">';
                    cell14.innerHTML = '<select id="fachada'+indice_linha+'"><option value="Sim">Sim</option><option value="Não">Não</option></select>';
                    cond_fachada.push(linha[13])
                    cell15.innerHTML = '<input id="avs_zona'+indice_linha+'" type="number" value="'+linha[14]+'"min="0" max="90">';
                    cell16.innerHTML = '<input id="ahs_zona'+indice_linha+'" type="number"value="'+linha[15]+'"min="0" max="90">';
                    cell17.innerHTML = '<input id="aov_zona'+indice_linha+'" type="number" value="'+linha[16]+'"min="0" max="90">';
                    cell18.innerHTML = '<input id="dpi_zona'+indice_linha+'" type="number" value="'+linha[17]+'"min="0" max="90">';
                    cell19.innerHTML = '<input id="dpe_zona'+indice_linha+'" type="number" value="'+linha[18]+'"min="0" max="90">';
                    cell20.innerHTML = '<select id="ac_zona'+indice_linha+'"></select>';
                    sistemas_preencher.push(linha[21])
                    cell21.innerHTML = '<input id="cgtt_zona'+indice_linha+'" disabled="disabled">';
                    cell22.innerHTML = '<input  id="cgtt_ref'+indice_linha+'" type="number" disabled style="display=none">';
                    cell23.innerHTML = '<button class="btn btn-danger" id="rem'+indice_linha+'" onclick="remover_zona(this.id)"><i class="fa fa-trash"></i></button>'
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
                var cond_piso = document.getElementById('cond_piso_zona'+(i));
                cond_piso.innerHTML = "";
                condicoes_piso.forEach(piso => {
                    var optionInc7 = document.createElement('OPTION');
                    optionInc7.innerHTML = piso.nome;
                    cond_piso.appendChild(optionInc7)
                })
                cond_piso.value = cond_piso_preencher[i]
                
                //condição da cobertura
                sel_condcob = document.getElementById('cond_cob_zona'+i);
                sel_condcob.value = cond_cob_preencher[i]


                //tipo de zona    
                sel_tipo = document.getElementById("tipo_zona"+i)
                sel_tipo.value = tipos_preencher[i]

                //orientacoes    
                sel_orientacoes = document.getElementById("orientacoes"+i)
                sel_orientacoes.value = orientacoes_preencher[i]    

                //paredes    
                var selparedes = document.getElementById("lista_paredes"+(i));
                paredes.forEach(parede => { var optionInc = document.createElement("OPTION");
                optionInc.innerHTML = parede.nome
                selparedes.appendChild(optionInc);
                selparedes.value = paredes_preencher[i]
                })

                //coberturas    
                var selcobs = document.getElementById("lista_coberturas"+(i));
                coberturas.forEach(cobertura => { var optionInc1 = document.createElement("OPTION");
                optionInc1.innerHTML = cobertura.nome
                selcobs.appendChild(optionInc1);
                selcobs.value = coberturas_preencher[i]
                })

                //vidros
                var selvidros = document.getElementById("lista_vidros"+(i));
                vidros.forEach(vidro => { var optionInc2 = document.createElement("OPTION");
                optionInc2.innerHTML = vidro.nome
                selvidros.appendChild(optionInc2);
                selvidros.value = vidros_preencher[i]
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
                sel_ac.value = $.trim(sistemas_preencher[i]) //o trim remove eventuais espaços antes e depois da string
                })

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