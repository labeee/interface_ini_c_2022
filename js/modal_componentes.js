
// fazer uma edição dos componentes, com vuejs ou com map

// lista de vidros padrão e suas características
var vidros = [{'nome': 'Vidro exemplo', 'u_vid': 5.7, 'fs_vid': 0.87},]
var vidros_az = [{'nome': 'Vidro zenital exemplo', 'u_vid': 5.7, 'fs_vid': 0.87},]
// lista de paredes padrão e suas características
var paredes_externas = [{'nome': 'Parede externa exemplo', 'u_par': 4.4, 'ct_par': 220, 'ars_par': 0.58}]
var paredes_internas = [{'nome': 'Parede interna exemplo', 'u_par': 4.4, 'ct_par': 220}]

// lista de coberturas padrão e suas características
var coberturas = [{'nome': 'Cobertura exemplo', 'u_cob': 2.05, 'ct_cob': 220, 'ars_cob': 0.7}]

var pisos = [{'nome': 'Piso exemplo', 'u_piso': 2.05, 'ct_piso': 220}]

var sistemas_ac = [{'nome': 'Split exemplo', 'tipo':'baixa_capacidade', 'capacidade':15, 'tipo_cee':'IDRS', 'valor_cee': 5.5, 'potencia_renovacao': 200},]

function add_vidro(){
	var erro_vidro = 0
    var nome_vidro = document.getElementById('nome_vidro').value
	vidros.forEach(vidro =>{ //verificação se já existe componente com o mesmo nome
		if(vidro.nome == nome_vidro){
			window.alert('O componente "'+ vidro.nome+'" já existe na base de dados. Caso queira criar um componente diferente, utilize um novo nome!')
			erro_vidro = 1
		} 
	});
	if (erro_vidro == 1){} // não faz nada
	else{
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
		var optionInc = document.createElement("OPTION");
		optionInc.innerHTML = vidro_a_adicionar.nome;
		selvidros.appendChild(optionInc);
		}
	}
	
}

function add_vidro_az(){
	var erro_vidro = 0
    var nome_vidro = document.getElementById('nome_vidro_az').value
	vidros_az.forEach(vidro =>{ //verificação se já existe componente com o mesmo nome
		if(vidro.nome == nome_vidro){
			window.alert('O componente "'+ vidro.nome+'" já existe na base de dados. Caso queira criar um componente diferente, utilize um novo nome!')
			erro_vidro = 1
		} 
	});
	if (erro_vidro == 1){} // não faz nada
	else{
		var u_vidro = document.getElementById('u_vidro_az').value
		var fs_vidro = document.getElementById('valor_fs_az').value
		var dict = {nome: nome_vidro, u_vid: u_vidro, fs_vid: fs_vidro}
		vidros_az.push(dict)

		//função para atualizar os vidros nas listas:
		var rowCount = $('#myTable tr').length;
		var rowCount = rowCount - 1
		for (var i = 0; i < rowCount; i++) {
		var selvidros = document.getElementById("lista_vidros_az"+(i));
		vidro_a_adicionar = vidros[vidros.length - 1];
		var optionInc = document.createElement("OPTION");
		optionInc.innerHTML = vidro_a_adicionar.nome;
		selvidros.appendChild(optionInc);
		}
	}
	
}


function add_parede_externa(){
	var erro_parede = 0
    var nome_parede = document.getElementById('nome_parede_ext').value
	paredes_externas.forEach(parede =>{ //verificação se já existe componente com o mesmo nome
		if(parede.nome == nome_parede){
			window.alert('O componente "' +parede.nome+'" já existe na base de dados. Caso queira criar um componente diferente, utilize um novo nome!')
			erro_parede = 1
		} 
	});
	if (erro_parede == 1){} // não faz nada
	else{
		var u_parede = document.getElementById('u_parede_ext').value
		var ct_parede = document.getElementById('ct_parede_ext').value
		var ars_parede = document.getElementById('ars_parede_ext').value
		var dict = {nome: nome_parede, u_par: u_parede, ct_par: ct_parede, ars_par: ars_parede}
		paredes_externas.push(dict)

		//função para atualizar as paredes nas listas:
		var rowCount = $('#myTable tr').length;
		var rowCount = rowCount - 1
		for (var i = 0; i < rowCount; i++) {
		var selparedes = document.getElementById("lista_paredes_ext"+(i));
		parede_a_adicionar = paredes_externas[paredes.length - 1];
		var optionInc = document.createElement("OPTION");
		optionInc.innerHTML = parede_a_adicionar.nome;
		selparedes.appendChild(optionInc);
		}
	}
}


