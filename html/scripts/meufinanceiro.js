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

            td_Nome.innerText = this.arrayFinancas[i].Nome
            td_Preco.innerText = 'R$ ' + this.arrayFinancas[i].Preco

            tr.className = (this.arrayFinancas[i].Ganho) ? 'trGanho' : 'trGasto'
            console.log(this.arrayFinancas[i].Ganho)
        }
    }

    adicionar(financa){
        this.arrayFinancas.push(financa)
    }

    LerDados(){
        let financa = {}

        financa.Ganho = this.bGanho
        financa.Nome = document.getElementById('m-nome').value
        financa.Preco = document.getElementById('m-valor').value
        
        return financa
    }

    validarCampos(financa){
        let msg = ''

        if(financa.Nome == ''){
            msg += '- Informe o Nome \n'
        }

        if(financa.Preco == ''){
            msg += '- Informe o Preço \n'
        }

        if(msg != ''){
            alert(msg)
            return false
        }
        return true
    }
}

var financeiro = new Financeiro()
