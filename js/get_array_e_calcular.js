//Aqui foi inserida a lista de usos da zona e suas características padrão
var uso_zonas = [
//escritórios    
{'nome':'Escritórios','dpi_ref':14.1,'dpe_ref':15,'densidade_ocupacao':0.1,'horas_ocupacao':10,'dias_ocupacao':260, 'paf_ref': 0.5, 'sch': 10},
//educacional infantil
{'nome':'Educacional - Infantil','dpi_ref':15.5,'dpe_ref':15,'densidade_ocupacao':0.4,'horas_ocupacao':8,'dias_ocupacao':200, 'paf_ref': 0.4, 'sch': 8},
//educacional medio
{'nome':'Educacional - Fundamental e médio','dpi_ref':15.5,'dpe_ref':15,'densidade_ocupacao':0.667,'horas_ocupacao':8,'dias_ocupacao':200, 'paf_ref': 0.4, 'sch': 8},
//educacional superior
{'nome':'Educacional - Superior','dpi_ref':15.5,'dpe_ref':15,'densidade_ocupacao':0.667,'horas_ocupacao':8,'dias_ocupacao':200, 'paf_ref': 0.4, 'sch': 8},
//hospedagem
{'nome':'Hospedagem','dpi_ref':15.7,'dpe_ref':20,'densidade_ocupacao':0.056,'horas_ocupacao':14.4,'dias_ocupacao':365, 'paf_ref': 0.4, 'sch': 24},
//EAS (saúde)
{'nome':'Est. Assist. de Saúde','dpi_ref':15,'dpe_ref':40,'densidade_ocupacao':0.2,'horas_ocupacao':12,'dias_ocupacao':365, 'paf_ref': 0.14, 'sch': 12},
//Varejo comércio
{'nome':'Varejo - Comércio','dpi_ref':20,'dpe_ref':20,'densidade_ocupacao':0.2,'horas_ocupacao':12,'dias_ocupacao':300, 'paf_ref_principal': 0.6, 'paf_ref': 0.05, 'sch': 12},
//Varejo mercados
{'nome':'Varejo - Mercados','dpi_ref':16.3,'dpe_ref':40,'densidade_ocupacao':0.2,'horas_ocupacao':12,'dias_ocupacao':350, 'paf_ref_principal': 0.6, 'paf_ref': 0.05, 'sch': 12},
//restaurantes
{'nome':'Restaurantes','dpi_ref':13.9,'dpe_ref':40,'densidade_ocupacao':0.2,'horas_ocupacao':8,'dias_ocupacao':350, 'paf_ref': 0.4, 'sch': 8},
//outras
{'nome':'Outras','dpi_ref':15,'dpe_ref':40,'densidade_ocupacao':0.2,'horas_ocupacao':12,'dias_ocupacao':300, 'paf_ref': 0.6, 'sch': 12}]


