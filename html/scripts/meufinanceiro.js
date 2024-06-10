const modal = document.querySelector("dialog")
const BotaoAdicionar = document.getElementById("btnAdicionar")
const botaoAddGanho = document.getElementById('botaoAddGanho')
const botaoAddGasto = document.getElementById('botaoAddGasto')
const textoGanhoGasto = document.getElementById('textoGanhoGasto')
const tbody = document.getElementById('tbody')

document.getElementById('myForm').onsubmit = function(event){
    event.preventDefault();
}

botaoAddGanho.onclick = function(){
    modal.showModal()
    textoGanhoGasto.innerText = "INSERIR GANHO"
    textoGanhoGasto.style.color = '#8E481E'
    BotaoAdicionar.style.backgroundColor = '#8E481E'
    financeiro.bGanho = true
    console.log('Abriu modal ganho')
}

botaoAddGasto.onclick = function(){
    modal.showModal()
    textoGanhoGasto.innerText = "INSERIR GASTO"
    textoGanhoGasto.style.color = '#E5B458'
    BotaoAdicionar.style.backgroundColor = '#E5B458'
    financeiro.bGanho = false
    console.log('Abriu modal gasto')
}

BotaoAdicionar.onclick = function(){
    modal.close()
    financeiro.salvar()
    console.log(financeiro.arrayFinancas);
}

document.addEventListener('DOMContentLoaded', function() {
    fetch('/financas')
        .then(response => response.json())
        .then(data => {
            if (data.length === 0) {
                console.log('Não há finanças cadastradas.')
            } else {
                data.forEach(financa => {
                    console.log(financa)
                    financeiro.arrayFinancas.push(financa)
                })
                financeiro.listaTabela()
            }
        })
        .catch(error => {
            console.error('Erro ao obter finanças:', error);
            alert('Erro ao obter finanças.');
        });
});

class Financeiro{

    constructor(){
        this.arrayFinancas = []
        this.bGanho = true
    }

    salvar(){
        let financa = this.LerDados()
        if(this.validarCampos(financa)){
            this.adicionar(financa)
        }
        console.log(financa)
        this.listaTabela()
    }

    listaTabela(){
        tbody.innerText = ''

        for( let i = 0; i < this.arrayFinancas.length; i++){
            let tr = tbody.insertRow()

            let td_Nome = tr.insertCell()
            let td_Preco = tr.insertCell()

            td_Nome.innerText = this.arrayFinancas[i].NOME
            td_Preco.innerText = 'R$ ' + this.arrayFinancas[i].VALOR

            tr.className = (this.arrayFinancas[i].GANHO) ? 'trGanho' : 'trGasto'
            console.log(this.arrayFinancas[i].Ganho)
        }
    }

    adicionar(financa){
        this.arrayFinancas.push(financa)
        fetch('/addfinancas', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ VALOR: financa.VALOR, GANHO: financa.GANHO, NOME: financa.NOME })
        })
            .then(response => response.text())
            .then(data => {
                console.log(data);
                console.log('Financa adicionada')
            })
            .catch(error => {
                console.error('Erro ao adicionar Financa:', error)
            });

    }

    LerDados(){
        let financa = {}

        financa.VALOR = document.getElementById('m-valor').value
        financa.GANHO = this.bGanho
        financa.NOME = document.getElementById('m-nome').value
        
        return financa
    }

    validarCampos(financa){
        let msg = ''

        if(financa.NOME == ''){
            msg += '- Informe o Nome \n'
        }

        if(financa.VALOR == ''){
            msg += '- Informe o Valor \n'
        }

        if(msg != ''){
            alert(msg)
            return false
        }
        return true
    }
}

var financeiro = new Financeiro()
