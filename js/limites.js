
//para os valores da tabela da envoltoria
const inputEnabler = (e) => {
    let val = parseFloat(e.target.value);
    let min = parseFloat(e.target.min);
    let max = parseFloat(e.target.max);
    if (!(val >= min && val <= max) && e.target.value != "") {
      alert(`VALOR FORA DA FAIXA PERMITIDA\nValor mínimo permitido: ${min}. Valor máximo permitido: ${max}.`);
      if (val < min) {
        e.target.value = ''; //estava como mínimo, pediu-se para colocar em branco
      }
      if (val > max) {
        e.target.value = ''; //estava como máximo, pediu-se para colocar em branco
      }

    }

}

function adicionar_limites(){
    console.log('limites adicionados')
    entradas_com_limites = ['area_zona', 'pd_zona', 'paf_zona', 'avs_zona', 'ahs_zona', 'aov_zona', 'dpi_zona', 'paz_zona']

    var rowCount = ($('#myTable tr').length)-1; //-1 pois desconsidera a primeira linha, que é cabeçalho
    for (var linha = 0; linha < rowCount; linha++) {

        //limites dos inputs
        for (let i = 0; i < entradas_com_limites.length; i++) {
            document.getElementById(entradas_com_limites[i]+linha).addEventListener('focusout', (e) => {
            inputEnabler(e);
            });
        }


        //ATENÇÃO, ESSA MESMA FUNÇÃO DEVE SER APLICADA EM IMPORTAR_PLANILHA.JS
        //celulas a travar em condições específicas 
        //zona interna:
        travar_array = ['orientacoes', 'lista_vidros', 'lista_paredes_ext', 'avs_zona', 'ahs_zona', 'aov_zona', 'paf_zona']
        document.getElementById('tipo_zona'+linha).onchange = function(){
          var numero = (this.id).slice(9,) //numero da linha
          if (this.value =='Interna') {
            //primeiro trava a condição da fachada
            document.getElementById('fachada'+numero).value = 'Não'
            document.getElementById('fachada'+numero).style.background = '#F5F5F5';
            document.getElementById('fachada'+numero).disabled = true;

            //depois retira os valores e trava as demais condições
            for (travar of travar_array){                                        
              document.getElementById(travar+numero).value = '';
              document.getElementById(travar+numero).style.background = '#F5F5F5';
              document.getElementById(travar+numero).disabled = true;
            } 
            //travar orientacao
            document.getElementById('orientacoes'+numero).value = 'Interna'
            document.getElementById('orientacoes'+numero).disabled = true;

          }
          if (this.value =='Perimetral') {
            document.getElementById('fachada'+numero).value = 'Sim'
            document.getElementById('fachada'+numero).style.background = '#fff';
            document.getElementById('fachada'+numero).disabled = false;
            for (travar of travar_array){                                                       
              document.getElementById(travar+numero).value = '';
              document.getElementById(travar+numero).style.background = '#FFFFFF';
              document.getElementById(travar+numero).disabled = false;
            }
            //destravar orientação
            document.getElementById('orientacoes'+numero).value = 'N'
            document.getElementById('orientacoes'+numero).disabled = false;
          }
        }


        //travar vidros para PAF 0
        document.getElementById('paf_zona'+linha).onchange = function(){
          var numero = (this.id).slice(8,) //numero da linha
          console.log('aqui')
          if (this.value == 0) {          
              document.getElementById('lista_vidros'+numero).value = '';
              document.getElementById('lista_vidros'+numero).style.background = '#F5F5F5';
              document.getElementById('lista_vidros'+numero).disabled = true;
          }
          else {                               
            document.getElementById('lista_vidros'+numero).style.background = '#FFFFFF';
            document.getElementById('lista_vidros'+numero).disabled = false;
          }
        }


        //travar vidros para PAz 0
        document.getElementById('paz_zona'+linha).onchange = function(){
          var numero = (this.id).slice(8,) //numero da linha
          if (this.value == 0) {                               
              document.getElementById('lista_vidros_az'+numero).value = '';
              document.getElementById('lista_vidros_az'+numero).style.background = '#F5F5F5';
              document.getElementById('lista_vidros_az'+numero).disabled = true;
          }
          else {                               
            document.getElementById('lista_vidros_az'+numero).style.background = '#FFFFFF';
            document.getElementById('lista_vidros_az'+numero).disabled = false;
          }
        }


        //travar fachada principal quando não for varejo
        document.getElementById('lista_usos'+linha).onchange = function(){
          var numero = (this.id).slice(10,) //numero da linha
          if ((this.value).includes('Varejo')) {
              document.getElementById('fachada'+numero).style.background = '#FFFFFF';
              document.getElementById('fachada'+numero).disabled = false;               
          }
          else {
            document.getElementById('fachada'+numero).value = 'Não';  
            document.getElementById('fachada'+numero).style.background = '#F5F5F5';
            document.getElementById('fachada'+numero).disabled = true;                             
          }
        }
      }
}