var condicoes_pav = [{'nome': 'Subsolo', 'is_1pvto_0': 1, 'is_1pvto_1': 0, 'floor_exp_0': 1, 'floor_exp_1':0, 'roof_exp_0':1, 'roof_exp_1':0},
{'nome': 'Térreo (com + pvtos acima)', 'is_1pvto_0': 0, 'is_1pvto_1': 1, 'floor_exp_0': 1, 'floor_exp_1':0, 'roof_exp_0':1, 'roof_exp_1':0},
{'nome': 'Térreo (único pvto)', 'is_1pvto_0': 0, 'is_1pvto_1': 1, 'floor_exp_0': 1, 'floor_exp_1':0, 'roof_exp_0':0, 'roof_exp_1':1},
{'nome': 'Pilotis (único pvto)', 'is_1pvto_0': 0, 'is_1pvto_1': 1, 'floor_exp_0': 0, 'floor_exp_1':1, 'roof_exp_0':1, 'roof_exp_1':0},
{'nome': 'Pilotis (com + pvtos acima)', 'is_1pvto_0': 0, 'is_1pvto_1': 1, 'floor_exp_0': 0, 'floor_exp_1':1, 'roof_exp_0':0, 'roof_exp_1':1},
{'nome': 'Intermediário', 'is_1pvto_0': 1, 'is_1pvto_1': 0, 'floor_exp_0': 1, 'floor_exp_1':0, 'roof_exp_0':1, 'roof_exp_1':0},
{'nome': 'Cobertura', 'is_1pvto_0': 1, 'is_1pvto_1': 0, 'floor_exp_0': 1, 'floor_exp_1':0, 'roof_exp_0':0, 'roof_exp_1':1},]

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
    var cond_pav = document.getElementById('lista_pavimentos'+(rowCount));
    cond_pav.innerHTML = "";
    condicoes_pav.forEach(pav => {
        var optionInc = document.createElement('OPTION');
        optionInc.innerHTML = pav.nome;
        cond_pav.appendChild(optionInc)
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
                entradas = ['lista_pavimentos','nome_zona','area_zona', 'pd_zona', 'tipo_zona','orientacoes','zona_adjacente', 'lista_usos','lista_paredes_ext','lista_paredes_int', 'lista_coberturas','lista_pisos', 'lista_vidros', 'paf_zona', 'fachada', 'avs_zona', 'ahs_zona', 'aov_zona','paz_zona', 'lista_vidros_az','dpi_zona']
                entradas_interna = ['lista_pavimentos','nome_zona','area_zona', 'pd_zona','tipo_zona', 'lista_usos', 'lista_coberturas', 'fachada',  'dpi_zona', 'paz_zona']

                //verificação de células em branco:
                var com_erro = 0
                var zona_tipo = document.getElementById('tipo_zona'+i).value
                var valor_paf = document.getElementById('paf_zona'+i).value
                var valor_paz = document.getElementById('paz_zona'+i).value
                var tipo_de_pav = document.getElementById('lista_pavimentos'+i).value

                
                if (zona_tipo == 'Interna'){
                    for (entrada of entradas_interna){
                        if(document.getElementById(entrada+i).value == ''){
                            if(['Térreo (com + pvtos acima)', 'Intermediário', 'Pilotis (com + pvtos acima)'].includes(tipo_de_pav) && entrada == 'lista_coberturas'){} //cobertura não exposta não é preenchida
                            else if(['Térreo (com + pvtos acima)', 'Intermediário', 'Pilotis (com + pvtos acima)'].includes(tipo_de_pav) && entrada == 'lista_vidros_az'){}
                            else if (valor_paz == 0 && entrada == 'lista_vidros_az'){} //PAF 0 não precisa preencher vidro
                            else{
                                com_erro = 1
                            }
                        }
                    }
                }

                else{
                    for (entrada of entradas){
                        if(document.getElementById(entrada+i).value == ''){
                            if(['Térreo (com + pvtos acima)', 'Intermediário', 'Pilotis (com + pvtos acima)'].includes(tipo_de_pav) && entrada == 'lista_coberturas'){} //cobertura não exposta não é preenchida
                            else if (valor_paf == 0 && entrada == 'lista_vidros'){} //PAF 0 não precisa preencher vidro
                            else if (valor_paz == 0 && entrada == 'lista_vidros_az'){} //PAF 0 não precisa preencher vidro
                            else{
                                com_erro = 1
                            }
                        }
                    }
                }

                for (entrada of entradas) {
                    conteudo = document.getElementById(entrada+i).value;
                    array.push(conteudo)
                }

                if (com_erro == 1){
                    linhas_com_erro.push(String(i))
                }



                //tratamento dos dados que vem do array inicial
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
                else if (posicao_azimute == 'NO'){var AZI = 315}
                else {var AZI = -360}
                if(array [entradas.indexOf('tipo_zona')] == 'Interna'){var AZI = -360}
        
        
                lista_angulos = [-360,0,45,90,135,180,225,270,315]
                for (angulo of lista_angulos){
                    if (AZI == angulo){
                        var idx = lista_angulos.indexOf(angulo)                      
                    }
                }
                //360 é declarado como -360, mas variables no js não aceita o -
                lista_azimutes = [0,0,0,0,0,0,0,0,0]
                lista_azimutes[idx] = 1
        
                var [app_ori_360, app_ori_0, app_ori_45, app_ori_90, app_ori_135 , app_ori_180 , app_ori_225, app_ori_270,  app_ori_315] = lista_azimutes


                //condição de exposição da cobertura
                var info_pav = condicoes_pav.filter(pav => pav.nome == array[entradas.indexOf('lista_pavimentos')])[0]
                var is_1pvto_0 = info_pav.is_1pvto_0
                var is_1pvto_1 = info_pav.is_1pvto_1
                var floor_exp_0 = info_pav.floor_exp_0
                var floor_exp_1 = info_pav.floor_exp_1
                var roof_exp_0 = info_pav.roof_exp_0
                var roof_exp_1 = info_pav.roof_exp_1

                //condicionais se a zona for interna 
                if (array[entradas.indexOf('tipo_zona')] == 'Interna'){ //is_perimetral_0
                    var is_perimentral_0 = 1
                    var is_perimetral_1 = 0
                    var xlen = Math.sqrt(array[entradas.indexOf('area_zona')]);
                    var FS = 0
                    var uvid = 0
                    var WWR = 0
                    var AHS = 90
                    var AOV = 90
                    var AVS = 90
                    var AHS_ref = 90
                    var AVS_ref = 90
                    var AOV_ref = 90
                    var FS_ref = 0
                    var uvid_ref = 0
                    var WWR_ref = 0
                    var apar_ext = 0
                    var upar_ext = -6
                    var ct_par_ext = -400
                    var apar_ext_ref = 0
                    var upar_ext_ref = -6
                    var ct_par_ext_ref = -400
                }
                
                else {//caso não seja zona interna (quando é perimetral)

                    var is_perimentral_0 = 0
                    var is_perimetral_1 = 1

                    var xlen = (((2/4.5)*array[entradas.indexOf('area_zona')])+9)/2
                    //PAF
                    var WWR = parseFloat(array[entradas.indexOf('paf_zona')])

                    //dados dos vidros
                    dados_vidro = vidros.filter(vidro => vidro.nome ==  array[entradas.indexOf('lista_vidros')])[0];
                    if (WWR == 0){
                        var uvid = 0
                        var FS = 0
                        var uvid_ref = 0
                        var FS_ref = 0
                    }
                    else{
                        var uvid = dados_vidro.u_vid;
                        var FS = dados_vidro.fs_vid;
                        var uvid_ref = 5.7
                        var FS_ref = 0.82
                    }

                    dados_vidro_az = vidros_az.filter(vidro => vidro.nome ==  array[entradas.indexOf('lista_vidros_az')])[0];
                    if (roof_exp_1 == 1){
                        var uvid_az = 0
                        var FS_az = 0
                        var uvid_az_ref = 0
                        var FS_az_ref = 0
                        var PAZ =  PAZ_ref = 0
                    }
                    else{
                        var PAZ =  PAZ_ref = parseFloat(array[entradas.indexOf('paz_zona')])
                        if (PAZ == 0){
                            var uvid_az = 0;
                            var FS_az = 0;
                            var uvid_az_ref = 0
                            var FS_az_ref = 0
                        }
                        else{
                            var uvid_az = dados_vidro_az.u_vid;
                            var FS_az = dados_vidro_az.fs_vid;
                            var uvid_az_ref = 5.7
                            var FS_az_ref = 0.82
                            //abertura zenital
                        }
                    }

                    // dados da parede 
                    dados_parede_ext = paredes_externas.filter(parede => parede.nome ==  array[entradas.indexOf('lista_paredes_ext')])[0]
                    var apar_ext = dados_parede_ext.ars_par;
                    var upar_ext = dados_parede_ext.u_par;
                    var ct_par_ext = dados_parede_ext.ct_par;

                    dados_parede_int = paredes_internas.filter(parede => parede.nome ==  array[entradas.indexOf('lista_paredes_int')])[0]
                    var upar_int = dados_parede_ext.u_par;
                    var ct_par_int = dados_parede_ext.ct_par;


                    //angulos da abertura
                    var AHS = parseFloat(array[entradas.indexOf('ahs_zona')])
                    var AVS = parseFloat(array[entradas.indexOf('avs_zona')])
                    var AOV = parseFloat(array[entradas.indexOf('aov_zona')])
                    
                    var AHS_ref = 0
                    var AVS_ref = 0
                    var AOV_ref = 0

                    //parede ref
                    var apar_ext_ref = 0.5
                    var upar_ext_ref = 2.39
                    var ct_par_ext_ref = 150

                    var upar_int_ref = 2.39
                    var ct_par_int_ref = 150
                }

                // dados relativos à tipologia -> posteriormente capturar dados de referência
                dados_uso = uso_zonas.filter(uso => uso.nome == array[entradas.indexOf('lista_usos')])[0];  //0 pois espera-se que encontre somente um, mas de toda forma retorna o primeiro que encontrar
                var hOcc = dados_uso.horas_ocupacao; // horas de ocupação
                var pessoas = dados_uso.densidade_ocupacao;
                var sch = dados_uso.sch;

                let lista_horarios = [10,12,16,24,8]
                var horarios_value = [0,0,0,0,0]
                idx_horario = lista_horarios.indexOf(sch)
                horarios_value[idx_horario] = 1
                var [schedule_SCH_10H,schedule_SCH_12H,schedule_SCH_16H,schedule_SCH_24H,schedule_SCH_8H] = horarios_value
                

                //piso
                dados_piso = pisos.filter(piso => piso.nome ==  array[entradas.indexOf('lista_pisos')])[0]
                var upiso = dados_piso.u_piso
                var ct_piso = dados_piso.ct_piso
                var upiso_ref = 3.33
                var ct_piso_ref = 220
                

                /*else{
                    var upiso = 0
                    var ct_piso = 0
                    var upiso_ref = 0
                    var ct_piso_ref = 0
                }*/            



                // dados da cobertura 
                var dados_cobertura = coberturas.filter(cob =>cob.nome == array[entradas.indexOf('lista_coberturas')])[0]
                var acob = dados_cobertura.ars_cob;
                var ucob = dados_cobertura.u_cob;
                var ct_cob = dados_cobertura.ct_cob;
                var acob_ref = 0.8;
                var ucob_ref = 2.06;
                var ct_cob_ref = 233;

                
                /*else{ //se não for exposto não precisa dos dados, toma como zero
                    var acob = 0;
                    var ucob = 0;
                    var ct_cob = 0;
                    var acob_ref = 0;
                    var ucob_ref = 0;
                    var ct_cob_ref = 0;
                }*/


                //condicional para o paf
                if (WWR == 0){
                    var WWR_ref = 0
                }
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
                var DPI_ref = dados_uso.dpi_ref
                
                if (document.getElementById('dpe_detalhado').value == 'Sim'){
                    var DPE = document.getElementById('dpe_levantada')
                }
                else{
                    var DPE = dados_uso.dpe_ref
                }
                



                //zona adjascente
                var apt_near_0 = 0
                var apt_near_1 = 0
                if (array[entradas.indexOf('zona_adjacente')] == 'Zona adjacente condicionada'){
                    var apt_near_0 = 1
                }
                else{
                    var apt_near_1 =1
                }
                
                // as informações de clima já foram descritas na função cidades.js
                // a ordem é: ceiling_height	building_xlen	wwr	vert_shading	floor_u	floor_ct	roof_u	roof_ct	roof_absorptance	extwall_u	extwall_ct	extwall_absorptance	intwall_u	intwall_ct	shgc_jan	u_jan	shgc_zen	u_zen	people	lights	equip	paz	lat	alt	dbt_mean	dbt_25p	dbt_75p	ws_mean	ws_25p	ws_75p	ghr_mean	ghr_25p	ghr_75p	dpt_mean	dpt_25p	dpt_75p	sur_angle	shd_angle	schedule_SCH_10H	schedule_SCH_12H	schedule_SCH_16H	schedule_SCH_24H	schedule_SCH_8H	is_1pvto_0	is_1pvto_1	floor_exp_0	floor_exp_1	roof_exp_0	roof_exp_1	apt_near_0	apt_near_1	is_perimetral_0	is_perimetral_1	app_ori_-360	app_ori_0	app_ori_45	app_ori_90	app_ori_135	app_ori_180	app_ori_225	app_ori_270	app_ori_315

                array_zona = [parseFloat(PD), parseFloat(xlen), WWR/100, AVS, upiso, ct_piso, ucob, ct_cob, acob, upar_ext, ct_par_ext, apar_ext, upar_int, ct_par_int, FS, uvid, FS_az, uvid_az, pessoas, DPI, DPE, PAZ, lat, alt, dbt_mean, dbt_25p, dbt_75p, ws_mean, ws_25p, ws_75p, ghr_mean, ghr_25p, ghr_75p, dpt_mean, dpt_25p, dpt_75p, AOV, AHS, schedule_SCH_10H,schedule_SCH_12H,schedule_SCH_16H,schedule_SCH_24H,schedule_SCH_8H, is_1pvto_0,is_1pvto_1,	floor_exp_0, floor_exp_1, roof_exp_0, roof_exp_1,apt_near_0, apt_near_1,is_perimentral_0, is_perimetral_1, app_ori_360, app_ori_0, app_ori_45, app_ori_90, app_ori_135 , app_ori_180 , app_ori_225, app_ori_270,  app_ori_315 ]
              
                //array_zona_ref = [parseInt(AZI), DPE, DPI_ref , FS_ref, INF, pessoas, uvid_ref, acob_ref, apar_ref, PD, WWR_ref, 0, 0, AOV, hOcc, FGroud, FOutdoors, RoofOutdoors, ucob_ref, upar_ref, ct_cob_ref, ct_par_ref, 0, Zint, parseFloat(LAT), parseFloat(Altitude), parseFloat(VVENTO), parseFloat(RAD), parseFloat(TMA), parseFloat(DPT), parseFloat(AMA), parseFloat(DPA)]

                
                array_zona_ref = [parseFloat(PD), parseFloat(xlen), WWR_ref/100, AVS_ref, upiso_ref, ct_piso_ref, ucob_ref, ct_cob_ref, acob_ref, upar_ext_ref, ct_par_ext_ref, apar_ext_ref, upar_int_ref, ct_par_int_ref, FS_ref, uvid_ref, FS_az_ref, uvid_az_ref, pessoas, DPI_ref, DPE, PAZ_ref, lat, alt, dbt_mean, dbt_25p, dbt_75p, ws_mean, ws_25p, ws_75p, ghr_mean, ghr_25p, ghr_75p, dpt_mean, dpt_25p, dpt_75p, AOV_ref, AHS_ref, schedule_SCH_10H,schedule_SCH_12H,schedule_SCH_16H,schedule_SCH_24H,schedule_SCH_8H, is_1pvto_0,is_1pvto_1, floor_exp_0, floor_exp_1, roof_exp_0, roof_exp_1,apt_near_0, apt_near_1,is_perimentral_0, is_perimetral_1, app_ori_360, app_ori_0, app_ori_45, app_ori_90, app_ori_135 , app_ori_180 , app_ori_225, app_ori_270,  app_ori_315 ]
                
                console.log('normal', array_zona, 'ref', array_zona_ref)
                
               
                //uma vez obtido o array, ele deve ser normalizado e depois inserido no metamodelo 
                // para normalizar toma-se os valores máximos e mínimos do modelo
                min = {
                        "ceiling_height":2.3,
                        "building_xlen":1.0,
                        "wwr":0.0,
                        "vert_shading":0.0,
                        "floor_u":1.75,
                        "floor_ct":130.0,
                        "roof_u":0.3,
                        "roof_ct":0.15,
                        "roof_absorptance":0.0,
                        "extwall_u":-6.0,
                        "extwall_ct":-400.0,
                        "extwall_absorptance":0.0,
                        "intwall_u":0.31,
                        "intwall_ct":25.0,
                        "shgc_jan":0.0,
                        "u_jan":0.0,
                        "shgc_zen":0.0,
                        "u_zen":0.0,
                        "people":0.03,
                        "lights":3.0,
                        "equip":3.0,
                        "paz":0.0,
                        "lat":-33.74,
                        "alt":0.0,
                        "dbt_mean":10.84,
                        "dbt_25p":8.72,
                        "dbt_75p":12.84,
                        "ws_mean":0.0,
                        "ws_25p":0.0,
                        "ws_75p":0.0,
                        "ghr_mean":3635.9,
                        "ghr_25p":2371.9,
                        "ghr_75p":4668.31,
                        "dpt_mean":1.71,
                        "dpt_25p":-3.52,
                        "dpt_75p":6.05,
                        "sur_angle":0.0,
                        "shd_angle":0.0,
                        "schedule_SCH_10H":0.0,
                        "schedule_SCH_12H":0.0,
                        "schedule_SCH_16H":0.0,
                        "schedule_SCH_24H":0.0,
                        "schedule_SCH_8H":0.0,
                        "is_1pvto_0":0.0,
                        "is_1pvto_1":0.0,
                        "floor_exp_0":0.0,
                        "floor_exp_1":0.0,
                        "roof_exp_0":0.0,
                        "roof_exp_1":0.0,
                        "apt_near_0":0.0,
                        "apt_near_1":0.0,
                        "is_perimetral_0":0.0,
                        "is_perimetral_1":0.0,
                        "app_ori_360":0.0,
                        "app_ori_0":0.0,
                        "app_ori_45":0.0,
                        "app_ori_90":0.0,
                        "app_ori_135":0.0,
                        "app_ori_180":0.0,
                        "app_ori_225":0.0,
                        "app_ori_270":0.0,
                        "app_ori_315":0.0,
                }
                
                max = {
                    "ceiling_height":10.0,
                    "building_xlen":40.0,
                    "wwr":0.99,
                    "vert_shading":90.0,
                    "floor_u":3.75,
                    "floor_ct":400.0,
                    "roof_u":4.74,
                    "roof_ct":450.0,
                    "roof_absorptance":0.98,
                    "extwall_u":5.0,
                    "extwall_ct":450.0,
                    "extwall_absorptance":0.98,
                    "intwall_u":5.0,
                    "intwall_ct":400.0,
                    "shgc_jan":0.9,
                    "u_jan":6.0,
                    "shgc_zen":0.9,
                    "u_zen":6.0,
                    "people":1.0,
                    "lights":40.0,
                    "equip":60.0,
                    "paz":5.0,
                    "lat":3.81,
                    "alt":1811.5,
                    "dbt_mean":29.07,
                    "dbt_25p":26.97,
                    "dbt_75p":32.53,
                    "ws_mean":7.37,
                    "ws_25p":5.39,
                    "ws_75p":9.71,
                    "ghr_mean":6160.66,
                    "ghr_25p":5724.65,
                    "ghr_75p":7179.08,
                    "dpt_mean":24.7,
                    "dpt_25p":24.18,
                    "dpt_75p":25.33,
                    "sur_angle":84.28,
                    "shd_angle":89.46,
                    "schedule_SCH_10H":1.0,
                    "schedule_SCH_12H":1.0,
                    "schedule_SCH_16H":1.0,
                    "schedule_SCH_24H":1.0,
                    "schedule_SCH_8H":1.0,
                    "is_1pvto_0":1.0,
                    "is_1pvto_1":1.0,
                    "floor_exp_0":1.0,
                    "floor_exp_1":1.0,
                    "roof_exp_0":1.0,
                    "roof_exp_1":1.0,
                    "apt_near_0":1.0,
                    "apt_near_1":1.0,
                    "is_perimetral_0":1.0,
                    "is_perimetral_1":1.0,
                    "app_ori_360":1.0,
                    "app_ori_0":1.0,
                    "app_ori_45":1.0,
                    "app_ori_90":1.0,
                    "app_ori_135":1.0,
                    "app_ori_180":1.0,
                    "app_ori_225":1.0,
                    "app_ori_270":1.0,
                    "app_ori_315":1.0,
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

                //console.log(arr_normalizado, arr_normalizado_ref)

                try {
                //const secao = await ort.InferenceSession.create('./PHFFT_Calor.onnx');
                const secao =  await ort.InferenceSession.create('/v4_ann_cool_0.99693_25.34_5.58.onnx');
                
                secao['handler']['inputNames'][0] = 'entradas'
                secao['handler']['outputNames'][0] = 'saidas'

                const dado = Float32Array.from(arr_normalizado);
                const tensor = new ort.Tensor('float32', dado, [1, 62]);
                const entradas_dict = { 'entradas': tensor };
                const saidas =  await secao.run(entradas_dict);
                const resultados = Math.round(saidas['saidas'].data*array[entradas.indexOf('area_zona')]);
                array_resultados.push(resultados)
                
                const dado_ref = Float32Array.from(arr_normalizado_ref);
                const tensor_ref = new ort.Tensor('float32', dado_ref, [1, 62]);
                const entradas_dict_ref = { 'entradas': tensor_ref };
                const saidas_ref =  await secao.run(entradas_dict_ref);
                const resultados_ref = Math.round(saidas_ref['saidas'].data*array[entradas.indexOf('area_zona')]);
                array_resultados_ref.push(resultados_ref)


                } 
                catch (e) {
                console.log(`Erro: ${e}.`);
                }
            

                let phoct_multiplicacao = (document.getElementById('phoct').value)/100
                //calculadas as cargas, verificar se 
                if(document.getElementById('tipo_condicionamento').value == 'AC'){
                    document.getElementById('cgtt_zona'+i).value = array_resultados[i]
                    document.getElementById('cgtt_ref'+i).value = array_resultados_ref[i]
                }
                else if(document.getElementById('tipo_condicionamento').value == 'HB'){
                    document.getElementById('cgtt_zona'+i).value = array_resultados[i]*phoct_multiplicacao
                    document.getElementById('cgtt_ref'+i).value = array_resultados_ref[i]*phoct_multiplicacao
                }
                
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
                if(document.getElementById('tipo_condicionamento').value == 'AC'){
                    document.getElementById('capacidade_ac_cond').value = Number(total_capacidade).toFixed(2)
                    document.getElementById('consumo_ac_real_cond').value = Number(consumo_resfriamento_real).toFixed(2) //arredondamento em 2 casas após a vírgula
                    document.getElementById('consumo_ac_ref_cond').value = Number(consumo_resfriamento_ref).toFixed(2)
                }

                else if(document.getElementById('tipo_condicionamento').value == 'HB'){
                    document.getElementById('capacidade_ac_cond').value = Number(total_capacidade).toFixed(2)
                    document.getElementById('consumo_ac_real_cond').value = Number(consumo_resfriamento_real*phoct_multiplicacao).toFixed(2) //arredondamento em 2 casas após a vírgula
                    document.getElementById('consumo_ac_ref_cond').value = Number(consumo_resfriamento_ref*phoct_multiplicacao).toFixed(2)
                }

                window.alert('Cargas térmicas e consumos calculados com sucesso! \nPara conferir os consumos calculados consulte a aba Ar-condicionado')
            }
        }
    }
}	