function add_parede_interna(){
	var erro_parede = 0
    var nome_parede = document.getElementById('nome_parede_int').value
	paredes_internas.forEach(parede =>{ //verificação se já existe componente com o mesmo nome
		if(parede.nome == nome_parede){
			window.alert('O componente "' +parede.nome+'" já existe na base de dados. Caso queira criar um componente diferente, utilize um novo nome!')
			erro_parede = 1
		} 
	});
	if (erro_parede == 1){} // não faz nada
	else{
		var u_parede = document.getElementById('u_parede_int').value
		var ct_parede = document.getElementById('ct_parede_int').value
		var dict = {nome: nome_parede, u_par: u_parede, ct_par: ct_parede, }
		paredes_internas.push(dict)

		//função para atualizar as paredes nas listas:
		var rowCount = $('#myTable tr').length;
		var rowCount = rowCount - 1
		for (var i = 0; i < rowCount; i++) {
		var selparedes = document.getElementById("lista_paredes_int"+(i));
		parede_a_adicionar = paredes_internas[paredes.length - 1];
		var optionInc = document.createElement("OPTION");
		optionInc.innerHTML = parede_a_adicionar.nome;
		selparedes.appendChild(optionInc);
		}
	}
}

function add_cob(){
	var erro_cob = 0
    var nome_cob = document.getElementById('nome_cob').value
	coberturas.forEach(cobertura =>{ //verificação se já existe componente com o mesmo nome
		if(cobertura.nome == nome_cob){
			window.alert('O componente "' +cobertura.nome+'" já existe na base de dados. Caso queira criar um componente diferente, utilize um novo nome!')
			erro_cob = 1
		} 
	});
	if (erro_cob == 1){} // não faz nada
	else{
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
}


function add_piso(){
	var erro_piso = 0
    var nome_piso = document.getElementById('nome_piso').value
	pisos.forEach(piso =>{ //verificação se já existe componente com o mesmo nome
		if(piso.nome == nome_piso){
			window.alert('O componente "' +piso.nome+'" já existe na base de dados. Caso queira criar um componente diferente, utilize um novo nome!')
			erro_piso = 1
		} 
	});
	if (erro_piso == 1){} // não faz nada
	else{
		var u_piso = document.getElementById('u_piso').value
		var ct_piso = document.getElementById('ct_piso').value
		var dict = {nome: nome_piso, u_piso: u_piso, ct_piso: ct_piso}
		pisos.push(dict)
		
		//função para atualizar as pisos nas listas
		var rowCount = $('#myTable tr').length;
		var rowCount = rowCount - 1
		for (var i = 0; i < rowCount; i++) {
		var selpisos = document.getElementById("lista_pisos"+(i));
		piso_a_adicionar = pisos[pisos.length - 1];
		var optionInc = document.createElement("OPTION");
		optionInc.innerHTML = piso_a_adicionar.nome;
		selpisos.appendChild(optionInc);
		}
	}
}

function add_ac(){
	var erro_ac = 0
    var nome_ac = document.getElementById('nome_sistema_ac').value
	sistemas_ac.forEach(sistema =>{ //verificação se já existe componente com o mesmo nome
		if(sistema.nome == nome_ac){
			window.alert('O componente "' +sistema.nome+'" já existe na base de dados. Caso queira criar um componente diferente, utilize um novo nome!')
			erro_ac = 1
		} 
	});
	if (erro_ac == 1){} // não faz nada
	else{
		var tipo_ac = document.getElementById('tipo_sistema').value
		var capacidade_ac = document.getElementById('capacidade_ac').value
		var tipo_coeficiente= document.getElementById('tipo_cee').value
		var valor_coeficiente = document.getElementById('valor_cee').value
		var pot_renovacao = document.getElementById('renovacao_ac').value
		var dict = {nome: nome_ac, tipo:tipo_ac, capacidade: capacidade_ac, tipo_cee: tipo_coeficiente, valor_cee:valor_coeficiente, potencia_renovacao:pot_renovacao}
		sistemas_ac.push(dict)

		//função para atualizar os sistemas de AC nas listas:
		var rowCount = $('#myTable tr').length;
		var rowCount = rowCount - 1
		for (var i = 0; i < rowCount; i++) {
		var sel_ac = document.getElementById("ac_zona"+(i));
		ac_a_adicionar = sistemas_ac[sistemas_ac.length - 1];
		var optionInc510 = document.createElement("OPTION");
		optionInc510.innerHTML = ac_a_adicionar.nome;
		sel_ac.appendChild(optionInc510);
		}
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

