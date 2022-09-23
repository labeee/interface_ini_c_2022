entradas_com_limites = ['area_zona', 'pd_zona', 'paf_zona', 'avs_zona', 'ahs_zona', 'aov_zona', 'dpi_zona', 'dpe_zona']


//para os valores da tabela da envoltoria
const inputEnabler = (e) => {
    let val = parseFloat(e.target.value);
    let min = parseFloat(e.target.min);
    let max = parseFloat(e.target.max);
    if (!(val >= min && val <= max) && e.target.value != "") {
      alert(`VALOR FORA DA FAIXA PERMITIDA\nValor mínimo permitido: ${min}. Valor máximo permitido: ${max}.`);
      if (val < min) {
        e.target.value = min;
      }
      if (val > max) {
        e.target.value = max;
      }

    }

}

function adicionar_limites(){
    var rowCount = ($('#myTable tr').length)-1; //-1 pois desconsidera a primeira linha, que é cabeçalho
    for (var linha = 0; linha < rowCount; linha++) {
        for (let i = 0; i < entradas_com_limites.length; i++) {
            document.getElementById(entradas_com_limites[i]+linha).addEventListener('focusout', (e) => {
            inputEnabler(e);
            });
        }
    }
}

//para os demais valores da interface

$(document).ready(function(){
  ids_com_limite = ["fator_de_forma","area_construida","iluminacao_i", "geracao", "PHOCT_ventilado", "PHOCT_hibrido"]
  for (nome of ids_com_limite){
    document.getElementById(nome).onchange = function(){
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



function limite_modais(){ //tem que ser em função porque as ids so existem quando se abre o modal
  ids_modais = ["u_vidro", "valor_fs", "u_parede", "ct_parede", "ars_parede","u_cob", "ct_cob", "ars_cob","capacidade_ac", "valor_cee", "renovacao_ac"]
  for (n of ids_modais){
    document.getElementById(n).onchange = function (){
      var v = parseFloat(this.value)
      var mini = parseFloat(this.min)
      var maxi = parseFloat(this.max)
      if ((v <= mini || v >= maxi) && v != "") {
        alert(`VALOR FORA DA FAIXA PERMITIDA\nValor mínimo permitido: ${mini}. Valor máximo permitido: ${maxi}.`);
        if (v < mini) {
          this.value = mini;
        }
        if (v > maxi) {
          this.value = maxi;
        }
      }
    }
  }
}


    
  