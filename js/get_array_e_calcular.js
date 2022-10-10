//Aqui foi inserida a lista de usos da zona e suas características padrão
var uso_zonas = [
//escritórios    
{'nome':'Escritórios','dpi_ref':14.1,'dpe_ref':15,'densidade_ocupacao':0.1,'horas_ocupacao':10,'dias_ocupacao':260, 'paf_ref': 0.5},
//educacional infantil
{'nome':'Educacional - Infantil','dpi_ref':15.5,'dpe_ref':15,'densidade_ocupacao':0.4,'horas_ocupacao':8,'dias_ocupacao':200, 'paf_ref': 0.4},
//educacional medio
{'nome':'Educacional - Fundamental e médio','dpi_ref':15.5,'dpe_ref':15,'densidade_ocupacao':0.667,'horas_ocupacao':8,'dias_ocupacao':200, 'paf_ref': 0.4},
//educacional superior
{'nome':'Educacional - Superior','dpi_ref':15.5,'dpe_ref':15,'densidade_ocupacao':0.667,'horas_ocupacao':8,'dias_ocupacao':200, 'paf_ref': 0.4},
//hospedagem
{'nome':'Hospedagem','dpi_ref':15.7,'dpe_ref':20,'densidade_ocupacao':0.056,'horas_ocupacao':14.4,'dias_ocupacao':365, 'paf_ref': 0.45},
//EAS (saúde)
{'nome':'Est. Assist. de Saúde','dpi_ref':15,'dpe_ref':40,'densidade_ocupacao':0.2,'horas_ocupacao':12,'dias_ocupacao':365, 'paf_ref': 0.14},
//Varejo comércio
{'nome':'Varejo - Comércio','dpi_ref':20,'dpe_ref':20,'densidade_ocupacao':0.2,'horas_ocupacao':12,'dias_ocupacao':300, 'paf_ref_principal': 0.6, 'paf_ref': 0.05},
//Varejo mercados
{'nome':'Varejo - Mercados','dpi_ref':16.3,'dpe_ref':40,'densidade_ocupacao':0.2,'horas_ocupacao':12,'dias_ocupacao':350, 'paf_ref_principal': 0.6, 'paf_ref': 0.05},
//restaurantes
{'nome':'Restaurantes','dpi_ref':13.9,'dpe_ref':40,'densidade_ocupacao':0.2,'horas_ocupacao':8,'dias_ocupacao':350, 'paf_ref': 0.4},
//outras
{'nome':'Outras','dpi_ref':15,'dpe_ref':40,'densidade_ocupacao':0.2,'horas_ocupacao':12,'dias_ocupacao':300, 'paf_ref': 0.6}]


var condicoes_piso = [{'nome': 'Isolado sobre o solo', 'Pisol': 1, 'FloorGroud': 1, 'FloorOutdoors': 0},{'nome': 'Isolado entre pavimentos', 'Pisol': 1, 'FloorGroud': 0, 'FloorOutdoors': 0}, {'nome': 'Isolado sobre pilotis', 'Pisol': 1, 'FloorGroud': 0, 'FloorOutdoors': 1},{'nome': 'Não isolado sobre o solo', 'Pisol': 0, 'FloorGroud': 1, 'FloorOutdoors': 0},{'nome': 'Não isolado entre pavimentos', 'Pisol': 0, 'FloorGroud': 0, 'FloorOutdoors': 0}, {'nome': 'Não isolado sobre pilotis', 'Pisol': 0, 'FloorGroud': 0, 'FloorOutdoors': 1}]

//para a planilha todos os preenchimentos será pegar o que foi preenchido e adicionar o restante 
function carregar_usos(){
    var rowCount = $('#myTable tr').length;
    var rowCount = rowCount - 2 // não conta o cabeçalho e a contagem começa em 0
    
    //carregar tipos de uso das zonas
    var uso_zona_lista = document.getElementById('lista_usos'+(rowCount));
    uso_zona_lista.innerHTML = "";
    uso_zonas.forEach(uso =>{
    var optionInc6 = document.createElement("OPTION");
    optionInc6.innerHTML = uso.nome;
    uso_zona_lista.appendChild(optionInc6);
    });

    //carregar condições de exposição do piso
    var cond_piso = document.getElementById('cond_piso_zona'+(rowCount));
    cond_piso.innerHTML = "";
    condicoes_piso.forEach(piso => {
        var optionInc7 = document.createElement('OPTION');
        optionInc7.innerHTML = piso.nome;
        cond_piso.appendChild(optionInc7)
    })

}