//para os demais valores da interface

$(document).ready(function(){
  ids_com_limite = ["fator_de_forma","area_construida","iluminacao_i", "geracao", "phoct"]
  for (nome of ids_com_limite){
    document.getElementById(nome).onchange = function(){
      /*if(nome == 'phoct'){
        console.log('sim')
        let v_phoct = parseFloat(this.value)  
        if (v_phoct > 90){
          document.getElementById('tipo_condicionamento').value = 'VN'
          document.getElementById('div_check_env').style.display = 'none';
          document.getElementById('div_simplificado').style.display = 'none';
          document.getElementById('div_condicionado').style.display = 'none';
          window.alert('Edificações com PHOCT acima de 90% são dispensadas do cálculo de cargas térmicas')
        }
      }*/
      let valor = parseFloat(this.value)
      let minimo = parseFloat(this.min)
      //se houver valor máximo
      if (this.max){
        var maximo = parseFloat(this.max)

        if (!(valor >= minimo && valor <= maximo) && valor != "") {
          alert(`VALOR FORA DA FAIXA PERMITIDA\nValor mínimo permitido: ${minimo}. Valor máximo permitido: ${maximo}.`);
          if (valor < minimo) {
            this.value = minimo;
          }
          if (valor > maximo) {
            this.value = maximo;
          }
    
        }

      }
      //se não houver valor máximo
      else{
        if (!(valor >= minimo) && valor != "") {
          alert(`VALOR FORA DA FAIXA PERMITIDA\nValor mínimo permitido: ${minimo}`);
          if (valor < minimo) {
            this.value = minimo;
          }
    
        }
      }
    }
  }
})



function limite_modais(){ //tem que ser em função a ser chamada porque as ids so existem quando se abre o modal
  ids_modais = ["u_vidro", "valor_fs","u_vidro_az", "valor_fs_az", "u_parede_ext", "ct_parede_ext", "ars_parede_ext", "u_parede_int", "ct_parede_int","u_piso", "ct_piso","u_cob", "ct_cob", "ars_cob","capacidade_ac", "valor_cee", "renovacao_ac", "u_parede_ext_edit", "ct_parede_ext_edit", "ars_parede_ext_edit","u_parede_int_edit", "ct_parede_int_edit","u_piso_edit", "ct_piso_edit", "u_cob_edit", "ct_cob_edit", "ars_cob_edit", "u_vidro_edit", "valor_fs_edit", "capacidade_ac_edit", "valor_cee_edit", "renovacao_ac_edit"]
  
  for (n of ids_modais){
    document.getElementById(n).onchange = function (){
      var v = parseFloat(this.value)
      var mini = parseFloat(this.min)
      var maxi = parseFloat(this.max)
      if ((v <= mini || v > maxi) && v != "") {
        alert(`VALOR FORA DA FAIXA PERMITIDA\nValor mínimo permitido: ${mini}. Valor máximo permitido: ${maxi}.`);
        if (v < mini) {
          this.value = ''; //estava como mínimo, pediu-se para colocar em branco
        }
        if (v > maxi) {
          this.value = ''; //estava como máximo, pediu-se para colocar em branco
        }
      }
    }
  }
  document.getElementById('tipo_sistema').onchange = function () {
    if (this.value == 'alta_capacidade'){
      document.getElementById('renovacao_ac').value = 0
      document.getElementById('renovacao_ac').style.background = '#F5F5F5';
      document.getElementById('renovacao_ac').disabled = true;
    }
    else{
      document.getElementById('renovacao_ac').style.background = '#fff';
      document.getElementById('renovacao_ac').disabled = false;
      document.getElementById('renovacao_ac').value = ''
    }
  }

  document.getElementById('tipo_sistema_edit').onchange = function () {
    if (this.value == 'alta_capacidade'){
      document.getElementById('renovacao_ac_edit').value = 0
      document.getElementById('renovacao_ac_edit').style.background = '#F5F5F5';
      document.getElementById('renovacao_ac_edit').disabled = true;
    }
    else{
      document.getElementById('renovacao_ac_edit').style.background = '#fff';
      document.getElementById('renovacao_ac_edit').disabled = false;
      document.getElementById('renovacao_ac_edit').value = ''
    }
  }
}


//código manter a cor dos botoes ativos

$(document).ready(function () {
  $('.nav-buttons').click(function(){
    $('.nav-buttons').removeClass('pressionado');
    $(this).addClass('pressionado');
  });
});

