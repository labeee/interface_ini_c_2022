
// fazer uma edição dos componentes, com vuejs ou com map

// lista de vidros padrão e suas características
var vidros = [{'nome': 'Vidro simples incolor', 'u_vid': 5.7, 'fs_vid': 0.87},
	{'nome': 'Vidro laminado com incolor 8mm', 'u_vid': 5.97, 'fs_vid': 0.27},
	{'nome': 'COOL-LITE KBT 140 6mm', 'u_vid': 3.51, 'fs_vid': 0.359},
	]

// lista de paredes padrão e suas características
var paredes = [{'nome': 'Parede referência', 'u_par': 4.4, 'ct_par': 220, 'ars_par': 0.58},
{'nome': 'Bloco cerâmico + reboco 2.5cm - branco', 'u_par': 2.37, 'ct_par': 151, 'ars_par': 0.3},
{'nome': 'Parede leve isolada', 'u_par': 0.9, 'ct_par': 29, 'ars_par': 0.3}
]

// lista de coberturas padrão e suas características
var coberturas = [{'nome': 'Cobertura referência', 'u_cob': 2.05, 'ct_cob': 220, 'ars_cob': 0.7},
{'nome': 'Cobertura cerâmica + forro gesso', 'u_cob': 1.94, 'ct_cob': 37, 'ars_cob': 0.7},
{'nome': 'Laje pré-moldada 12 cm', 'u_cob': 1.8, 'ct_cob': 132, 'ars_cob': 0.6},
]

// lista de pavimentos padrão
var pavimentos = [{'nome': 'Térreo'},
]

// lista de coberturas aberturas padrão e suas características
var aberturas = [{'nome': 'Teste abertura', 'uvid':5.67, 'fs_vid':0.87, 'PAF': 25, 'avs': 25, 'ahs': 70, 'aov': 60},]

var sistemas_ac = [{'nome': 'Split 12000', 'tipo':'baixa_capacidade', 'capacidade':3515, 'tipo_cee':'IDRS', 'valor_cee': 5.5, 'potencia_renovacao': 200},]

function add_vidro(){
    var nome_vidro = document.getElementById('nome_vidro').value
    var u_vidro = document.getElementById('u_vidro').value
    var fs_vidro = document.getElementById('valor_fs').value
    var dict = {nome: nome_vidro, u_vid: u_vidro, fs_vid: fs_vidro}
    vidros.push(dict)



	//função para atualizar os vidros nas listas:
	var rowCount = $('#myTable tr').length;
	var rowCount = rowCount - 1
	for (var i = 0; i < rowCount; i++) {
	var selvidros = document.getElementById("lista_vidros"+(i));
	vidro_a_adicionar = vidros[vidros.length - 1];
	var optionInc9 = document.createElement("OPTION");
	optionInc9.innerHTML = vidro_a_adicionar.nome;
	selvidros.appendChild(optionInc9);
	}
}



function add_parede(){
    var nome_parede = document.getElementById('nome_parede').value
	var u_parede = document.getElementById('u_parede').value
	var ct_parede = document.getElementById('ct_parede').value
	var ars_parede = document.getElementById('ars_parede').value
	var dict = {nome: nome_parede, u_par: u_parede, ct_par: ct_parede, ars_par: ars_parede}
	paredes.push(dict)

	//função para atualizar as paredes nas listas:
	var rowCount = $('#myTable tr').length;
	var rowCount = rowCount - 1
	for (var i = 0; i < rowCount; i++) {
	var selparedes = document.getElementById("lista_paredes"+(i));
	parede_a_adicionar = paredes[paredes.length - 1];
	var optionInc = document.createElement("OPTION");
	optionInc.innerHTML = parede_a_adicionar.nome;
	selparedes.appendChild(optionInc);
	}
}

function add_cob(){
    var nome_cob = document.getElementById('nome_cob').value
	var u_cobertura = document.getElementById('u_cob').value
	var ct_cobertura = document.getElementById('ct_cob').value
	var ars_cobertura = document.getElementById('ars_cob').value
	var dict = {nome: nome_cob, u_cob: u_cobertura, ct_cob: ct_cobertura, ars_cob: ars_cobertura}
	coberturas.push(dict)
	
	//função para atualizar as coberturas nas listas
	var rowCount = $('#myTable tr').length;
	var rowCount = rowCount - 1
	for (var i = 0; i < rowCount; i++) {
	var selcobs = document.getElementById("lista_coberturas"+(i));
	cob_a_adicionar = coberturas[coberturas.length - 1];
	var optionInc = document.createElement("OPTION");
	optionInc.innerHTML = cob_a_adicionar.nome;
	selcobs.appendChild(optionInc);
	}
}

function add_ac(){
    var nome_ac = document.getElementById('nome_sistema_ac').value
	var tipo_ac = document.getElementById('tipo_sistema').value
    var capacidade_ac = document.getElementById('capacidade_ac').value
    var tipo_coeficiente= document.getElementById('tipo_cee').value
	var pot_renovacao = document.getElementById('renovacao_ac').value
    var dict = {nome: nome_ac, tipo:tipo_ac, capacidade: capacidade_ac, tipo_cee: tipo_coeficiente, potencia_renovacao:pot_renovacao}
    sistemas_ac.push(dict)

	//função para atualizar os sistemas de AC nas listas:
	var rowCount = $('#myTable tr').length;
	var rowCount = rowCount - 1
	for (var i = 0; i < rowCount; i++) {
	var sel_ac = document.getElementById("ac_zona"+(i));
	ac_a_adicionar = sistemas_ac[sistema_ac.length - 1];
	var optionInc50 = document.createElement("OPTION");
	optionInc50.innerHTML = ac_a_adicionar.nome;
	sel_ac.appendChild(optionInc50);
	}
}

/*
function add_pav(){
    var nome_pavimento = document.getElementById('nome_pav').value
	var dict = {nome: nome_pavimento, }
	pavimentos.push(dict)

	//função para atualizar os pavimentos nas listas:
	var rowCount = $('#myTable tr').length;
	var rowCount = rowCount - 1
	for (var i = 0; i < rowCount; i++) {
	var selpavs = document.getElementById("lista_pavimentos"+(i));
	pav_a_adicionar = pavimentos[pavimentos.length - 1];
	var optionInc = document.createElement("OPTION");
	optionInc.innerHTML = pav_a_adicionar.nome;
	selpavs.appendChild(optionInc);
	}
}


function add_ab(){
    var nome_abertura = document.getElementById('nome_ab').value
	var uvid_abertura = document.getElementById('uvid_ab').value
	var fs_abertura = document.getElementById('fs_ab').value
	var paf_abertura = document.getElementById('paf_ab').value
	var avs_abertura = document.getElementById('avs_ab').value
	var ahs_abertura = document.getElementById('ahs_ab').value
	var aov_abertura = document.getElementById('aov_ab').value
	var dict = {nome: nome_abertura, uvid: uvid_abertura, fs_vid: fs_abertura, PAF: paf_abertura, avs: avs_abertura, ahs: ahs_abertura, aov: aov_abertura,}
	aberturas.push(dict)
	
	//função para atualizar as aberturas nas listas:
	var rowCount = $('#myTable tr').length;
	var rowCount = rowCount - 1
	for (var i = 0; i < rowCount; i++) {
	var selabs = document.getElementById("lista_aberturas"+(i));
	ab_a_adicionar = aberturas[aberturas.length - 1];
	var optionInc = document.createElement("OPTION");
	optionInc.innerHTML = ab_a_adicionar.nome;
	selabs.appendChild(optionInc);
	}
}*/