async function calcular(){
    

    //antes de iniciar os cálculos, verificar se as informações da aba geral estão preenchidas

    entradas_geral = ['nome_projeto', 'cidades', 'fator_de_forma','area_construida']

    var erro_aba_geral = 0
    for(entrada of entradas_geral){
        if (document.getElementById(entrada).value == '' ||  document.getElementById(entrada).value == NaN){
            erro_aba_geral = 1
        }
    }

    if (erro_aba_geral == 1){
        window.alert('Atenção! Antes de avaliar a envoltória preencha todos os campos da aba "GERAL"!')
    }
    else{
        var rowCount = $('#myTable tr').length;
        //arr complementos são as informações associadas aos valores escolhidos. Por exemplo, cada uso tem horas de ocupação fixas
        var rowCount = rowCount - 1 //a primeira linha é cabeçalho 
        
        if (rowCount == 0){
            window.alert('Atenção! Para avaliar a envoltória, insira ao menos os dados de uma zona térmica')
        }
        else{
            array_resultados = []
            array_resultados_ref = []
            var consumo_alta_capacidade = 0
            var cargas_baixa_capacidade = 0
            var cee_baixa_capacidade = 0
            var renovacao_baixa_capacidade = 0
            var consumo_resfriamento_ref = 0 // o ref não exige ponderação pois o CEE é sempre 2,6
            var contador_baixa_capacidade = 0
            var total_capacidade = 0

            linhas_com_erro = []

            for (var i = 0; i < rowCount; i++) {
                var array  = []
                //entradas são os valores escolhidos pelo usuário, aqui colocadas conforme a ordem de inserção na interface e na planilha
                entradas = ['lista_pavimentos','nome_zona','area_zona', 'pd_zona','orientacoes','tipo_zona', 'lista_usos',  'cond_piso_zona', 'cond_cob_zona', 'lista_paredes', 'lista_coberturas',  'lista_vidros','paf_zona', 'fachada', 'avs_zona', 'ahs_zona', 'aov_zona', 'dpi_zona', 'dpe_zona']
                entradas_excecao = ['lista_pavimentos','nome_zona','area_zona', 'pd_zona','tipo_zona', 'lista_usos',  'cond_piso_zona', 'cond_cob_zona',  'lista_coberturas', 'fachada',  'dpi_zona', 'dpe_zona']
                


                //verificação de células em branco:
                var com_erro = 0
                var zona_tipo = document.getElementById('tipo_zona'+i).value
                var tipo_de_cobertura = document.getElementById('cond_cob_zona'+i).value

                if (zona_tipo == 'Interna'){
                    for (entrada of entradas_excecao){
                        if(document.getElementById(entrada+i).value == ''){
                            if(tipo_de_cobertura == 'Não exposta' && entrada == 'lista_coberturas'){}
                            else{
                                com_erro = 1
                            }
                        }
                    }
                }

                else{
                    for (entrada of entradas){
                        if(document.getElementById(entrada+i).value == ''){
                            if(tipo_de_cobertura == 'Não exposta' && entrada == 'lista_coberturas'){}
                            else{
                                com_erro = 1
                            }
                        }
                    }
                }


                for (entrada of entradas) {
                    conteudo = document.getElementById(entrada+i).value;
                    if (entrada == 'cond_cob_zona'){
                        if (conteudo == 'Exposta'){conteudo = 1}
                        else {conteudo = 0}
                    }
                    array.push(conteudo)
                }

                if (com_erro == 1){
                    linhas_com_erro.push(String(i))
                }

                //tratamento dos dados que vem do array inicial

                //variáveis fixas:
                var INF = 0.5

                //dados a serem tratados:

                //pé direito
                var PD = parseFloat(array[entradas.indexOf('pd_zona')])
                
                //Azimute
                var posicao_azimute = array[entradas.indexOf('orientacoes')]
                if (posicao_azimute =='N'){var AZI = 0}
                else if (posicao_azimute =='NE'){var AZI = 45}
                else if (posicao_azimute =='L'){var AZI = 90}
                else if (posicao_azimute =='SE'){var AZI = 135}
                else if (posicao_azimute =='S'){var AZI = 180}
                else if (posicao_azimute =='SO'){var AZI = 225}
                else if (posicao_azimute =='O'){var AZI = 270}
                else {var AZI = 315}

                //condicionais se a zona for interna 
                if (array [entradas.indexOf('tipo_zona')] == 'Interna'){
                    var Zint = 1
                    var AZI = 0
                    var FS = 0
                    var uvid = 0
                    var WWR = 0
                    var AHS =  0
                    var AOV = 0
                    var AVS = 0
                    var FS_ref = 0
                    var uvid_ref = 0
                    var WWR_ref = 0
                    var INF = 0
                    var apar = 0
                    var upar = 0
                    var ct_par = 0
                }
                
                else {//caso não seja zona interna (quando é perimetral)
                    
                    var Zint = 2
                    
                    //dados dos vidros
                    dados_vidro = vidros.filter(vidro => vidro.nome ==  array[entradas.indexOf('lista_vidros')])[0]; 
                    var uvid = dados_vidro.u_vid;
                    var FS = dados_vidro.fs_vid;
                    var uvid_ref = 5.7
                    var FS_ref = 0.82

                    // dados da parede 
                    dados_parede = paredes.filter(parede => parede.nome ==  array[entradas.indexOf('lista_paredes')])[0]
                    var apar = dados_parede.ars_par;
                    var upar = dados_parede.u_par;
                    var ct_par = dados_parede.ct_par;

                    //angulos da abertura
                    var AHS = parseFloat(array[entradas.indexOf('ahs_zona')])
                    var AVS = parseFloat(array[entradas.indexOf('avs_zona')])
                    var AOV = parseFloat(array[entradas.indexOf('aov_zona')])

                    //PAF
                    var WWR = parseFloat(array[entradas.indexOf('paf_zona')])/100
                }

                // dados relativos à tipologia -> posteriormente capturar dados de referência
                dados_uso = uso_zonas.filter(uso => uso.nome == array[entradas.indexOf('lista_usos')])[0];  //0 pois espera-se que encontre somente um, mas de toda forma retorna o primeiro que encontrar
                var hOcc = dados_uso.horas_ocupacao; // horas de ocupação
                var pessoas = dados_uso.densidade_ocupacao;
                

                // dados dependentes da exposição e isolamento do piso
                dados_piso = condicoes_piso.filter(piso => piso.nome == array[entradas.indexOf('cond_piso_zona')])[0]
                var PISOisol = dados_piso.Pisol;
                var FGroud = dados_piso.FloorGroud;
                var FOutdoors = dados_piso.FloorOutdoors;

                var apar_ref = 0.5
                var upar_ref = 2.39
                var ct_par_ref = 150

                //condição de exposição da cobertura
                var RoofOutdoors = array[entradas.indexOf('cond_cob_zona')]

                // dados da cobertura (colocar condicional das zonas internas para travar)
                dados_cobertura = coberturas.filter(cobertura => cobertura.nome ==  array[entradas.indexOf('lista_coberturas')])[0]
                if (RoofOutdoors == 1){
                    var acob = dados_cobertura.ars_cob;
                    var ucob = dados_cobertura.u_cob;
                    var ct_cob = dados_cobertura.ct_cob;
                    var acob_ref = 0.8;
                    var ucob_ref = 2.06;
                    var ct_cob_ref = 233;

                }
                else{ //se não for exposto não precisa dos dados, toma como zero
                    var acob = 0;
                    var ucob = 0;
                    var ct_cob = 0;
                    var acob_ref = 0;
                    var ucob_ref = 0;
                    var ct_cob_ref = 0;
                }


                //condicional para o paf
                if (WWR == 0){var WWR_ref = 0}
                else {
                    if (array[entradas.indexOf('fachada') == 'Não']){
                        var WWR_ref = dados_uso.paf_ref;
                    }
                    else{
                        if (dados_uso.paf_ref_principal == undefined){ //pode-se preencher que é principal em uma tipologia que não tem diferenciação de principal, dai tomar apenas o paf_ref
                            var WWR_ref = dados_uso.paf_ref;
                        }
                        else{var WWR_ref = dados_uso.paf_ref_principal}
                    }
                }

                var DPI = parseFloat(array[entradas.indexOf('dpi_zona')])
                var DPE = parseFloat(array[entradas.indexOf('dpe_zona')])
                var DPI_ref = dados_uso.dpi_ref


                
                // as informações de clima já foram descritas na função cidades.js
                // a ordem é: AZI	 DPE	 DPI	 FS	 INF	 PESSOAS	 UVID	 aCOB	 aPAR	 PD	 WWR	 AHS	 AVS	 AOV	 hOcc	 FloorGround	 FloorOutdoors	 RoofOutdoors	 Ucob	 Upar	 CTcob	 CTpar	 PISOisol	 Zint	 Latitude	 Altitude	 Vvento	 Radiacao	 TMA	 dpT	 AMA	 dpA

                array_zona = [parseInt(AZI), DPE, DPI , FS, INF, pessoas, uvid, acob, apar, PD, (WWR), AHS, AVS, AOV, hOcc, FGroud, FOutdoors, RoofOutdoors, ucob, upar, ct_cob, ct_par, PISOisol, Zint, parseFloat(LAT), parseFloat(Altitude), parseFloat(VVENTO), parseFloat(RAD), parseFloat(TMA), parseFloat(DPT), parseFloat(AMA), parseFloat(DPA)]

                array_zona_ref = [parseInt(AZI), DPE, DPI_ref , FS_ref, INF, pessoas, uvid_ref, acob_ref, apar_ref, PD, WWR_ref, 0, 0, AOV, hOcc, FGroud, FOutdoors, RoofOutdoors, ucob_ref, upar_ref, ct_cob_ref, ct_par_ref, 0, Zint, parseFloat(LAT), parseFloat(Altitude), parseFloat(VVENTO), parseFloat(RAD), parseFloat(TMA), parseFloat(DPT), parseFloat(AMA), parseFloat(DPA)]
                
                //uma vez obtido o array, ele deve ser normalizado e depois inserido no metamodelo 
                // para normalizar toma-se os valores máximos e mínimos do modelo
                min = {
                    "AZI":0.0,
                    "DPE":4.0,
                    "DPI":4.0,
                    "FS":0.0,
                    "INF":0.5,
                    "PESSOAS":0.05,
                    "UVID":0.0,
                    "aCOB":0.0,
                    "aPAR":0.0,
                    "PD":2.6,
                    "WWR":0.0,
                    "AHS":0.0,
                    "AVS":0.0,
                    "AOV":0.0,
                    "hOcc":8.0,
                    "FloorGround":0.0,
                    "FloorOutdoors":0.0,
                    "RoofOutdoors":0.0,
                    "Ucob":0.0,
                    "Upar":0.0,
                    "CTcob":0.0,
                    "CTpar":0.0,
                    "PISOisol":0.0,
                    "Zint":1.0,
                    "Latitude":-33.74,
                    "Altitude":2.0,
                    "Vvento":0.99,
                    "Radiacao":151.37,
                    "TMA":10.88,
                    "dpT":0.32,
                    "AMA":2.49,
                    "dpA":0.26
                }
                
                max = {
                    "AZI":315.0,
                    "DPE":40.0,
                    "DPI":40.0,
                    "FS":0.87,
                    "INF":1.5,
                    "PESSOAS":0.7,
                    "UVID":5.7,
                    "aCOB":0.8,
                    "aPAR":0.8,
                    "PD":6.6,
                    "WWR":0.9,
                    "AHS":80.0,
                    "AVS":90.0,
                    "AOV":80.0,
                    "hOcc":24.0,
                    "FloorGround":1.0,
                    "FloorOutdoors":1.0,
                    "RoofOutdoors":1.0,
                    "Ucob":5.07,
                    "Upar":4.4,
                    "CTcob":220.0,
                    "CTpar":220.0,
                    "PISOisol":1.0,
                    "Zint":2.0,
                    "Latitude":2.8,
                    "Altitude":1810.0,
                    "Vvento":7.38,
                    "Radiacao":271.1,
                    "TMA":29.27,
                    "dpT":4.86,
                    "AMA":9.58,
                    "dpA":2.48
                }
                
                arr_normalizado = []
                for (var prop in max) {
                    index =(Object.keys(max)).indexOf(prop);
                    valor_normalizado = ((array_zona[index]-min[prop])/(max[prop]-min[prop]))* (1 - (-1)) + (-1) //* (1 - (-1)) + (-1) é para normalizar entre -1 e 1
                    arr_normalizado.push(valor_normalizado)
                }

                arr_normalizado_ref = []
                for (var prop in max) {
                    index =(Object.keys(max)).indexOf(prop);
                    valor_normalizado_ref = ((array_zona_ref[index]-min[prop])/(max[prop]-min[prop]))* (1 - (-1)) + (-1) //* (1 - (-1)) + (-1) é para normalizar entre -1 e 1
                    arr_normalizado_ref.push(valor_normalizado_ref)
                    }

                try {
                //const secao = await ort.InferenceSession.create('./PHFFT_Calor.onnx');
                const secao =  await ort.InferenceSession.create('metamodelo_inic_ann.onnx');
                
                secao['handler']['inputNames'][0] = 'entradas'
                secao['handler']['outputNames'][0] = 'saidas'

                const dado = Float32Array.from(arr_normalizado);
                const tensor = new ort.Tensor('float32', dado, [1, 32]);
                const entradas_dict = { 'entradas': tensor };
                const saidas =  await secao.run(entradas_dict);
                const resultados = Math.round(saidas['saidas'].data*array[entradas.indexOf('area_zona')]);
                array_resultados.push(resultados)

                const dado_ref = Float32Array.from(arr_normalizado_ref);
                const tensor_ref = new ort.Tensor('float32', dado_ref, [1, 32]);
                const entradas_dict_ref = { 'entradas': tensor_ref };
                const saidas_ref =  await secao.run(entradas_dict_ref);
                const resultados_ref = Math.round(saidas_ref['saidas'].data*array[entradas.indexOf('area_zona')]);
                array_resultados_ref.push(resultados_ref)

                //console.log(array_resultados, array_resultados_ref)
                //console.log('A carga térmica da zona é: '+ resultados + ' kWh/ano')
                } 
                catch (e) {
                console.log(`Erro: ${e}.`);
                }
            
                document.getElementById('cgtt_zona'+i).value = array_resultados[i]
                document.getElementById('cgtt_ref'+i).value = array_resultados_ref[i]

                //uma vez calculadas as cargas térmicas, tomar os dados do sistema de condicionamento para calcular os CEE e o consumo
                var sistema_zona = sistemas_ac.filter(sistema => sistema.nome == document.getElementById('ac_zona'+i).value)[0]
                var nome_sistema_zona = sistema_zona.nome;
                var tipo_sistema = sistema_zona.tipo_sistema;
                var capacidade_sistema = sistema_zona.capacidade
                total_capacidade += parseFloat(capacidade_sistema)
                var tipo_cee = sistema_zona.tipo_cee;
                var valor_cee = sistema_zona.valor_cee;
                var potencia_renovacao = sistema_zona.potencia_renovacao;
                consumo_renovacao = potencia_renovacao*hOcc*dados_uso.dias_ocupacao/1000
                if (tipo_cee == 'COP'){
                    cee_baixa_capacidade += (capacidade_sistema*(1.062*valor_cee))/(capacidade_sistema)
                    cargas_baixa_capacidade += array_resultados[i]
                    renovacao_baixa_capacidade += consumo_renovacao
                    contador_baixa_capacidade += 1
                }

                else if(tipo_cee =='IDRS' || tipo_cee == 'CSPF'){
                    cee_baixa_capacidade += (capacidade_sistema*valor_cee)/(capacidade_sistema)
                    cargas_baixa_capacidade += array_resultados[i]
                    renovacao_baixa_capacidade += consumo_renovacao
                    contador_baixa_capacidade += 1
                }
                else{
                    consumo_alta_capacidade += (array_resultados[i]/valor_cee)+consumo_renovacao
                }

                consumo_resfriamento_ref += ((array_resultados_ref[i]/2.6)+(consumo_renovacao))
            }

            if (linhas_com_erro.length > 0){
                window.alert('Atenção, existem erros de preenchimento na(s) seguinte(s) célula(s): ' + linhas_com_erro.join(',') + '. Corrija o preenchimento e tente calcular novamente!')
            }
            else{
                //calcular os consumos para baixa capacidade e somar os de alta, a partir das ponderações
                if (cee_baixa_capacidade > 0){
                    cee_baixa_capacidade = cee_baixa_capacidade / contador_baixa_capacidade 
                    cee_total_baixa = cargas_baixa_capacidade/((cargas_baixa_capacidade/cee_baixa_capacidade)+renovacao_baixa_capacidade)
                    consumo_total_baixa = (cargas_baixa_capacidade/cee_total_baixa)+renovacao_baixa_capacidade
                }
                else{consumo_total_baixa = 0} //se não houver cee de baixa capacidade

                consumo_resfriamento_real = consumo_total_baixa + consumo_alta_capacidade 

                //calculados os consumos, inserir na aba AC
                if(document.getElementById('check_condicionada').checked){
                    document.getElementById('capacidade_ac_cond').value = Number(total_capacidade).toFixed(2)
                    document.getElementById('consumo_ac_real_cond').value = Number(consumo_resfriamento_real).toFixed(2) //arredondamento em 2 casas após a vírgula
                    document.getElementById('consumo_ac_ref_cond').value = Number(consumo_resfriamento_ref).toFixed(2)
                }
                else if(document.getElementById('check_hibrida').checked){
                    document.getElementById('capacidade_ac_hibrido').value = Number(total_capacidade).toFixed(2)
                    document.getElementById('consumo_ac_real_hibrido').value = Number(consumo_resfriamento_real).toFixed(2) //arredondamento em 2 casas após a vírgula
                    document.getElementById('consumo_ac_ref_hibrido').value = Number(consumo_resfriamento_ref).toFixed(2)
                }

                window.alert('Cargas térmicas e consumos calculados com sucesso! \nPara conferir os consumos calculados consulte a aba Ar-condicionado')
            }
        }
    }
}	


