function clear_resumo(){
    let confirmacao = confirm('Tem certeza que deseja limpar os dados desta aba?') //mensagem de confirmação antes de excluir, se ok, exclui, se cancelar nada acontece
    if (confirmacao){
        $(document.getElementById('descricao_cont')).find('input').val('');
        $(document.getElementById('descricao_cont')).find('select').val('');
    }    
}   
function next_resumo(){
    document.getElementById('env-tab').click();
}

function clear_env(){
    let confirmacao = confirm('Tem certeza que deseja limpar os dados desta aba?') //mensagem de confirmação antes de excluir, se ok, exclui, se cancelar nada acontece
    if (confirmacao){
        $("#myTable tr").slice(1,).remove()
    }    
}   
function next_env(){
    document.getElementById('ac-tab').click();
}

function clear_ilum(){
    let confirmacao = confirm('Tem certeza que deseja limpar os dados desta aba?') //mensagem de confirmação antes de excluir, se ok, exclui, se cancelar nada acontece
    if (confirmacao){
        $(document.getElementById('iluminacao_valores')).find('input').val('');
    }
}

function next_ilum(){
    document.getElementById('aq-tab').click();
}

function clear_aq(){
    let confirmacao = confirm('Tem certeza que deseja limpar os dados desta aba?') //mensagem de confirmação antes de excluir, se ok, exclui, se cancelar nada acontece
    if (confirmacao){
        $(document.getElementById('aq_valores')).find('input').val('');
        $(document.getElementById('aq_valores')).find('select').val('');
    }
}

function next_aq(){
    document.getElementById('geracao-tab').click();
}

function clear_ge(){
    let confirmacao = confirm('Tem certeza que deseja limpar os dados desta aba?') //mensagem de confirmação antes de excluir, se ok, exclui, se cancelar nada acontece
    if (confirmacao){
        $(document.getElementById('geracao_valores')).find('input').val('');
        $(document.getElementById('geracao_valores')).find('select').val('');
    }
}

function next_ge(){
    document.getElementById('resultados-tab').click();
}

function clear_ac(){
    let confirmacao = confirm('Tem certeza que deseja limpar os dados desta aba?') //mensagem de confirmação antes de excluir, se ok, exclui, se cancelar nada acontece
    if (confirmacao){
        if (document.getElementById('check_condicionada').checked){
            console.log('cond',$(document.getElementById('div_condicionado')).find('input') )
            $(document.getElementById('div_condicionado')).find('input').val('');
            $(document.getElementById('div_condicionado')).find('select').val('');
        }
        else if (document.getElementById('check_ventilada').checked){
            $(document.getElementById('div_ventilado')).find('input').val('');
            $(document.getElementById('div_ventilado')).find('select').val('');
        }
        else if (document.getElementById('check_hibrida').checked){
            $(document.getElementById('div_hibrido')).find('input').val('');
            $(document.getElementById('div_hibrido')).find('select').val('');
        }
        
    }
}

function next_ac(){
    document.getElementById('ilum-tab').click();
}
