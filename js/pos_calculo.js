function teste (){

    var rowCount = ($('#myTable tr').length)-1; //-1 pois desconsidera a primeira linha, que é cabeçalho
    for (var linha = 0; linha < rowCount; linha++) {

        lista_entradas = ['area_zona', 'pd_zona','orientacoes','tipo_zona', 'lista_usos', 'lista_paredes_ext', 'lista_coberturas',  'lista_vidros','paf_zona', 'fachada', 'avs_zona', 'ahs_zona', 'aov_zona', 'dpi_zona']
        for (entrada of lista_entradas){
            document.getElementById(entrada+linha).onchange = function(){
                id_d = this.id
                var row_id = (((document.getElementById(id_d).parentElement).parentElement).id).slice(4,)
                document.getElementById('cgtt_zona'+row_id).value = ''
                document.getElementById('cgtt_ref'+row_id).value = ''
                document.getElementById('capacidade_ac_cond').value = ''
                document.getElementById('consumo_ac_ref_cond').value = ''
                document.getElementById('consumo_ac_real_cond').value = ''
                //window.alert('Atenção, após alterar uma zona térmica com cargas já calculadas, você deverá recalcular suas cargas térmicas')
            }
        }
    } 
}
